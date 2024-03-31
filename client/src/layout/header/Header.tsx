import { useContext } from "react";
import { UserContext } from "../../App";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className="bg-slate-300 text-white p-2 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-900">Claim Portal</h1>
      <p className="text-black font-semibold text-xs">
        Logged in as: {user?.email}
      </p>
    </header>
  );
}
