import React from "react";
import renderer from "react-test-renderer";
import IComment from "../Comment/IComment";
import CommentList from "./CommentList";

const comments: Array<IComment> = [
  {
    creationDate: new Date().toDateString(),
    description: "Hej",
    idAccount: 0,
    idAnnouncement: 0,
  },
  {
    creationDate: new Date().toDateString(),
    description: "Hello",
    idAccount: 0,
    idAnnouncement: 0,
  },
  {
    creationDate: new Date().toDateString(),
    description: "Welcome!",
    idAccount: 0,
    idAnnouncement: 0,
  },
];

it("renders correctly empty", () => {
  const tree = renderer.create(<CommentList comments={[]} />);
  expect(tree).toMatchSnapshot();
});

it("renders correctly with comments", () => {
  const tree = renderer.create(<CommentList comments={comments} />);
  expect(tree).toMatchSnapshot();
});
