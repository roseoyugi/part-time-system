import { useContext, useEffect, useState } from "react";
import { ClaimType } from "../../utilities/Types";
import { serverUrl } from "../../utilities/Constants";
import { UserContext } from "../../App";
import Claim from "./components/Claim";

export default function DepartmentClaims() {
  const [claims, setClaims] = useState<ClaimType[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchClaims() {
      try {
        // get all claims in this chairperson's department which are pending
        const response = await fetch(
          `${serverUrl}/claims/department/${user?.department}`
        );

        const result = await response.json();
        setClaims(result.success.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }

    fetchClaims();
  }, [user?.department]);

  return (
    <div className="p-4 border-2 flex flex-col gap-4 rounded my-2  mx-auto w-full max-w-[1000px]">
      <h2 className=" font-medium text-xl mx-auto">Department Claims</h2>
      <div className="flex flex-col gap-4 lg:grid grid-cols-2  p-2">
        {claims.map((claim) => (
          <Claim key={claim.id} claim={claim} />
        ))}
      </div>
    </div>
  );
}
