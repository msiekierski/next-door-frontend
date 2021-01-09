import axios from "axios";
import { IUser } from "../components/Login/IUser";

export async function getUser(login: string, password: string): Promise<IUser | null> {
  try {
    const { data } = await axios.post<IUser>(`http://localhost:8080/login/account`, {
      login,
      password,
    });
    return data;
  } catch (e) {
    return null;
  }
}
