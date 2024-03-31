import React, { useContext, useEffect, useState } from "react";
import { ClaimType } from "../../utilities/Types";
import { serverUrl } from "../../utilities/Constants";
import { UserContext } from "../../App";
import Claim from "./components/Claim";
import html2pdf from "html2pdf.js";

export default function DepartmentReport() {
  const [claims, setClaims] = useState<ClaimType[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch(`${serverUrl}/claims/department-all/${user?.department}`)
      .then((res) => res.json())
      .then((result) => setClaims(result.success.data));
  }, [user?.department]);

  function handleExport() {
    const element = document.getElementById("pdf-content");

    html2pdf().from(element).save();
  }

  return (
    <div className="grow p-2">
      <h1 className="text-xl font-semibold text-center">Department Report</h1>

      <div className="max-w-[1000px] mx-auto">
        <button onClick={handleExport} className="w-20 border rounded p-1">
          Export
        </button>

        <table
          id="pdf-content"
          className="mx-auto bg-slate-300 w-full max-w-[1000px] m-2 rounded text-center"
        >
          <caption> Department Report</caption>
          <thead>
            <tr>
              <th className="p-2">Claimant Name</th>
              <th className="p-2">Claimant Role</th>
              <th className="p-2">Claim ID</th>
              <th className="p-2">Date claimed</th>
              <th className="p-2">Unit Claimed</th>
              <th className="p-2">Unit CF</th>
              <th className="p-2">Hours Claimed</th>
            </tr>
          </thead>

          <tbody>
            {claims.map((claim) => (
              <Claim key={claim.id} claim={claim} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
