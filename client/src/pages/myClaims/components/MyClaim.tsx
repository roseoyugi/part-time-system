import { useContext, useEffect, useState } from "react";
import { ClaimType, UnitType } from "../../../utilities/Types";
import { serverUrl } from "../../../utilities/Constants";
import { UserContext } from "../../../App";

type Props = {
  claim: ClaimType;
};

export default function MyClaim({ claim }: Props) {
  const [unit, setUnit] = useState<UnitType | null>(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.role !== "Lecturer") return;
    fetch(`${serverUrl}/units/${claim.unit_id}`)
      .then((res) => res.json())
      .then((result) => setUnit(result.success.data))
      .catch((error) => console.error(error.message));
  }, [claim.unit_id]);

  return (
    <tr className="border-t-2">
      <td className="p-2">{claim.claimant_id}</td>
      <td className="p-2">{unit?.unit_title}</td>
      <td className="p-2">{claim.hours}</td>
      <td className="p-2">{new Date(claim.date).toDateString()}</td>
      <td className="p-2">{claim.department_status}</td>
      <td className="p-2">{claim.registrar_status}</td>
    </tr>
  );
}

{
  /* 
<th>Claim ID</th>
<th>Unit Claimed</th>
<th>Hours Claimed</th>
<th>Date Claimed</th>
<th>Department Status</th>
<th>Registrar Status</th>
*/
}
