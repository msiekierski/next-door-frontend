import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getGroupUsers } from "../../../API/groups";
import ModalUsers from "../../Event/Users/EventUsers";
import { PrivateGroupsContext } from "../context";

export const ListGroupUserBelongsTo = () => {
  const { groups } = useContext(PrivateGroupsContext);
    const [showModal, setShowModal] = useState(false);

    console.log(groups)

  return (
    <>
      {groups &&
        groups.map((group) => {
          return (
            <Card className="mt-2" key={groups.idGroup}>
              <Card.Header>
                <b>{group.title}</b>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>{group.description}</div>
                  <div>Owned By: {group.ownerName + " " + group.ownerSurname}</div>
                </div>
              </Card.Body>
              <Card.Footer className="text-right">
                  {showModal && <ModalUsers users={group.users} show={showModal} onHide={() => setShowModal(false)} title={`Memebers of ${group.title}`}/>}
                <Card.Link onClick={() => setShowModal(true)} href="#">Show {group.users.length} members </Card.Link>
              </Card.Footer>
            </Card>
          );
        })}
    </>
  );
};
