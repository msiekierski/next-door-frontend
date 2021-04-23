import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PrivateGroupsContext } from "../context";

export const ListGroupUserBelongsTo = () => {
  const { groups, setSelectedGroupId } = useContext(PrivateGroupsContext);

  return (
    <>
      {groups &&
        groups.map((group, index) => {
          return (
            <Card className="mt-2" key={index} onClick={() => setSelectedGroupId(group.idGroup)}>
              <Card.Header>
                <b>{group.title}</b>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>{group.description}</div>
                  <div>Owned By: {group.ownerName + " " + group.ownerSurname}</div>
                </div>
              </Card.Body>
            </Card>
          );
        })}
    </>
  );
};
