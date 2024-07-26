import { ReactNode, createContext } from "react";
import { Laptop } from "../types/records";

export const UserContext = createContext<Laptop[]>([]);

const UserContextProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: Laptop[];
}) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
