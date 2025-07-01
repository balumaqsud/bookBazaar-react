import { createContext, useContext } from "react";
import { Member } from "../../libs/types/member";

interface GlobalInterface {
  authMember: Member | null;
  setAuthMember: (member: Member | null) => void;
  orderBuilder: Date;
  setOrderBuilder: (input: Date) => void;
}

export const GlobalContext = createContext<GlobalInterface | undefined>(
  undefined
);

//custom hook
export const useGlobals = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) throw new Error("use Context error");
  return context;
};
