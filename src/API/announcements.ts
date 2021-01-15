import axios from "axios";
import { useContext } from "react";
import IAnnouncement from "../components/Announcement/IAnnouncement";
import { IUser } from "../components/Login/IUser";
import { UserContext } from "../components/Login/UserContext";

export async function getAllAnnouncements(idAssoc?: number): Promise<Array<IAnnouncement>> {
  try {
    const { data } = await axios.get(`http://localhost:8080/nexDoor/get/announcement/${idAssoc}`, {});
    console.log(data);
    return data;
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

export async function createAnnouncement(
  idAccount: number,
  announcementType: number,
  title: string,
  description: string,
  creationDate: string,
  idAssoc: number
): Promise<number> {
  try {
    const response = await axios.post(`http://localhost:8080/nexDoor/create/announcement`, {
      idAccount,
      announcementType,
      title,
      description,
      creationDate,
      idAssoc,
    });
    return response.data.substring("Announcement created with id ".length);
  } catch (e) {
    console.log(e);
  }
  return -1;
}
