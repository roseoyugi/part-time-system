import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { serverUrl } from "../../../utilities/Constants";
import { ClaimType, UnitType, UserType } from "../../../utilities/Types";

type Props = {
  claim: ClaimType;
};

export default function Claim({ claim }: Props) {
  const [claimant, setClaimant] = useState<UserType>();
  const [unit, setUnit] = useState<UnitType>();
  const [isReviewed, setIsReviewed] = useState(false);
  const [comment, setComment] = useState("");

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

  async function handleStatusUpdate(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    status: string
  ) {
    e.preventDefault();

    if (!comment) {
      toast.error("Please add comment before submitting!");
    }

    try {
      const response = await fetch(`${serverUrl}/claims/update-status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stage: "registrar",
          status: status,
          cid: claim.id,
          comment: comment,
        }),
      });

      const result = await response.json();
      console.log(result);
      toast.success(result.success.message);
      setIsReviewed(true);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  if (isReviewed) return;

  return (
    <div className="bg-blue-100 p-2 rounded">
      <div className=" p-1 flex  gap-2 flex-col  font-medium">
        <p className="flex justify-between border-b border-black">
          <span>Claimant:</span>
          <span>{claimant?.name}</span>
        </p>

        <p className="flex justify-between border-b border-black">
          <span>Claim ID:</span>
          <span>{claim.id}</span>
        </p>

        <p className="flex justify-between border-b border-black">
          <span>Hours claimed:</span>
          <span>{claim.hours} hrs</span>
        </p>

        <p className="flex justify-between border-b border-black">
          <span>Date Claimed:</span>
          <span>{dateClaimed}</span>
        </p>

        <p className="flex justify-between border-b border-black">
          <span>Department:</span>
          <span>{claim.department}</span>
        </p>

        <p className="flex justify-between border-b border-black">
          <span>Unit Claimed:</span>
          <span>{unit?.unit_title}</span>
        </p>

        <a
          className="p-1 text-center rounded bg-slate-500 text-white "
          href={`${serverUrl}/${claim.file_url}`}
        >
          Support document
        </a>
      </div>

      <form className="  mt-1 flex flex-col gap-2">
        <textarea
          className="p-2 rounded"
          placeholder="Enter comment..."
          name=""
          id=""
          cols={30}
          rows={2}
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="flex  gap-2">
          <button
            className="p-2 border rounded grow font-medium bg-red-500"
            onClick={(e) => handleStatusUpdate(e, "rejected")}
          >
            Reject
          </button>
          <button
            className="p-2 border rounded grow font-medium bg-green-500"
            onClick={(e) => handleStatusUpdate(e, "accepted")}
          >
            Approve
          </button>
        </div>
      </form>
    </div>
  );
}
