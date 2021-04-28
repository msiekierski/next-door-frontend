import React from "react";
import { Alert } from "react-bootstrap";

const ErrorPage = () => {
  return (
    <Alert variant="danger" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <Alert.Heading>Unexpected error occured</Alert.Heading>
      <p>Could not load page or get resources... </p>
    </Alert>
  );
};
export default ErrorPage;
