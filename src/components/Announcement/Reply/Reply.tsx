import React, { FunctionComponent } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

interface OwnProps {}

type Props = OwnProps;

const Reply: FunctionComponent<Props> = (props) => {
  return (
    <InputGroup>
      <FormControl
        placeholder="Put your comment here"
        aria-label="Put your comment here"
      />
      <InputGroup.Append>
        <Button variant="primary">Reply</Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default Reply;
