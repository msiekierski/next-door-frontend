import React from "react";
import renderer from "react-test-renderer";
import AnnouncementAdmin from "./AnnoucementAdmin"
import IAnnouncementAdmin from "./IAnnoucementAdmin";

const props: IAnnouncementAdmin = {
    idAnnouncement: 1,
    idAccount: 1,
    announcementType: "administrative",
    title: "Ann",
    desc: "desc",
    creationDate: new Date().toString(),
    author: "John Doe",
    comments: []
}

it("renders correctly", () => {
  const tree = renderer.create(<AnnouncementAdmin {...props} />);
  expect(tree).toMatchSnapshot();
});
