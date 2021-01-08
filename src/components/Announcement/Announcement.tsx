import React, { FunctionComponent, MouseEvent } from "react";
import { Card } from "react-bootstrap";
import IAnnouncement from "./IAnnouncement";

export type Props = IAnnouncement;

const Announcement: FunctionComponent<Props> = ({
  announcementType,
  title,
  description,
  creationDate,
  author,
}) => {
  const handleReplyClick = (event: MouseEvent) => {
    console.log("reply shows");
    // event.preventDefault();
  };
  const handleShowRepliesClick = (event: MouseEvent) => {
    console.log("reply shows");
    event.preventDefault();
  };
  const variant = lookUpVariant(announcementType);

  return (
    <Card className={`mt-3`}>
      <Card.Header className={`bg-${variant}`} />
      <Card.Body>
        <Card.Title className={`d-flex justify-content-between`}>
          <span>{title}</span>
          <Card.Subtitle className={`text-muted`}>{author}</Card.Subtitle>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle className={`text-muted text-right`}>
          {creationDate.toLocaleDateString()}
          <br />
          {creationDate.toLocaleTimeString(navigator.language, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Card.Subtitle>
      </Card.Body>
      <Card.Footer className={`d-flex justify-content-between`}>
        <Card.Link href={``} onClick={handleReplyClick}>
          Reply
        </Card.Link>
        <Card.Link href={``} onClick={handleShowRepliesClick}>
          No replies yet
        </Card.Link>
      </Card.Footer>
    </Card>
  );
};

function lookUpVariant(variant: string) {
  if (variant === "communal") {
    return "primary";
  } else if (variant === "administrative") return "warning";
}

export default Announcement;
