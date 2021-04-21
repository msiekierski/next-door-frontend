import axios from "axios";
import IChatUser from "../components/Chat/IChatUser";
import IPrivateMessage from "../components/Chat/IPrivateMessage";

export async function getMessages(idReceiver: number, idSender: number, startRows: number = 0, messageCount: number = 25):Promise<Array<IPrivateMessage>>
{
  try {
    const { data } = await axios.get(`http://localhost:8080/nexDoor/get/privateMessage/${idReceiver}/${idSender}`, {
      params: { startRows, messageCount },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
  return [];
}

export async function getChatList(idReceiver: number): Promise<Array<IChatUser>> {
  try {
    const { data } = await axios.get(`http://localhost:8080/nexDoor/get/listChat/${idReceiver}`);
    const chatList = data.map((chat) => {
      return {name: chat.name, surname: chat.surname, idSender: chat.idAway}
    })
    return chatList;
  } catch (e) {
    console.log(e);
  }
  return [];
}

export async function sendMessage(idSender: number, idReceiver: number, message: string, sendDate: string){
    try {
        await axios.post(`http://localhost:8080/nexDoor/create/private_message`, {idSender, idReceiver, message, sendDate});
    } catch (e) {
        console.log(e)
    }
}

export async function getUsersByNickname(idAssoc:number, nickname: string): Promise<Array<IChatUser>> {
  try {
    const {data} = await axios.get(`http://localhost:8080/nexDoor/search/user/${idAssoc}/${nickname}`);
    const mappedData:Array<IChatUser> = data.map((user) => {
      const chatUser:IChatUser = {idSender: user.idAccount, name:user.name, surname: user.surname}
      return chatUser;
    })
    return mappedData;
  } catch (e) {
    console.log(e)
  }
  return [];
}