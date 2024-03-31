import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

type Props = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavBar({ setIsLoggedIn }: Props) {
  const { user } = useContext(UserContext);
  const [isShowCreateAccountOptions, setIsShowCreateAccountOptions] =
    useState(false);

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
  }

  function toggleCreateAccountOptions() {
    setIsShowCreateAccountOptions(!isShowCreateAccountOptions);
  }

  return (
    <nav className=" bg-blue-900 min-w-[200px] md:min-w-[250px] md:max-w-[300px] max-w-[250px] text-white min-h-screen flex flex-col">
      <h2 className=" p-2 text-lg font-semibold bg-blue-950 capitalize">
        {user?.role} Actions
      </h2>

      <div className="border-y  p-2">
        <Link to={`/`}>My account</Link>
      </div>

      {/* Admin view */}
       {user?.role === "Admin" && ( 
      <>
        <div className="border-y  ">
          <button className="m-2" onClick={toggleCreateAccountOptions}>
            Create User Account
          </button>

          {isShowCreateAccountOptions && (
            <div className=" flex flex-col p-2 gap-2 ">
              <Link className="ml-6" to={`create-account/Admin`}>
                Create Admin
              </Link>
              <Link className="ml-6" to={`create-account/Chairperson`}>
                Create Chairperson
              </Link>
              <Link className="ml-6" to={`create-account/Lecturer`}>
                Create Lecturer
              </Link>
              <Link className="ml-6" to={`create-account/Technician`}>
                Create Technician
              </Link>
              <Link className="ml-6" to={`create-account/Registrar`}>
                Create Registrar
              </Link>
              <Link className="ml-6" to={`create-account/Finance`}>
                Create Finance
              </Link>
            </div>
          )}
        </div>

        <div className="border-y  p-2">
          <Link to={`/create-unit`}>Create Unit</Link>
        </div>
      </>
       )} 
       {user?.role === "Chairperson" && ( 
      <>
        <div className="border-y  p-2">
          <Link to={`/assign-units`}>Assign Units</Link>
        </div>

        <div className="border-y  p-2">
          <Link to={`/department-claims`}>Department Claims</Link>
        </div>

        <div className="border-y  p-2">
          <Link to={`/department-report`}>Department Report</Link>
        </div>
      </>
       )} 

       {user?.role === "Registrar" && ( 
      <>
        <div className="border-y  p-2">
          <Link to={`/registrar-claims`}>Registrar Claims</Link>
        </div>

        <div className="border-y  p-2">
          <Link to={`/registrar-report`}>Registrar Report</Link>
        </div>
      </>
       )}

       {user?.role === "Finance" && ( 
      <>
        <div className="border-y  p-2">
          <Link to={`/finance-compensation`}>Finance Compensation</Link>
        </div>
      </>
       )} 

       {(user?.role === "Lecturer" || user?.role === "Technician") && ( 
      <>
        <div className="border-y  p-2">
          <Link to={`/submit-claim`}>Submit Claim</Link>
        </div>

        <div className="border-y  p-2">
          <Link to={`/my-claims`}>My Claims</Link>
        </div>

        {/* <div className="border-y  p-2">
          <Link to={`/manage-account`}>Manage Account</Link>
        </div> */}
      </>
     )} 
      <button
        className="border-y w-full bg-blue-950 p-2 mt-auto sticky bottom-0 "
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}
