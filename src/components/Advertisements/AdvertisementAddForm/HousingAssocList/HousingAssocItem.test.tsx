import React from "react"
import renderer from "react-test-renderer"
import HousingAssocItem from "./HousingAssocItem"
import { IHousingAssoc } from "./IHousingAssoc";

type Props = IHousingAssoc & {
  setCharge: Function;
};


const props: Props = {
    name: "My Assoc",
    idAssoc: 1,
    city: "Wroclaw",
    street: "Rynek",
    postalCode: "50-000",
    setCharge: () => {}
}



it("renders correctly", () => {
  const tree = renderer.create(<HousingAssocItem {...props}/>);
  expect(tree).toMatchSnapshot();
});