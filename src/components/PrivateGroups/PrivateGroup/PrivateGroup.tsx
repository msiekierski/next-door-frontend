import React, { useContext } from "react";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { PrivateGroupsContext, useGroupsContext } from "../context";
import LoadingSpinner from "../LoadingSpinner";
import GroupInfo from "./GroupInfo/GroupInfo";

const PrivateGroup = () => {
  //const { privateGroup, groupLoading } = useContext(PrivateGroupsContext);
  const { groupLoading, groupError, firstFetchGroup } = useGroupsContext();

  if (groupLoading && firstFetchGroup) {
    return <LoadingSpinner />;
  } else if (groupError) {
    return <ErrorPage />;
  }
  return <GroupInfo />;
};

export default PrivateGroup;
