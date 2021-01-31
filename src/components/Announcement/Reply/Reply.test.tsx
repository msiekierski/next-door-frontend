import React from "react";
import renderer from "react-test-renderer";
import Reply from "./Reply"

interface Props {
    commentAdd: Function;
    idAnnouncement: number;
}

const props:Props = {
    commentAdd: () => {},
    idAnnouncement: 1
}

it("renders correctly", () => {
  const tree = renderer.create(<Reply {...props} />);
  expect(tree).toMatchSnapshot();
});
