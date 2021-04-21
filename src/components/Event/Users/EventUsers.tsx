import React, { FunctionComponent } from "react";
import { Button } from "react-bootstrap";
import { ListGroup, Modal } from "react-bootstrap";
import IEventUser from "../IEventUser";

interface Props {
    users: Array<IEventUser>
    show: boolean,
    onHide: Function,
    title: string;
}

const ModalUsers: FunctionComponent<Props> = ({users, show, onHide, title}) => {
    return (
      <Modal animation={false} size="lg" show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {users && users.map((user) => {
              return (
                <ListGroup.Item key={user.idAccount}>
                  {user.name} {user.surname}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Modal.Body>
      </Modal>
    );
}

export default ModalUsers;