import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import toast from "react-hot-toast";
import { serverUrl } from "../../utilities/Constants";
import { UnitType } from "../../utilities/Types";

export default function SubmitClaim() {
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File>();
  const [unit, setUnit] = useState("");

  const [units, setUnits] = useState<UnitType[]>([]);

  const { user } = useContext(UserContext);

  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    async function fetchUnits() {
      try {
        const response = await fetch(`${serverUrl}/units/lecturer/${user?.id}`);
        const result = await response.json();
        setUnits(result.success.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
    if (user?.role !== "Lecturer") return;
    //get all units assigned to this user if this user is a lecturer
    fetchUnits();
  }, [user?.id, user?.role]);

  async function uploadFile() {
    try {
      const formData = new FormData();
      formData.append("file", file as File);
      const res = await fetch(`${serverUrl}/claims/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      console.log(result);
      return result.success.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const fileUrl = await uploadFile();
      console.log("submitting...");
      console.log(fileUrl);

      const response = await fetch(`${serverUrl}/claims`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          claimant_id: user?.id,
          hours: hours,
          date: date,
          file_url: fileUrl,
          department: user?.department,
          unit_id: unit,
        }),
      });

      console.log("submitted");

      const result = await response.json();

      console.log(result);
      toast.success(result.success.message);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  return (
    <div className="flex w-full p-6 gap-2 justify-evenly">
      <form
        className="flex flex-col gap-2 border shadow h-fit grow p-2  max-w-[800px]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-xl text-blue-900 font-semibold text-center">
          Submit Claim
        </h1>

        {/* only show this input if user is a lecturer */}
        {user?.role === "Lecturer" && (
          <label className="">
            <p>Select Unit</p>
            <select
              className="border rounded w-full p-2 shadow"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
            >
              <option value="" defaultValue="" disabled>
                pick a unit
              </option>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.unit_title}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="">
          <p>Enter number of hours worked</p>
          <input
            min={1}
            max={9}
            className="border rounded w-full p-1 shadow"
            type="number"
            required
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </label>

        <label className="">
          <p>Enter the date you worked</p>
          <input
            className="border rounded w-full p-1 shadow"
            type="date"
            max={currentDate}
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label className="">
          <p>Select supporting document</p>
          <input
            className="border rounded w-full p-1 shadow"
            type="file"
            required
            accept=".doc,.docx,.pdf"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
        </label>

        <button className="border shadow bg-blue-600 rounded p-2 text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
