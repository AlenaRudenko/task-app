import axios from "axios";
import { IUser } from "../interfaces/IUser";

class Api {
  private instance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      "Content-type": "application/json",
    },
  });
  getUsers() {
    return this.instance.get<IUser[]>("/users/data.json");
  }
  getTasks(userId: IUser["id"]) {
    return this.instance.get(`/tasks/${userId}/data.json`);
  }
}
export const ApiService = new Api();
