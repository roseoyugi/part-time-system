import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { ClaimType, UnitType, UserType } from "../../utilities/Types";
import { serverUrl } from "../../utilities/Constants";

type Props = {
  claim: ClaimType;
};

export default function Claim({ claim }: Props) {
  const [claimant, setClaimant] = useState<UserType>();
  const [unit, setUnit] = useState<UnitType>();
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getData() {
      try {
        // get the user who placed this claim
        const response = await fetch(`${serverUrl}/users/${claim.claimant_id}`);
        const result = await response.json();
        setClaimant(result.success.data);

        // get the unit claimed
        if (user?.role !== "Lecturer") return;
        const response2 = await fetch(`${serverUrl}/units/${claim.unit_id}`);
        const result2 = await response2.json();
        setUnit(result2.success.data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
    getData();
  }, [claim.claimant_id, claim.unit_id, user?.role]);

  const dateClaimed = new Date(claim.date).toDateString();

  return (
    <tr className="border-t-2" style={{}}>
      <td className="p-2">{claimant?.name}</td>
      <td className="p-2">{claimant?.role}</td>
      <td className="p-2">{claim.id}</td>
      <td className="p-2">{dateClaimed}</td>
      <td className="p-2">{unit?.unit_title || "NA"}</td>
      <td className="p-2">{unit?.cf || "NA"} </td>
      <td className="p-2">{claim.hours} hrs</td>
    </tr>
  );
}
