import React, { useState } from "react";
import { serverUrl } from "../../utilities/Constants";
import { generateRandomString } from "../../utilities/generateRandomString";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const randomString = generateRandomString(6);

    fetch(`${serverUrl}/auth/forgot-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, randomString }),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result.success.message);
        navigate(`/`);
      });
  }

  return (
    <div className="bg-slate-300 h-screen flex flex-col items-center justify-center">
      <form
        className="border  bg-white shadow flex flex-col gap-4 p-2 rounded w-full max-w-[800px]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-blue-500 font-semibold text-2xl text-center">
          Forgot password ?
        </h1>

        <p className="text-sm italic font-light">
          A one time password will be sent to your email
        </p>
        <label>
          <p className="font-medium">Enter email</p>
          <input
            className="border shadow  p-2 w-full rounded"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button className="p-2 bg-blue-500 font-medium text-white border-shadow rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
