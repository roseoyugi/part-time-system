import { useContext, useEffect, useState } from "react";
import { ClaimType } from "../../utilities/Types";
import { serverUrl } from "../../utilities/Constants";
import { UserContext } from "../../App";
import Claim from "./components/Claim";
import html2pdf from "html2pdf.js";

export default function FinanceCompensation() {
  const [claims, setClaims] = useState<ClaimType[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchClaims() {
      try {
        const response = await fetch(`${serverUrl}/claims/finance`);

        const result = await response.json();
        console.log();

        setClaims(result.success.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }

    fetchClaims();
  }, [user?.department]);

  function handleExport() {
    const element = document.getElementById("pdf-content");

    html2pdf().from(element).save();
  }

  return (
    <div className="p-4 border-2 flex flex-col gap-4 rounded my-2  mx-auto w-full max-w-[1200px]">
      <h2 className="font-medium text-xl mx-auto">Finance Compensation</h2>

      {/* ------------------------- */}
      <button onClick={handleExport} className="w-20 border rounded p-1">
        Export
      </button>

      <table
        id="pdf-content"
        className="text-center bg-slate-300 m-2  rounded "
      >
        <caption>Finance compensations</caption>
        <thead className="">
          <tr>
            <th className="p-2">Claimant Name</th>
            <th className="p-2">Claimant Role</th>
            <th className="p-2">Claim ID</th>
            <th className="p-2">Date claimed</th>
            <th className="p-2">Department</th>
            <th className="p-2">Unit Claimed</th>
            <th className="p-2">Unit CF</th>
            <th className="p-2">Hours Claimed</th>
            <th className="p-2">Total Compensation</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <Claim key={claim.id} claim={claim} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
