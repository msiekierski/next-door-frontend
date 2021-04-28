import React, { useContext } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { ImCross, ImCheckmark, ImBlocked } from "react-icons/im";
import { deleteUserFromGroup } from "../../../API/groups";
import { useGroupsContext } from "../context";
import { ACCEPTED_RESPONSE_CODE, BLOCKED_RESPONSE_CODE, REJECTED_RESPONSE_CODE } from "./InvitationSatatus";

const JoinRequests = ({ users, show, onHide }) => {
  const { setUsersStatus, selectedGroupId } = useGroupsContext();

  const handleDecision = async (idUser: number, status: number) => {
    await setUsersStatus(selectedGroupId, idUser, status);
  };

  const handleRejection = async (idUser: number) => {
    await deleteUserFromGroup(selectedGroupId, idUser);
  };

  return (
    <Modal
      animation={false}
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-model-title-vcenter">Pending join requests</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {users.length === 0 ? (
          <h4 className="align-items-center">No pending requests</h4>
        ) : (
          <ListGroup>
            {users &&
              users.map((user) => {
                return (
                  <ListGroup.Item key={user.idAccount}>
                    <div className="d-flex justify-content-between">
                      {user.name} {user.surname}
                      <h5 className="d-flex flex-row align-items-center">
                        <ImCheckmark
                          title="Accept"
                          className="mr-2 text-success"
                          onClick={() => handleDecision(user.idAccount, ACCEPTED_RESPONSE_CODE)}
                        />
                        <ImCross
                          title="Reject"
                          className="mr-2 text-warning"
                          onClick={() => handleRejection(user.idAccount)}
                        />
                        <ImBlocked
                          title="Block"
                          className="text-danger"
                          onClick={() => handleDecision(user.idAccount, BLOCKED_RESPONSE_CODE)}
                        />
                      </h5>
                    </div>
                  </ListGroup.Item>
                );
              })}
          </ListGroup>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default JoinRequests;
