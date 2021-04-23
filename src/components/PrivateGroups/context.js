import React, { useState, useContext, useEffect } from "react";
import {
  getGroupInfo,
  getGroupsUserBelongTo,
  getGroupUsers,
  getPrivateAnnouncements,
  getPrivateEvents,
  getSuggestedGroups,
  setUsersGroupStatus,
} from "../../API/groups";
import { UserContext } from "../Login/UserContext";

const PrivateGroupsContext = React.createContext();

const PrivateGroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const user = useContext(UserContext);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [privateGroup, setPrivateGroup] = useState({ groupInfo: { title: "" } });
  const [groupLoading, setGroupLoading] = useState(true);
  const [suggestedGroups, setSuggestedGroups] = useState([]);

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
      setSuggestedGroups(await getSuggestedGroups(user.idAssoc, user.idAccount));
      setGroups(tempGroups);
    };
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [user.idAccount]);

  //fetching given private group
  useEffect(() => {
    const fetchData = async () => {
      if (selectedGroupId) {
        await Promise.all([
          getPrivateEvents(selectedGroupId),
          getPrivateAnnouncements(selectedGroupId),
          getGroupInfo(selectedGroupId),
        ]).then((values) => {
          const feed = [...values[0], ...values[1]].sort(sortByDate);
          setPrivateGroup({ ...privateGroup, feed: feed, groupInfo: values[2] });
          setGroupLoading(false);
        });
      }
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [selectedGroupId, privateGroup]);

  const exitGroupView = () => {
    setSelectedGroupId(null);
    setPrivateGroup({});
    setGroupLoading(true);
  };

  const setUsersStatus = async (idUser, idGroup, status) => {
    await setUsersGroupStatus(idGroup, idUser, status);
  };

  return (
    <PrivateGroupsContext.Provider
      value={{
        groups,
        selectedGroupId,
        setSelectedGroupId,
        privateGroup,
        groupLoading,
        exitGroupView,
        setUsersStatus,
        suggestedGroups,
      }}
    >
      {children}
    </PrivateGroupsContext.Provider>
  );
};

function sortByDate(a, b) {
  return Number(new Date(b.creationDate)) - Number(new Date(a.creationDate));
}

export { PrivateGroupsContext, PrivateGroupsProvider };
