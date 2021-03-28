import React, { FormEvent, FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import { Button, Card, Form, FormControl, InputGroup, Toast } from "react-bootstrap";
import { BiExit } from "react-icons/bi";
import { getMessages, sendMessage } from "../../../API/chats";
import { UserContext } from "../../Login/UserContext";
import IPrivateMessage from "../IPrivateMessage";
import { GrUser } from "react-icons/gr";
import ReactTimeAgo from "react-time-ago";
import dateToOracleDate from "../../../utils/DateConverter";

export interface ChatBoxProps {
  name: string;
  surname: string;
  idAccount: number;
  exitChatBox: Function;
}

const ChatBox: FunctionComponent<ChatBoxProps> = ({ name, surname, idAccount, exitChatBox }) => {
  const [messages, setMessages] = useState<Array<IPrivateMessage>>([]);
  const user = useContext(UserContext);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    const messages = await getMessages(idAccount, user?.idAccount!, 0, 255);
    setMessages(messages.sort(sortByDate).slice(0, 5));
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    await sendMessage(user?.idAccount!, idAccount, newMessage, dateToOracleDate(new Date()));
    fetchData();
    setNewMessage("");
  };

  return (
    <Card className="mt-3">
      <div className="d-flex justify-content-between m-4">
        <Card.Title>
          <div className="font-weight-normal">Your conversation with </div>
          {`${name} ${surname}`}
        </Card.Title>
        <Card.Title>
          <BiExit onClick={(e) => exitChatBox()} />
        </Card.Title>
      </div>
      <Card.Body>
        {messages
          .slice(0, 5)
          .reverse()
          .map(({ receiver_name, receiver_surname, message, send_date, id_sender }, index) => {
            return (
              <div
                className={`mb-2 d-flex justify-content-${id_sender === user?.idAccount ? "end" : "start"}`}
                key={index}
              >
                <Toast>
                  <Toast.Header closeButton={false}>
                    <GrUser className="mr-1" />
                    <strong className="mr-auto">
                      {id_sender === user?.idAccount ? user.name + " " + user.surname : name + " " + surname}
                    </strong>
                    <small>
                      · <ReactTimeAgo date={new Date(send_date)} locale="en-US" />
                    </small>
                  </Toast.Header>
                  <Toast.Body>{message}</Toast.Body>
                </Toast>
              </div>
            );
          })}
      </Card.Body>
      <Card.Footer>
        <Form onSubmit={handleSendMessage}>
          <InputGroup>
            <FormControl value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            <InputGroup.Append>
              <Button variant="primary" onClick={handleSendMessage}>
                Send
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </Card.Footer>
    </Card>
  );
};

function sortByDate(a: IPrivateMessage, b: IPrivateMessage) {
  return Number(new Date(b.send_date)) - Number(new Date(a.send_date));
}

export default ChatBox;
