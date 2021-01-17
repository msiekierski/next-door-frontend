import React, { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import IAnnouncement from "../Announcement/IAnnouncement";
import IEvent from "../Event/IEvent";

interface OwnProps {
  baseFeed: Array<IAnnouncement | IEvent>;
  setFiltered: Function;
}

type Props = OwnProps;

const Search: FunctionComponent<Props> = ({ setFiltered, baseFeed }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const filter = event.target.value.toLowerCase().trim();
    setFiltered(baseFeed.filter((e) => e.title.toLowerCase().includes(filter)));
  };

  return (
    <InputGroup className={`mt-3`}>
      <FormControl placeholder="Search..." aria-label="Search..." onChange={handleInputChange} />
    </InputGroup>
  );
};

export default Search;
