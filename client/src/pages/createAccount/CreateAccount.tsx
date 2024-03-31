import React, { useState } from "react";
import toast from "react-hot-toast";
import { serverUrl } from "../../utilities/Constants";
import { useParams } from "react-router-dom";
import { generateRandomString } from "../../utilities/generateRandomString";

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  const { role } = useParams();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const password = generateRandomString(6);

      const response = await fetch(`${serverUrl}/auth/create-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          role,
          password,
          department,
        }),
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error.message);
        return;
      }
      console.log(data.success);
      toast.success(data.success.message);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="flex justify-center pt-6 w-full">
      <form
        className=" flex flex-col gap-6 min-w-[400px] max-w-[800px] w-full p-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-xl text-blue-900 font-semibold text-center">
          Create {role}
        </h1>

        <label className="">
          <p>Enter full name</p>
          <input
            className="border shadow p-1 rounded w-full"
            placeholder="e.g. John Doe"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="">
          <p>Enter email</p>
          <input
            className="border shadow p-1 rounded w-full"
            placeholder="e.g. johndoe@mail.com"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        {(role === "Chairperson" ||
          role === "Lecturer" ||
          role === "Technician") && (
          <label className="">
            <p>Enter Department</p>
            <select
              className=" border shadow w-full p-2 bg-white"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
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
        )}

        <button className="bg-blue-500 p-2 text-white shadow-md rounded font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
}
