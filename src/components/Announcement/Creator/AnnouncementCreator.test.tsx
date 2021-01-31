import React from "react";
import renderer from "react-test-renderer"
import AnnouncementCreator from "./AnnouncementCreator";
import IAnnouncementCreator from "./IAnnouncementCreator"

const props: IAnnouncementCreator = {
    hideAnnouncementCreator: () => {},
    createFeed: () => {}
}

it("renders correctly", () => {
  const tree = renderer.create(<AnnouncementCreator {...props}/>);
  expect(tree).toMatchSnapshot()
})