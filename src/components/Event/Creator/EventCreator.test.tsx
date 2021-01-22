import React from "react";
import renderer from "react-test-renderer";
import EventCreator from "./EventCreator";
import IEventCreator from "./IEventCreator";

const props: IEventCreator = {
  hideEventCreator: () => {},
  createFeed: () => {},
};

it("renders correctly", () => {
  const tree = renderer.create(<EventCreator {...props} />);
  expect(tree).toMatchSnapshot();
});
