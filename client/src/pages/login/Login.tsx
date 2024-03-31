import React, { useState } from "react";
import toast from "react-hot-toast";
import { serverUrl } from "../../utilities/Constants";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/claim_logo.png";

type Props = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login({ setIsLoggedIn }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${serverUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (result.error) {
        console.log(result.error.message);
        toast.error(result.error.message);
        return;
      }
      console.log(result);
      localStorage.setItem("user", JSON.stringify(result.success.data));
      toast.success(result.success.message);
      navigate(`/`);
      setIsLoggedIn(true);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }

  return (
    <div
      className="flex bg-cover bg-opacity-90 bg-center flex-col justify-center items-center h-screen  w-full"
      style={{ backgroundImage: `url(${logo})` }}
    >
      <form
        className=" z-20 border shadow p-6 rounded  flex flex-col gap-4 w-full max-w-[800px] bg-white"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className=" text-center text-3xl font-bold text-blue-900 mb-6">
          Claim Portal
        </h1>
        <h1 className="text-xl text-blue-900 font-semibold text-center">
          Log In
        </h1>

        <label className="">
          <p>Enter email</p>
          <input
            className="border shadow p-2 rounded w-full"
            placeholder="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="">
          <p>Enter password</p>
          <input
            className="border shadow p-2 rounded w-full"
            placeholder="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button className="bg-blue-500 p-2 text-white shadow-md rounded font-semibold">
          Submit
        </button>

        <Link className="text-blue-500" to={`/forgot-password`}>
          Forgot password?
        </Link>
      </form>
      <div className="absolute inset-0 bg-blue-500 opacity-50"></div>
    </div>
  );
}
