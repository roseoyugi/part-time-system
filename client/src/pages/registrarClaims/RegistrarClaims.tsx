import { useContext, useEffect, useState } from "react";
import Claim from "./components/Claim";
import { UserContext } from "../../App";
import { serverUrl } from "../../utilities/Constants";
import { ClaimType } from "../../utilities/Types";

export default function RegistrarClaims() {
  const [claims, setClaims] = useState<ClaimType[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchClaims() {
      try {
        // get all claims where registrar status is pending
        //and department status is accepted
        const response = await fetch(`${serverUrl}/claims/registrar`);

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
      <h2 className="font-medium text-xl mx-auto">Registrar Claims</h2>
      {claims.map((claim) => (
        <Claim key={claim.id} claim={claim} />
      ))}
    </div>
  );
}
