import React, { useContext } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { PrivateGroupsContext } from "./context";
import { ListGroupUserBelongsTo } from "./ListGroupsUserBelongsTo/ListGroupUserBelongsTo";

const PrivateGroups = () => {
  const { groups } = useContext(PrivateGroupsContext);

  return (
    <Tabs className="mt-3 justify-content-center nav-fill">
      <Tab eventKey="belongingTo" title="Groups you belong to">
        <ListGroupUserBelongsTo />
      </Tab>
      <Tab eventKey="suggestedGroups" title="Join other groups">
        <div>Grupy do ktorych chcesz dojsc</div>
      </Tab>
    </Tabs>
  );
};

export default PrivateGroups;
