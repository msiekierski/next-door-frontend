import React, { FormEvent, FunctionComponent, useContext, useRef, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { putUser } from "../../../../API/settings";
import { SetUserContext, UserContext } from "../../../Login/UserContext";

interface Props {
  closePasswordChange: Function;
}

const SettingsAccountPassword: FunctionComponent<Props> = ({ closePasswordChange }) => {
  const user = useContext(UserContext);
  const setUser = useContext(SetUserContext)
  const currPassRef = useRef<HTMLInputElement>(null);
  const newPassRef = useRef<HTMLInputElement>(null);
  const rNewPassRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (currPassRef.current?.value === user?.password && newPassRef.current?.value === rNewPassRef.current?.value) {
      await putUser(user?.idAccount!, undefined, newPassRef.current?.value!);
      const newUser = {
        ...JSON.parse(localStorage.getItem("user")!),
        password: newPassRef.current?.value,
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    } else if (newPassRef.current?.value !== rNewPassRef.current?.value) {
        setError("New password and repeated must match!");
    } else if (currPassRef.current?.value !== user?.password) {
        setError("Current password is not correct!")
    }
    closePasswordChange()
  };

  return (
    <Card.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Row className="form-row align-items-center d-flex justify-content-center mb-2">
          <Form.Label className="mr-2">Current Password</Form.Label>
          <Form.Control
            ref={currPassRef}
            required
            className="w-25 mr-2"
            type="password"
            placeholder="Your current password..."
          />
        </Form.Row>
        <Form.Row className="form-row align-items-center d-flex justify-content-center  mb-2">
          <Form.Label className="mr-2">New Password</Form.Label>
          <Form.Control
            ref={newPassRef}
            required
            className="w-25 mr-2"
            type="password"
            placeholder="Your new password..."
          />
        </Form.Row>
        <Form.Row className="form-row align-items-center d-flex justify-content-center mb-2">
          <Form.Label className="mr-2">Repeat New Password</Form.Label>
          <Form.Control
            ref={rNewPassRef}
            required
            className="w-25 mr-2"
            type="password"
            placeholder="Repeat your new password..."
          />
        </Form.Row>
        {error.length > 0 && (
          <div className="d-flex justify-content-center">
            <Alert variant="danger">{error}</Alert>
          </div>
        )}
        <Form.Row className="form-row align-items-center d-flex justify-content-center">
          <Button className="mr-1" variant="warning" onClick={() => closePasswordChange()}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </Form.Row>
      </Form>
    </Card.Body>
  );
};

export default SettingsAccountPassword;
