import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import ModalUsers from "../../../Event/Users/EventUsers";
import { UserContext } from "../../../Login/UserContext";
import { PrivateGroupsContext } from "../../context";
import { BiExit } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import { ACCEPTED, PENDING } from "../InvitationSatatus";
import JoinRequests from "../JoinRequests";

const GroupInfo = () => {
  const { privateGroup, groups, exitGroupView } = useContext(PrivateGroupsContext);
  const user = useContext(UserContext);
  const [showModalUsersNormal, setShowModalUsersNormal] = useState(false);
  const [showModalJoinRequests, setShowModalJoinRequests] = useState(false);

  const { users } = groups.filter((group) => group.idGroup === privateGroup.groupInfo.idGroup)[0];
  const acceptedUsers = users.filter((groupUser) => groupUser.status === ACCEPTED);
  const pendingRequests = users.filter((groupUser) => groupUser.status === PENDING);
  const isUserOwner = user?.idAccount === privateGroup.groupInfo.idAccount;

  return (
    <Card className="mt-2">
      <Card.Header>
        <div className="d-flex justify-content-between">
          <Card.Title>{privateGroup.groupInfo.title}</Card.Title>
          <div className="d-flex flex-row align-items-center">
            <h4>
              {isUserOwner && (
                <Card.Link href="#" className="text-muted mr-2">
                  <GrEdit />
                </Card.Link>
              )}

              <BiExit onClick={() => exitGroupView()} />
            </h4>
          </div>
        </div>
        <Card.Body>
          {showModalUsersNormal && (
            <ModalUsers
              users={acceptedUsers}
              show={showModalUsersNormal}
              onHide={() => setShowModalUsersNormal(false)}
              title={`Members of ${privateGroup.groupInfo.title}`}
            />
          )}
          <div className="d-flex justify-content-between">
            {privateGroup.groupInfo.description}
            <Card.Link href="#" onClick={() => setShowModalUsersNormal(true)}>
              See {acceptedUsers.length} members
            </Card.Link>
          </div>
        </Card.Body>
      </Card.Header>
      <Card.Footer>
          <JoinRequests users={pendingRequests} show={showModalJoinRequests} onHide={() => setShowModalJoinRequests(false)}/>
        {isUserOwner ? (
          <Card.Link href="#" onClick={() => setShowModalJoinRequests(true)}>
            You have {pendingRequests.length} join request(s)
          </Card.Link>
        ) : (
          <Card.Link>Leave group</Card.Link>
        )}
      </Card.Footer>
    </Card>
  );
};

export default GroupInfo;
