import axios from "axios";
import IAnnouncement from "../components/Announcement/IAnnouncement";
import { IUser } from "../components/Login/IUser";

export async function getAllAnnouncements(idAssoc?: number): Promise<Array<IAnnouncement>> {
  interface ResponseType {
    announcements: Array<IAnnouncement>;
  }

  try {
    const { data } = await axios.get<ResponseType>(`http://localhost:8080/nexDoor/get/announcement/${idAssoc}`, {});
    console.log(data);
    return data.announcements;
  } catch (e) {
    console.log(e);
    return [];
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

export async function deleteAnnouncement(announcementId: number) {
  try {
    const response = await axios.delete(`http://localhost:8080/nexDoor/delete/announcement/${announcementId}`, {});
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}
