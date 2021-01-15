import axios from "axios";
import { useContext } from "react";
import IAnnouncement from "../components/Announcement/IAnnouncement";
import { IUser } from "../components/Login/IUser";
import { UserContext } from "../components/Login/UserContext";
import IComment from "../components/Announcement/Comment/IComment";

export async function getAllAnnouncements(idAssoc?: number): Promise<Array<IAnnouncement>> {
  try {
    const { data } = await axios.get(`http://localhost:8080/nexDoor/get/announcement/${idAssoc}`, {});
    console.log(data);
    return data;
  } catch (e) {
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
  } catch (e) {}
}

export async function deleteAnnouncement(announcementId: number) {
  try {
    const response = await axios.delete(`http://localhost:8080/nexDoor/delete/announcement/${announcementId}`, {});
    console.log(response);
  } catch (e) {}
}

export async function createAnnouncement(announcement: IAnnouncement) {
  try {
    const { data } = await axios.post(`http://localhost:8080/nexDoor/create/announcement`, {
      ...announcement,
    });
    return data;
  } catch (e) {}
}

export async function createReply(comment: IComment) {
  try {
    const response = await axios.post(`http://localhost:8080/nexDoor/post/replay`, {
      ...comment,
    });
  } catch (e) {}
}
