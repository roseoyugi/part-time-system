import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { UnitType } from "../../utilities/Types";
import { serverUrl } from "../../utilities/Constants";

export default function MyAccount() {
  const { user } = useContext(UserContext);

  const [units, setUnits] = useState<UnitType[]>([]);

  useEffect(() => {
    fetch(`${serverUrl}/assigned_units/${user?.id}`)
      .then((res) => res.json())
      .then((result) => setUnits(result.success.data));
  }, [user?.id]);

  return (
    <div className="flex flex-col gap-2 items-center w-full p-6">
      <div className="flex flex-col gap-4 w-full max-w-[1000px] border shadow p-2 text-2xl rounded">
        <h1 className="text-blue-800 text-center font-semibold text-2xl">
          My Account
        </h1>
        <div>
          Name: <span className="font-semibold">{user?.name}</span>
        </div>

        <div>
          Email: <span className="font-semibold">{user?.email}</span>
        </div>

        <div>
          Role: <span className="font-semibold">{user?.role}</span>
        </div>

        {user?.role !== "Admin" &&
          user?.role !== "Registrar" &&
          user?.role !== "Finance" && (
            <>
              <div>
                Department:{" "}
                <span className="font-semibold">{user?.department}</span>
              </div>
              {user?.role !== "Technician" && (
                <div>
                  <p className="font-medium">Units Assigned:</p>
                  <ul>
                    {units.map((unit) => (
                      <li key={unit.id} className="text-lg">
                        {unit.unit_code}: {unit.unit_title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
      </div>
    </div>
  );
}
