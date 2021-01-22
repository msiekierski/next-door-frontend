import React from "react";
import renderer from "react-test-renderer";
import AdvertisementCreator from "./AdvertisementCreator"
import IAdvertisementCreator from "./IAdvertisementCreator";

const props: IAdvertisementCreator = {
    hideAdvertisementCreator: () => {},
    addNewAdvertisement: () => {}
}

it("renders correctly", () => {
  const tree = renderer.create(<AdvertisementCreator {...props} />);
  expect(tree).toMatchSnapshot();
});
