import { IUser } from "../interfaces/IUser";

class LocalStorageService {
  setUserId(userId: IUser["id"]) {
    return localStorage.setItem("userId", userId);
  }
  getUserId() {
    return localStorage.getItem("userId");
  }
}

export const localStore = new LocalStorageService();
