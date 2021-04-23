import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { deleteUserFromGroup, sendJoinRequest } from "../../../API/groups";
import { UserContext } from "../../Login/UserContext";
import { PrivateGroupsContext } from "../context";
import { NOT_IN_GROUP } from "../PrivateGroup/InvitationSatatus";

const ListGroupUserNotBelongingTo = () => {
  const { suggestedGroups } = useContext(PrivateGroupsContext);
  const user = useContext(UserContext);

  const handleJoinRequest = async (idGroup: number) => {
    await sendJoinRequest(idGroup, user?.idAccount!);
  };

  const handleCancelRequest = async (idGroup: number) => {
    await deleteUserFromGroup(idGroup, user?.idAccount!);
  };

  return (
    <>
      {suggestedGroups &&
        suggestedGroups.map((group, index) => {
          return (
            <Card className="mt-2" key={index}>
              <Card.Header>
                <b>{group.title}</b>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between flex-row align-items-center">
                  {group.description}
                  {group.status === NOT_IN_GROUP ? (
                    <Button variant="outline-primary" onClick={() => handleJoinRequest(group.idGroup)}>
                      Send Join Request
                    </Button>
                  ) : (
                    <Button variant="outline-danger" onClick={() => handleCancelRequest(group.idGroup)}>
                      Cancel Join Request
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          );
        })}
    </>
  );
};

export default ListGroupUserNotBelongingTo;
