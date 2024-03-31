import { useEffect, useState } from "react";
import { ClaimType, UnitType, UserType } from "../../../utilities/Types";
import { serverUrl } from "../../../utilities/Constants";

type Props = {
  claim: ClaimType;
};

export default function Claim({ claim }: Props) {
  const [claimant, setClaimant] = useState<UserType>();
  const [unit, setUnit] = useState<UnitType>();

  useEffect(() => {
    async function getData() {
      try {
        // get the user who placed this claim
        const response = await fetch(`${serverUrl}/users/${claim.claimant_id}`);
        const result = await response.json();
        setClaimant(result.success.data);

        // get the unit claimed
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
  }, [claim.claimant_id, claim.unit_id]);

  const dateClaimed = new Date(claim.date).toDateString();

  const totalCompensation =
    claimant?.role === "Lecturer"
      ? (unit?.cf ?? 0) * claim.hours * 1000
      : claim.hours * 500;

  return (
    <tr className="border-t-2" style={{}}>
      <td className="p-2">{claimant?.name}</td>
      <td className="p-2">{claimant?.role}</td>
      <td className="p-2">{claim.id}</td>
      <td className="p-2">{dateClaimed}</td>
      <td className="p-2">{claim.department}</td>
      <td className="p-2">{unit?.unit_title}</td>
      <td className="p-2">{unit?.cf}</td>
      <td className="p-2">{claim.hours} hrs</td>
      <td className="p-2">KES {totalCompensation}</td>
    </tr>
  );
}
