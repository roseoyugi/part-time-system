import { useContext, useEffect, useState } from "react";
import { ClaimType } from "../../utilities/Types";
import { serverUrl } from "../../utilities/Constants";
import { UserContext } from "../../App";
import MyClaim from "./components/MyClaim";

export default function MyClaims() {
  const [claims, setClaims] = useState<ClaimType[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch(`${serverUrl}/claims/claimant/${user?.id}`)
      .then((res) => res.json())
      .then((data) => {
        setClaims(data.success.data);
      })
      .catch((error) => console.error(error.message));
  }, [user?.id]);

  return (
    <div className="border-2 grow px-2">
      <table className="bg-slate-300 w-full max-w-[1000px]  mx-auto rounded text-center">
        <caption className="text-2xl font-semibold m-6">My Claims</caption>
        <thead>
          <tr>
            <th className="p-2">Claim ID</th>
            <th className="p-2">Unit Claimed</th>
            <th className="p-2">Hours Claimed</th>
            <th className="p-2">Date Claimed</th>
            <th className="p-2">Department Status</th>
            <th className="p-2">Registrar Status</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <MyClaim key={claim.id} claim={claim} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
