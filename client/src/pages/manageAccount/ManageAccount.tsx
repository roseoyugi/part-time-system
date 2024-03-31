import { useContext, useEffect, useState } from "react";
import { AccountType } from "../../utilities/Types";
import { serverUrl } from "../../utilities/Constants";
import { UserContext } from "../../App";
import toast from "react-hot-toast";

export default function ManageAccount() {
  const [account, setAccount] = useState<AccountType>();
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const { user } = useContext(UserContext);
  useEffect(() => {
    async function getData() {
      const response = await fetch(`${serverUrl}/accounts/account/${user?.id}`);
      const results = await response.json();
      setAccount(results.success.data);
    }

    getData();
  }, [user?.id]);

  async function handleWithdraw(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${serverUrl}/accounts/withdraw`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          withdrawalAmount: withdrawalAmount,
          aid: account?.id,
        }),
      });
      const results = await response.json();

      // Update the account balance locally
      setAccount((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            balance: prevState.balance - parseFloat(withdrawalAmount),
          };
        }
        return prevState;
      });

      toast.success(results.success.message);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  return (
    <div className="flex justify-center items-start  w-full p-4">
      <div className="border shadow w-full max-w-[1000px] rounded p-2 flex flex-col gap-4">
        <h1 className="text-xl font-medium text-center text-blue-800">
          Manage Account
        </h1>

        <p className="font-semibold text-xl">
          <span>Account Balance: </span>
          <span>KES {account?.balance}</span>
        </p>

        <form
          className="border rounded bg-blue-50 p-2 flex flex-col gap-2"
          onSubmit={(e) => handleWithdraw(e)}
        >
          <h2 className="font-medium text-center text-xl">Withdraw</h2>
          <input
            className="p-2 rounded border shadow"
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(e.target.value)}
            max={account?.balance}
            min={1}
          />
          <button className="bg-blue-500 p-2 shadow rounded font-medium">
            Withdraw
          </button>
        </form>
      </div>
    </div>
  );
}
