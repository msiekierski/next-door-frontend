import React, { useContext } from "react";
import { Tab, Tabs, Spinner } from "react-bootstrap";
import ErrorPage from "../ErrorPage/ErrorPage";
import { PrivateGroupsContext, useGroupsContext } from "./context";
import { ListGroupUserBelongsTo } from "./GroupsLists/ListGroupUserBelongsTo";
import ListGroupUserNotBelongingTo from "./GroupsLists/ListGroupUserNotBelongingTo";
import LoadingSpinner from "./LoadingSpinner";
import PrivateGroup from "./PrivateGroup/PrivateGroup";

const PrivateGroups = () => {
  const { selectedGroupId } = useContext(PrivateGroupsContext);

  const { groupsLoading, groups, groupsError, firstFetchGroups } = useGroupsContext();

  if (groupsLoading && firstFetchGroups) {
    return <LoadingSpinner />;
  }
  if (groupsError) {
    return <ErrorPage />;
  }
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
