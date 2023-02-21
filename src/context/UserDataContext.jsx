import { createContext, useState } from "react";

export const UserDataContext = createContext();
export const UserLoginContex = createContext()

export const UserDataContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    type: "",
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
  });

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
