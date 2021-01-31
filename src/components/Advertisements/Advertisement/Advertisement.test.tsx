import React from "react";
import renderer from "react-test-renderer";
import Advertisement from "./Advertisement";
import IAdvertisement from "./IAdvertisement";

type Props = IAdvertisement & { status: number };

const props1: Props = {
    idAd: 1,
    idAccount: 1,
    title: "Advertisement",
    description: "ad desc",
    price: 20,
    updateAdvertisement: () => {},
    removeAdvertisement: () => {},
    status: 0
}

const props2: Props = {
  idAd: 1,
  idAccount: 1,
  title: "Advertisement",
  description: "ad desc",
  price: 20,
  updateAdvertisement: () => {},
  removeAdvertisement: () => {},
  status: 1,
};

it("renders correctly unpaid ad", () => {
  const tree = renderer.create(<Advertisement {...props1}/>);
  expect(tree).toMatchSnapshot();
});


it("renders correctly paid ad", () => {
  const tree = renderer.create(<Advertisement {...props2} />);
  expect(tree).toMatchSnapshot();
});
