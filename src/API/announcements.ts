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

export async function putAnnouncement(announcementId: number, announcement_type: number, title: string, desc: string) {
  try {
    const response = await axios.put(`http://localhost:8080/nexDoor/put/announcement/${announcementId}`, {
      announcement_type,
      title,
      desc,
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}
