import React from "react";
import renderer from "react-test-renderer";
import AdvertisementPage from "./AdvertisementsPage";

it("renders correctly", () => {
  const tree = renderer.create(<AdvertisementPage />);
  expect(tree).toMatchSnapshot();
});
