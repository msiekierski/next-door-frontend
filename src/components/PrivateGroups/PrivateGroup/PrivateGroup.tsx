import React, { useContext } from "react";
import { PrivateGroupsContext } from "../context";
import GroupInfo from "./GroupInfo/GroupInfo";

const PrivateGroup = () => {
  const { privateGroup, groupLoading } = useContext(PrivateGroupsContext);

  if (groupLoading) {
      return <div>Loading...</div>
  }
  return (
      <GroupInfo />
  );
};

export default PrivateGroup;
