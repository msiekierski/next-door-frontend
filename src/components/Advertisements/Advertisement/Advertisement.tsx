import React, { FunctionComponent, MouseEvent, useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import IAdvertisement from "./IAdvertisement";
import { UserContext } from "../../Login/UserContext";
import { deleteAdvertisement, putAdvertisement } from "../../../API/advertisement";

type Props = IAdvertisement;

const Advertisement: FunctionComponent<Props> = ({
  idAd,
  title,
  description,
  status,
  idAccount,
  updateAdvertisement,
  removeAdvertisement,
}) => {
  const user = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(title);
  const [descriptionEdit, setDescriptionEdit] = useState(description);

  const handleCancelEditClick = (e: MouseEvent) => {
    e.preventDefault();
    clearEdit();
    setIsEditing(false);
  };

  const handleSaveEditClick = async (e: MouseEvent) => {
    e.preventDefault();
    await putAdvertisement(idAd, titleEdit, descriptionEdit);
    if (updateAdvertisement) updateAdvertisement(idAd, titleEdit, descriptionEdit);
    clearEdit();
    setIsEditing(false);
  };

  const clearEdit = () => {
    setDescriptionEdit(description);
    setTitleEdit(title);
  };

  const handleDeleteEditClick = async (e: MouseEvent) => {
    e.preventDefault();
    await deleteAdvertisement(idAd);
    if (removeAdvertisement) removeAdvertisement(idAd);
  };

  return (
    <Card className={`mt-3`}>
      <Card.Header className={`bg-success`} />
      <Card.Body>
        <Card.Title className={`d-flex justify-content-between mb-0`}>
          <span>
            {!isEditing ? (
              title
            ) : (
              <Form.Control type="text" value={titleEdit} onChange={(e) => setTitleEdit(e.target.value)} />
            )}
          </span>
          <div className="flex-column">
            <Card.Subtitle className={`text-right mb-3`}>
              {user?.idAccount === idAccount && !isEditing && (
                <span className={`btn `}>
                  <AiOutlineEdit onClick={() => setIsEditing(!isEditing)} />
                </span>
              )}
              {user?.idAccount === idAccount && isEditing && (
                <div className={`d-flex justify-content-end`}>
                  <Button variant="danger" className="mr-2" onClick={handleDeleteEditClick}>
                    Delete
                  </Button>
                  <Button variant="warning" className="mr-2" onClick={handleCancelEditClick}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSaveEditClick}>
                    Save
                  </Button>
                </div>
              )}
            </Card.Subtitle>
          </div>
        </Card.Title>
        <Card.Text>
          {!isEditing ? (
            description
          ) : (
            <Form.Control type="text" value={descriptionEdit} onChange={(e) => setDescriptionEdit(e.target.value)} />
          )}
        </Card.Text>
        {status == 0 ? (
          <Button variant={"warning"}>Activate and pay</Button>
        ) : (
          <Card.Subtitle className={`text-success`}>Active</Card.Subtitle>
        )}
      </Card.Body>
    </Card>
  );
};

function lookUpVariant(variant: string) {
  if (variant === "communal") {
    return "primary";
  } else if (variant === "administrative") return "warning";
}

export default Advertisement;
