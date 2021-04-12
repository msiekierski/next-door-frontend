import React, { FormEvent, FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import { Button, Card, Form, FormControl, InputGroup, Toast } from "react-bootstrap";
import { BiExit } from "react-icons/bi";
import { getMessages, sendMessage } from "../../../API/chats";
import { UserContext } from "../../Login/UserContext";
import IPrivateMessage from "../IPrivateMessage";
import { GrUser } from "react-icons/gr";
import ReactTimeAgo from "react-time-ago";
import dateToOracleDate from "../../../utils/DateConverter";
import InfiniteScroll from "react-infinite-scroll-component";
import { BallBeat } from "react-pure-loaders";

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
  const messagesRef = useRef(messages);
  const [hasMore, setHasMore] = useState(true);
  messagesRef.current = messages;

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData(0, messagesRef.current.length);
      if (messagesRef.current.length === 10) {
        setHasMore(true);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async (from: number = 0, to: number = 10) => {
    const newMessages = await getMessages(idAccount, user?.idAccount!, from, to);
    if (from > 0) {
      setMessages([...messages, ...newMessages.sort(sortByDate)]);
    } else {
      setMessages(newMessages.sort(sortByDate));
    }
  };

  const fetchMoreData = async () => {
    setTimeout(async () => {
      const newMessages = await getMessages(idAccount, user?.idAccount!, messages.length, messages.length + 10);
      setMessages([...messages, ...newMessages]);
      if (newMessages.length < 10) {
        setHasMore(false);
      }
    }, 1500);
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (newMessage) {
      await sendMessage(user?.idAccount!, idAccount, newMessage, dateToOracleDate(new Date()));
      fetchData();
      setNewMessage("");
    }
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
        <div
          id="scrollableDiv"
          style={{ height: 600, overflow: "auto", display: "flex", flexDirection: "column-reverse" }}
        >
          {messages.length ? (
            <InfiniteScroll
              dataLength={messages.length}
              next={fetchMoreData}
              style={{ display: "flex", flexDirection: "column-reverse" }}
              inverse={true}
              hasMore={hasMore}
              loader={
                <div className="text-center">
                  <BallBeat color={`#ACACA6`} loading={true} />
                </div>
              }
              scrollableTarget="scrollableDiv"
            >
              {messages.reverse().map(({ receiver_name, receiver_surname, message, send_date, id_sender }, index) => {
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
            </InfiniteScroll>
          ) : (
            <h4 className="text-center mb-4 text-muted">No messages</h4>
          )}
        </div>
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
