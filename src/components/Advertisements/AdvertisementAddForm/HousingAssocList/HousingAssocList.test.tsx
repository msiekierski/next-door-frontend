import React from "react";
import renderer from "react-test-renderer";
import HousingAssocList from "./HousingAssocList"

interface Props {
    setCharge: Function;
}

const props: Props = {
    setCharge: () => {}
}


it("renders correctly", () => {
  const tree = renderer.create(<HousingAssocList {...props} />);
  expect(tree).toMatchSnapshot();
});
