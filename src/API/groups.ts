import axios from "axios";
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
