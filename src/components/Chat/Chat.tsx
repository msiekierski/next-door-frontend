import React, { useContext, useEffect, useState } from "react";
import { getMessages, getChatList, getUsersByNickname } from "../../API/chats";
import { UserContext } from "../Login/UserContext";
import Search from "../Search/Search";
import IPrivateMessage from "./IPrivateMessage";
import ChatBox, { ChatBoxProps } from "./ChatBox/ChatBox";
import IChatUser from "./IChatUser";
import ChatListElement from "./ChatListElement";

const Chat = () => {
  const user = useContext(UserContext);
  const [filter, setFilter] = useState("");
  const [chatUsers, setChatUsers] = useState<Array<IChatUser>>([]);
  const [messages, setMessages] = useState<Array<IPrivateMessage>>([]);
  const [currentlyTexting, setCurrentlyTexting] = useState<ChatBoxProps | null>(null);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      if (filter === "") {
        let chatList = await getChatList(user?.idAccount!);
        chatList = chatList.filter((chatUser) => chatUser.idSender !== user?.idAccount);
        const promises = chatList.map(async (chatUser) => {
          const temp = await getMessages(chatUser.idSender, user?.idAccount!, 0, 1);
          return temp;
        });
        const currentMessages = await Promise.all(promises);
        if (!ignore) {
          setChatUsers([...chatList]);
          setMessages([...currentMessages.flat().sort(sortByDate)]);
        }
      } else {
        const users = await getUsersByNickname(user?.idAssoc!, filter);
        setChatUsers(users.filter((chatUser) => chatUser.idSender !== user?.idAccount));
      }
    };
    const interval = setInterval(() => {
      fetchData();
    }, 200);

    return () => {
      ignore = true;
      clearInterval(interval);
    };
  }, [filter]);

  const exitChatBox = () => {
    setCurrentlyTexting(null);
    setFilter("");
  };

  if (currentlyTexting == null) {
    return (
      <div>
        <div className="mb-3">
          <Search setFilter={setFilter} />
        </div>
        {chatUsers.map((chatUser, index) => {
          const lastMessage = messages.find(
            (message) =>
              (message.id_receiver === user?.idAccount && message.id_sender === chatUser.idSender) ||
              (message.id_receiver === chatUser.idSender && message.id_sender === user?.idAccount)
          );
          if (lastMessage) {
            const { send_date } = lastMessage;
            return <ChatListElement key={index} {...{ send_date, chatUser, exitChatBox, setCurrentlyTexting }} />;
          } else {
            return (
              <ChatListElement key={index} {...{ send_date: "never", chatUser, exitChatBox, setCurrentlyTexting }} />
            );
          }
        })}
      </div>
    );
  } else {
    return <ChatBox {...currentlyTexting} />;
  }
};

function sortByDate(a: IPrivateMessage, b: IPrivateMessage) {
  return Number(new Date(b.send_date)) - Number(new Date(a.send_date));
}

export default Chat;
