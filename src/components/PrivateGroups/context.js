import React, { useState, useContext, useEffect } from "react";
import { getGroupsUserBelongTo, getGroupUsers } from "../../API/groups";
import { UserContext } from "../Login/UserContext";

const PrivateGroupsContext = React.createContext();

const PrivateGroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const tempGroups = await getGroupsUserBelongTo(user.idAccount);
      const promises = tempGroups.map(async (group) => {
        const users = await getGroupUsers(group.idGroup);
        return users;
      });
      const groupsUsers = await Promise.all(promises);
      tempGroups.forEach((group, index) => {
        group.users = groupsUsers[index];
      });
      setGroups(tempGroups);
    };
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <PrivateGroupsContext.Provider value={{ groups }}>{children}</PrivateGroupsContext.Provider>;
};

export { PrivateGroupsContext, PrivateGroupsProvider };
