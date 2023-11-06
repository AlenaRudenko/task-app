import { IUser } from "./../../interfaces/IUser";
import { RootModel } from "./../store";
import { createModel } from "@rematch/core";
import { ApiService } from "../../services/api.service";

interface ILogin {
  login: IUser["login"];
  password: IUser["password"];
}

export const user = createModel<RootModel>()({
  state: null as IUser | null,
  reducers: {
    setUser: (state, payload: IUser) => {
      return payload;
    },
  },
  effects: (dispatch) => ({
    async login({ login, password }: ILogin) {
      const response = await ApiService.getUsers();
      const user = response.data.find((user) => user.login === login);
      if (user) {
        if (user.password === password) {
          dispatch.user.setUser(user);
          return "SUCCESS";
        } else return "INVALID DATA";
      } else return "USER NOT FOUND";
    },
    async authtorization(id) {
      const response = await ApiService.getUsers();
      const user = response.data.find((user) => user.id === id);
      if (user) {
        dispatch.user.setUser(user);
      }
    },
  }),
});
