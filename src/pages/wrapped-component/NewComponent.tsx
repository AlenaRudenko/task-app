import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const WrappedComponent = ({ children }: PropsWithChildren) => {
  const user = useSelector((state: RootState) => state.user);
  return <div>{user ? children : ""}</div>;
};
