import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { getMessages, getChatList } from "../../API/chats";
import { UserContext } from "../Login/UserContext";
import Search from "../Search/Search";
import IPrivateMessage from "./IPrivateMessage";
import { GrUser } from "react-icons/gr";
import ReactTimeAgo from "react-time-ago";
import ChatBox, { ChatBoxProps } from "./ChatBox/ChatBox";
import IChatUser from "./IChatUser";

const Chat = () => {
  const user = useContext(UserContext);
  const [filter, setFilter] = useState("");
  const [chatUsers, setChatUsers] = useState<Array<IChatUser>>([]);
  const [messages, setMessages] = useState<Array<IPrivateMessage>>([]);
  const [currentlyTexting, setCurrentlyTexting] = useState<ChatBoxProps | null>(null);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      let chatList = await getChatList(user?.idAccount!);
      chatList = chatList.filter((chatUser) => chatUser.idSender !== user?.idAccount);
      const promises = chatList.map(async (chatUser) => {
        const temp = await getMessages(chatUser.idSender, user?.idAccount!, 0, 300);
        return temp;
      });
      const currentMessages = await Promise.all(promises);
      if (!ignore) {
        setChatUsers([...chatList]);
        setMessages([...currentMessages.flat().sort(sortByDate)]);
      }
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => {
      ignore = true;
      clearInterval(interval);
    };
  }, []);

  const exitChatBox = () => {
    setCurrentlyTexting(null);
  };

  if (currentlyTexting == null) {
    return (
      <main>
        <div className="mb-3">
          <Search setFilter={setFilter} />
        </div>
        {console.log(chatUsers)}
        {chatUsers.map((chatUser) => {
          const lastMessage = messages.find(
            (message) =>
              (message.id_receiver === user?.idAccount && message.id_sender === chatUser.idSender) ||
              (message.id_receiver === chatUser.idSender && message.id_sender === user?.idAccount)
          );
          if (lastMessage) {
            const { send_date } = lastMessage;
            return (
              <Card
                key={chatUser.idSender}
                className="mb-1"
                onClick={() =>
                  setCurrentlyTexting({
                    name: chatUser.name,
                    surname: chatUser.surname,
                    idAccount: chatUser.idSender,
                    exitChatBox: exitChatBox,
                  })
                }
              >
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <div>
                      <GrUser className="mr-2" />
                      {`${chatUser.name} ${chatUser.surname}`}
                    </div>
                    <div>
                      · <ReactTimeAgo date={new Date(send_date)} locale="en-US" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            );
          }
        })}
      </main>
    );
  } else {
    return <ChatBox {...currentlyTexting} />;
  }
};

function sortByDate(a: IPrivateMessage, b: IPrivateMessage) {
  return Number(new Date(b.send_date)) - Number(new Date(a.send_date));
}

export default Chat;
