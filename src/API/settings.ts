import axios from "axios";
import { IUser } from "../components/Login/IUser";

export async function putUser(idAccount: number, login?: string, password?: string) {
  try {
    const response = await axios.put(`http://localhost:8080/nexDoor/put/accountDetails/${idAccount}`, {
      login,
      password,
    });
    return response.status;
  } catch (e) {}
}
