import React, { FormEvent, FunctionComponent, useContext, useRef } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import IComment from "../Comment/IComment";
import { IUser } from "../../Login/IUser";
import { UserContext } from "../../Login/UserContext";
import { createReply } from "../../../API/announcements";

interface OwnProps {
  commentAdd: Function;
  idAnnouncement: number;
}

type Props = OwnProps;

const Reply: FunctionComponent<Props> = ({ commentAdd, idAnnouncement }) => {
  const content = useRef<HTMLInputElement>(null);
  const user = useContext<IUser | null>(UserContext);

  async function handleReply(e: FormEvent) {
    e.preventDefault();
    console.log(idAnnouncement);
    let desc = content && content.current ? content.current.value : "";
    const newComment: IComment = {
      creationDate: new Date().toDateString() + " " + new Date().toLocaleTimeString(),
      description: desc,
      idAccount: user?.idAccount,
      idAnnouncement: idAnnouncement,
    };
    let res = await createReply(newComment);
    commentAdd(newComment);
  }

  return (
    <InputGroup>
      <FormControl placeholder="Put your comment here" aria-label="Put your comment here" ref={content} />
      <InputGroup.Append>
        <Button variant="primary" onClick={handleReply}>
          Reply
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default Reply;
