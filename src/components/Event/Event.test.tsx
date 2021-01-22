import React from "react";
import renderer from "react-test-renderer";
import { EVENT_TYPE } from "../../constants/constants";
import Event from "./Event";
import IEvent from "./IEvent";

type Props = IEvent & {
  removeFeed: Function;
  updateFeed: Function;
};

const event: Props = {
  idEvent: 0,
  idCreator: 1,
  title: "New event",
  description: "Come, join us!",
  creationDate: new Date().toString(),
  eventDate: new Date().setDate(new Date().getDate() + 10).toString(),
  idAssoc: 1,
  type: EVENT_TYPE,
  removeFeed: () => {},
  updateFeed: () => {},
};

it("renders correctly", () => {
  const tree = renderer.create(<Event {...event} />);
  expect(tree).toMatchSnapshot();
});
