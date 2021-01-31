import React from "react";
import renderer from "react-test-renderer";
import Comment from "./Comment";

it("renders correctly", () => {
  const tree = renderer.create(<Comment creationDate={"test date"} description={"test desc"} />);
  expect(tree).toMatchSnapshot();
});
