import React from "react";
import { Card } from "react-bootstrap";
import { GrUser } from "react-icons/gr";
import ReactTimeAgo from "react-time-ago";

const ChatListElement = ({ send_date, chatUser, exitChatBox, setCurrentlyTexting }) => {
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
            {send_date !== "never" ? (<ReactTimeAgo date={new Date(send_date)} locale="en-US" />) : <div>Never</div>}
            
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ChatListElement;
