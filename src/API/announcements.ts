import axios from "axios";
import IAnnouncement from "../components/Announcement/IAnnouncement";
import { IUser } from "../components/Login/IUser";

export async function getAllAnnouncements(user: IUser | null): Promise<Array<IAnnouncement> | null> {
  try {
    const { data } = await axios.get<Array<IAnnouncement>>(`http://localhost:8080/nexDoor/get/announcement/5`, {});
    console.log(data);
    return data;
  } catch (e) {
    return null;
  }
}
