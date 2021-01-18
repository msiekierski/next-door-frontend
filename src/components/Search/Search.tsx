import React, { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import IAnnouncement from "../Announcement/IAnnouncement";
import IEvent from "../Event/IEvent";

interface OwnProps {
  setFilter: Function;
  sort: Function;
}

type Props = OwnProps;

const Search: FunctionComponent<Props> = ({ setFilter, sort }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const filter = event.target.value.toLowerCase().trim();
    setFilter(filter);
    sort();
  };

  return (
    <InputGroup className={`mt-3`}>
      <FormControl placeholder="Search..." aria-label="Search..." onChange={handleInputChange} />
    </InputGroup>
  );
};

export default Search;
