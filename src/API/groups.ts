import axios from "axios";
import IAnnouncement from "../components/Announcement/IAnnouncement";
import IEvent from "../components/Event/IEvent";
import { IGroupUser } from "../components/PrivateGroups/IGroupUser";
import IPrivateGroup from "../components/PrivateGroups/IPrivateGroup";

export async function getGroupsUserBelongTo(idUser: number): Promise<Array<IPrivateGroup>> {
  try {
    const { data } = await axios.get(`http://localhost:8080/nexDoor/get/user/${idUser}/groups`);
    return data;
  } catch (e) {}
  return [];
}

export async function getGroupUsers(idGroup: number): Promise<Array<IGroupUser>> {
  try {
    const { data } = await axios.get(`http://localhost:8080/nexDoor/get/privateGroup/users/${idGroup}`);
    return data;
  } catch (e) {}
  return [];
}

export async function getPrivateEvents(idGroup: number): Promise<Array<IEvent>> {
  try {
    const { data } = await axios.get(`http://localhost:8080/nexDoor/get//groups/events/${idGroup}`);
    return data;
  } catch (e) {}
  return [];
}

export async function getPrivateAnnouncements(idGroup: number): Promise<Array<IAnnouncement>> {
  try {
    const { data } = await axios.get(`http://localhost:8080/nexDoor/get/groups/announcement/${idGroup}`);
    return data;
  } catch (e) {}
  return [];
}

export async function getGroupInfo(idGroup: number) {
  try {
    const { data } = await axios.get(`http://localhost:8080/nexDoor/get/group/${idGroup}`);
    return data;
  } catch (e) {}
}

export async function setUsersGroupStatus(idGroup: number, idUser: number, status: number) {
  try {
    await axios.put(`http://localhost:8080/nexDoor/join/group/${idGroup}/user/${idUser}/status/${status}`);
  } catch (e) {}
}

export async function getSuggestedGroups(idAssoc: number, idAccount: number) {
  try {
    const { data } = await axios.get(`http://localhost:8080/nexDoor/get/group/not/${idAssoc}/${idAccount}`);
    return data;
  } catch (e) {}
  return [];
}

export async function sendJoinRequest(idGroup: number, idUser: number) {
  try {
    await axios.post(`http://localhost:8080/nexDoor/join/group/${idGroup}/user/${idUser}`);
  } catch (e) {}
}

export async function deleteUserFromGroup(idGroup: number, idUser: number) {
  try {
    await axios.delete(`http://localhost:8080/nexDoor/delete/group/${idGroup}/user/${idUser}`);
  } catch (e) {}
}
