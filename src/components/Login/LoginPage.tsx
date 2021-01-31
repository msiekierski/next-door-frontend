import React, { ChangeEvent, FormEvent, FunctionComponent, useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { getUser } from "../../API/login";

interface OwnProps {
  setUser: Function;
}

type Props = OwnProps;

const LoginPage: FunctionComponent<Props> = ({ setUser }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  function handleLoginChange(event: ChangeEvent<HTMLInputElement>) {
    let login = event.currentTarget.value;
    setLogin(login);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    let password = event.currentTarget.value;
    setPassword(password);
  }

  async function handleSubmit(event: FormEvent) {
    if (mounted) {
      event.preventDefault();
      const user = await getUser(login, password);
      console.log(user);
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setError("");
      } else {
        setUser(null);
        setError("Invalid Credentials");
      }
    }
  }

  function Error(error: String) {
    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    } else {
      return null;
    }
  }

  return (
    <div className="vh-100 d-flex align-items-center bg-secondary">
      <Container className="w-50 m-auto">
        <Container className="p-5 bg-primary text-white">
          <h2 className="mb-3">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Login</Form.Label>
              <Form.Control type="text" placeholder="Enter email" onChange={handleLoginChange} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
            </Form.Group>
            {Error(error)}
            <Button className="d-block ml-auto" variant="light" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </Container>
    </div>
  );
};

export default LoginPage;
