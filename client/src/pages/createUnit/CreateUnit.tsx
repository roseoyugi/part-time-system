import { useState } from "react";
import { serverUrl } from "../../utilities/Constants";
import toast from "react-hot-toast";

export default function CreateUnit() {
  const [unitCode, setUnitCode] = useState("");
  const [unitTitle, setUnitTitle] = useState("");
  const [CF, setCF] = useState("");
  const [department, setDepartment] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`${serverUrl}/units`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          unit_code: unitCode,
          unit_title: unitTitle,
          cf: CF,
          department,
        }),
      });

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
    <div className="p-4 w-full flex justify-center items-start">
      <form
        className="border shadow rounded p-2 w-full max-w-[800px] flex flex-col gap-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-center font-semibold text-lg text-blue-800">
          Create Unit
        </h1>

        <label>
          <p>Enter unit Code</p>
          <input
            className="border shadow rounded p-2 w-full"
            required
            type="text"
            placeholder="e.g. Comp 100"
            value={unitCode}
            onChange={(e) => setUnitCode(e.target.value)}
          />
        </label>

        <label>
          <p>Enter unit Title</p>
          <input
            className="border shadow rounded p-2 w-full"
            required
            type="text"
            placeholder="e.g. Introduction to Information Technology"
            value={unitTitle}
            onChange={(e) => setUnitTitle(e.target.value)}
          />
        </label>

        <label>
          <p>Enter unit CF</p>
          <select
            className="border shadow rounded p-2 w-full"
            required
            value={CF}
            onChange={(e) => setCF(e.target.value)}
          >
            <option defaultValue="" value="">
              select a CF value
            </option>
            <option value="2.0">2.0</option>
            <option value="2.5">2.5</option>
            <option value="3.0">3.0</option>
            <option value="3.5">3.5</option>
            <option value="4.0">4.0</option>
            <option value="4.5">4.5</option>
            <option value="5.0">5.0</option>
            <option value="5.5">5.5</option>
            <option value="6.0">6.0</option>
          </select>
        </label>

        <label className="">
          <p>Enter Department</p>
          <select
            className="border shadow rounded p-2 w-full"
            required
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option disabled defaultValue="" value="">
              select a department
            </option>

            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Education">Education</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Journalism">Journalism</option>
          </select>
        </label>

        <div>
          <button className="bg-blue-500 p-2 font-semibold text-white rounded shadow border w-full">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
