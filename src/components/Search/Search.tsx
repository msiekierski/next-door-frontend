import React, { FunctionComponent, MouseEvent } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

interface OwnProps {}

type Props = OwnProps;

const Search: FunctionComponent<Props> = (props) => {
  const clicked = (event: MouseEvent) => {};

  return (
    <InputGroup className={`mt-3`}>
      <FormControl placeholder="Search..." aria-label="Search..." />
      <InputGroup.Append>
        <Button onClick={clicked} variant="outline-secondary">
          Search
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default Search;
