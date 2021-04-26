import React, { useState, useContext, useEffect, useReducer } from "react";
import groupsReducer from "../../reducers/groupsReducer";
import {
  deleteUserFromGroup,
  getGroupInfo,
  getGroupsUserBelongTo,
  getGroupUsers,
  getPrivateAnnouncements,
  getPrivateEvents,
  getSuggestedGroups,
  setUsersGroupStatus,
} from "../../API/groups";
import { UserContext } from "../Login/UserContext";
import { ACCEPTED } from "./PrivateGroup/InvitationSatatus";
import axios from "axios";
import {
  GET_GROUPS_BEGIN,
  GET_GROUPS_ERROR,
  GET_GROUPS_SUCCESS,
  GET_GROUP_BEGIN,
  GET_GROUP_ERROR,
  GET_GROUP_SUCCESS,
  SET_SELECTED_GROUP,
} from "../../reducers/groupsActions";

const PrivateGroupsContext = React.createContext();

const initialState = {
  groups: [],
  groupsError: false,
  selectedGroupId: null,
  privateGroup: null,
  groupsLoading: true,
  suggestedGroups: [],
  groupLoading: false,
  groupError: false,
  firstFetchGroups: true,
  firstFetchGroup: true,
};

const PrivateGroupsProvider = ({ children }) => {
  const user = useContext(UserContext);
  const [state, dispatch] = useReducer(groupsReducer, initialState);

  useEffect(() => {
    fetchGroups();
    const interval =
      setInterval(() => {
        fetchGroups();
      },
      1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchGroups = async () => {
    dispatch({ type: GET_GROUPS_BEGIN });
    try {
      const tempGroups = await getGroupsUserBelongTo(user.idAccount);
      const promises = tempGroups.map(async (group) => {
        const users = await getGroupUsers(group.idGroup);
        return users;
      });
      const groupsUsers = await Promise.all(promises);
      tempGroups.forEach((group, index) => {
        group.users = groupsUsers[index];
      });
      const suggestedGroups = await getSuggestedGroups(user.idAssoc, user.idAccount);
      dispatch({ type: GET_GROUPS_SUCCESS, payload: { groups: tempGroups, suggestedGroups } });
    } catch (e) {
      dispatch({ type: GET_GROUPS_ERROR });
    }
  };

  const fetchPrivateGroup = async () => {
    dispatch({ type: GET_GROUP_BEGIN });
    try {
      if (state.selectedGroupId) {
        const elements = await Promise.all([
          getPrivateEvents(state.selectedGroupId),
          getPrivateAnnouncements(state.selectedGroupId),
          getGroupInfo(state.selectedGroupId),
        ]);
        const feed = [...elements[0], elements[1]].sort(sortByDate);
        dispatch({ type: GET_GROUP_SUCCESS, payload: feed });
      }
    } catch (e) {
      dispatch({ type: GET_GROUP_ERROR });
    }
  };

  const setSelectedGroup = (id) => {
    dispatch({ type: SET_SELECTED_GROUP, payload: id });
  };

  useEffect(() => {
    if (state.selectedGroupId != null) {
      fetchPrivateGroup();
    }
    const interval = setInterval(() => {
      if (state.selectedGroupId != null) {
        fetchPrivateGroup();
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const setUsersStatus = async (idUser, idGroup, status) => {
    await setUsersGroupStatus(idGroup, idUser, status);
  };

  const removeUserFromGroup = async (idGroup, idUser) => {
    await deleteUserFromGroup(idGroup, idUser);
  };

  return (
    <PrivateGroupsContext.Provider
      value={{
        ...state,
        setSelectedGroup,
        fetchPrivateGroup,
        removeUserFromGroup,
        setUsersStatus,
      }}
    >
      {children}
    </PrivateGroupsContext.Provider>
  );
};

export const useGroupsContext = () => {
  return useContext(PrivateGroupsContext);
};

function sortByDate(a, b) {
  return Number(new Date(b.creationDate)) - Number(new Date(a.creationDate));
}

export { PrivateGroupsContext, PrivateGroupsProvider };
