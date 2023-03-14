import { createContext, useMemo, useState } from "react";

export const UserDataContext = createContext();
export const UserLoginContex = createContext();
export const SwipeContext = createContext();
export const FocusedTab = createContext();

export const UserDataContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    employer: false,
    worker: false,
    userName: "",
    userLastName: "",
    userRole: "",
    userLastRole: "",
    userLastCompany: "",
    sector: "",
    roleWanted: "",
    country: "",
    city: "",
    image: "",
    filter: {
      roleWanted: "",
      seniority: "",
    },
    firstTime: true,
    visits: 0,
    available: true,
    aboutme: "",
    seniority: "",
  });

  return (
    <UserDataContext.Provider
      value={useMemo(() => {
        return {
          userData,
          setUserData,
        };
      }, [userData, setUserData])}
    >
      {children}
    </UserDataContext.Provider>
  );
};
