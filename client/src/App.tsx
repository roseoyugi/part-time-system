import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./layout/navBar/NavBar";
import Header from "./layout/header/Header";
import CreateAccount from "./pages/createAccount/CreateAccount";
import { Toaster } from "react-hot-toast";
import LoadingScreen from "./components/LoadingScreen";
import { createContext, useEffect, useState } from "react";
import Login from "./pages/login/Login";
import SubmitClaim from "./pages/submitClaim/SubmitClaim";
import { UserType } from "./utilities/Types";
import MyAccount from "./pages/myAccount/MyAccount";
import CreateUnit from "./pages/createUnit/CreateUnit";
import AssignUnits from "./pages/assignUnits/AssignUnits";
import DepartmentClaims from "./pages/departmentClaims/DepartmentClaims";
import RegistrarClaims from "./pages/registrarClaims/RegistrarClaims";
import FinanceCompensation from "./pages/financeCompensation/FinanceCompensation";
import ManageAccount from "./pages/manageAccount/ManageAccount";
import MyClaims from "./pages/myClaims/MyClaims";
import ChangePassword from "./changePassword/ChangePassword";
import DepartmentReport from "./pages/departmentReport/DepartmentReport";
import RegistrarReport from "./registrarReport/RegistrarReport";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";

type UserContextType = {
  user: UserType | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
});

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user") as string));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, [isLoggedIn]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <main className="relative ">
        <Toaster />
        {isLoading ? (
          <LoadingScreen />
        ) : isLoggedIn ? (
          !user?.updatedPassword ? (
            <ChangePassword />
          ) : (
            <>
              <Header />
              <section className="flex ">
                <NavBar setIsLoggedIn={setIsLoggedIn} />
                <Routes>
                  <Route path="/" element={<MyAccount />} />
                  <Route
                    path="/create-account/:role"
                    element={<CreateAccount />}
                  />
                  <Route path="/my-claims" element={<MyClaims />} />
                  <Route path="/create-unit" element={<CreateUnit />} />
                  <Route path="/submit-claim" element={<SubmitClaim />} />
                  <Route path="/assign-units" element={<AssignUnits />} />
                  <Route
                    path="/department-report"
                    element={<DepartmentReport />}
                  />
                  <Route
                    path="/registrar-claims"
                    element={<RegistrarClaims />}
                  />
                  <Route
                    path="/registrar-report"
                    element={<RegistrarReport />}
                  />
                  <Route path="/manage-account" element={<ManageAccount />} />
                  <Route
                    path="/finance-compensation"
                    element={<FinanceCompensation />}
                  />
                  <Route
                    path="/department-claims"
                    element={<DepartmentClaims />}
                  />
                  <Route path="*" element={<Navigate to={`/`} />} />
                </Routes>
              </section>
            </>
          )
        ) : (
          <Routes>
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to={`/`} />} />
          </Routes>
        )}
      </main>
    </UserContext.Provider>
  );
}
