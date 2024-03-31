import { useContext, useState } from "react";
import { UserContext } from "../App";
import toast from "react-hot-toast";
import { serverUrl } from "../utilities/Constants";
import claimLogo from "../assets/images/claim_logo.png";
import { UserType } from "../utilities/Types";

export default function ChangePassword() {
  const { user, setUser } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmPassword !== password) {
      toast.error("Passwords do not match");
      return;
    }

    const data = JSON.stringify({ uid: user?.id, newPassword: password });

    fetch(`${serverUrl}/auth/change-password`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result.success.message);
        if (user) {
          const userString = localStorage.getItem("user");
          const user: UserType = JSON.parse(userString as string);
          user.updatedPassword = true;
          const updatedUserString = JSON.stringify(user);
          localStorage.setItem("user", updatedUserString);

          setUser({ ...user, updatedPassword: true });
        }
      })
      .catch((err) => console.error(err.message));
  }

  return (
    <div
      className=" bg-cover bg-center relative flex flex-col gap-6 justify-center items-center h-screen object-center"
      style={{ backgroundImage: `url('${claimLogo}')` }}
    >
      <h2 className="text-3xl text-center text-blue-500 font-semibold">
        Claim Portal
      </h2>

      <form
        className="border bg-white rounded shadow p-6 flex flex-col gap-6 w-full max-w-[800px] "
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="text-xl text-center text-blue-500 font-semibold">
          Change Password for {user?.name}
        </h2>

        <label>
          <p>Enter new password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border p-2 w-full rounded shadow"
            type="password"
            minLength={6}
            required
          />
        </label>

        <label>
          <p>Confirm new password</p>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-2 w-full rounded shadow"
            type="password"
            value={confirmPassword}
            minLength={6}
            required
          />
        </label>

        <button className="p-2 border shadow bg-blue-500 rounded text-white font-medium">
          Submit
        </button>
      </form>
    </div>
  );
}
