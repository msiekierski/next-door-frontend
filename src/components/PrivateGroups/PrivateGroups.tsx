import React, { useContext } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { PrivateGroupsContext } from "./context";
import { ListGroupUserBelongsTo } from "./GroupsLists/ListGroupUserBelongsTo";
import ListGroupUserNotBelongingTo from "./GroupsLists/ListGroupUserNotBelongingTo";
import PrivateGroup from "./PrivateGroup/PrivateGroup";

const PrivateGroups = () => {
  const { selectedGroupId, groups } = useContext(PrivateGroupsContext);

  if (selectedGroupId) {
    return <PrivateGroup />;
  }
  return (
    <Tabs className="mt-3 justify-content-center nav-fill">
      {groups.length > 0 && (
        <Tab eventKey="belongingTo" title="Groups you belong to">
          <ListGroupUserBelongsTo />
        </Tab>
      )}
      <Tab eventKey="suggestedGroups" title="Join other groups">
        <ListGroupUserNotBelongingTo />
      </Tab>
    </Tabs>
  );
};

export default PrivateGroups;
