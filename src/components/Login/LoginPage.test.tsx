import React from "react";
import renderer from "react-test-renderer";
import LoginPage from "./LoginPage";

interface OwnProps {
  setUser: Function;
}

const props: OwnProps = {
  setUser: () => {}
};

it("renders correctly", () => {
  const tree = renderer.create(<LoginPage {...props} />);
  expect(tree).toMatchSnapshot();
});
