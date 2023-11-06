import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { localStore } from "../../services/localStorage.service";
import { useEffect } from "react";

export const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();

  const user = useSelector((state: RootState) => state.user);
  const result = localStore.getUserId();

  useEffect(() => {
    if (!user && !result) {
      navigate("/auth");
    } else if (!user && result) {
      dispatch.user.authtorization(result);
      navigate("/tasks/shortView");
    }
  }, [dispatch.user, navigate, result, user]);

  return (
    <div>
      <Outlet />
    </div>
  );
};
