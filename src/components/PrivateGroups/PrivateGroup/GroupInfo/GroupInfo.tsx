import React, { useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";
import ModalUsers from "../../../Event/Users/EventUsers";
import { UserContext } from "../../../Login/UserContext";
import { PrivateGroupsContext } from "../../context";
import { BiExit } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import { ACCEPTED, PENDING } from "../InvitationSatatus";
import JoinRequests from "../JoinRequests";
import ConfirmationModal from "./ConfirmationModal";

const GroupInfo = () => {
  const { privateGroup, removeUserFromGroup, setSelectedGroup, selectedGroupId } = useContext(PrivateGroupsContext);
  const user = useContext(UserContext);
  const [showModalUsersNormal, setShowModalUsersNormal] = useState(false);
  const [showModalJoinRequests, setShowModalJoinRequests] = useState(false);
  const [showModalLeaveGroup, setShowModalLeaveGroup] = useState(false);
  const { users } = privateGroup;
  const acceptedUsers = users.filter((groupUser) => groupUser.status === ACCEPTED);
  const pendingRequests = users.filter((groupUser) => groupUser.status === PENDING);
  const isUserOwner = user?.idAccount === privateGroup.ownerId;
  console.log("accepted");
  console.log(users);
  const onLeaveConfirm = () => {
    setShowModalLeaveGroup(false);
    removeUserFromGroup(selectedGroupId, user?.idAccount);
    setSelectedGroup(null);
  };

  return (
    <>
      <ConfirmationModal
        show={showModalLeaveGroup}
        handleClose={() => setShowModalLeaveGroup(false)}
        title="Confirmation"
        text="Do you really want to leave this group?"
        handleSuccess={onLeaveConfirm}
      />
      <Card className="mt-2">
        <Card.Header>
          <div className="d-flex justify-content-between">
            <Card.Title>{privateGroup.title}</Card.Title>
            <div className="d-flex flex-row align-items-center">
              <h4>
                {isUserOwner && (
                  <Card.Link href="#" className="text-muted mr-2">
                    <GrEdit />
                  </Card.Link>
                )}
                <BiExit onClick={() => setSelectedGroup(null)} />
              </h4>
            </div>
          </div>
          <Card.Body>
            {showModalUsersNormal && (
              <ModalUsers
                users={acceptedUsers}
                show={showModalUsersNormal}
                onHide={() => setShowModalUsersNormal(false)}
                title={`Members of ${privateGroup.title}`}
              />
            )}
            <div className="d-flex justify-content-between">
              {privateGroup.description}
              <Card.Link href="#" onClick={() => setShowModalUsersNormal(true)}>
                See {acceptedUsers.length} members
              </Card.Link>
            </div>
          </Card.Body>
        </Card.Header>
        <Card.Footer>
          <JoinRequests
            users={pendingRequests}
            show={showModalJoinRequests}
            onHide={() => setShowModalJoinRequests(false)}
          />
          {isUserOwner ? (
            <Card.Link href="#" onClick={() => setShowModalJoinRequests(true)}>
              You have {pendingRequests.length} join request(s)
            </Card.Link>
          ) : (
            <Card.Link onClick={() => setShowModalLeaveGroup(true)}>Leave group</Card.Link>
          )}
        </Card.Footer>
      </Card>
    </>
  );
};

export default GroupInfo;
