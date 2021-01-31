import React from "react";
import renderer from "react-test-renderer";
import Administration from "./Administration"

it("renders correctly", () => {
  const tree = renderer.create(<Administration />);
  expect(tree).toMatchSnapshot();
});
