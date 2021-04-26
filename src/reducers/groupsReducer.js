import { ACCEPTED } from "../components/PrivateGroups/PrivateGroup/InvitationSatatus";
import {
  GET_GROUPS_BEGIN,
  GET_GROUPS_ERROR,
  GET_GROUPS_SUCCESS,
  GET_GROUP_BEGIN,
  GET_GROUP_SUCCESS,
  SET_SELECTED_GROUP,
} from "./groupsActions";

const groupsReducer = (state, action) => {
  if (action.type === GET_GROUPS_BEGIN) {
    return { ...state, groupsLoading: true, groupsError: false };
  } else if (action.type === GET_GROUPS_ERROR) {
    return { ...state, groupsError: true, groupsLoading: false };
  } else if (action.type === GET_GROUPS_SUCCESS) {
    const { groups, suggestedGroups } = action.payload;
    return {
      ...state,
      groupsLoading: false,
      groupsError: false,
      groups: groups.filter((group) => group.userStatus === ACCEPTED),
      suggestedGroups,
      firstFetchGroups: false,
    };
  } else if (action.type === GET_GROUP_BEGIN) {
    return { ...state, groupLoading: true, groupError: false };
  } else if (action.type === GET_GROUP_SUCCESS) {
    return { ...state, groupLoading: false, groupError: false, group: action.payload, firstFetchGroup: false };
  } else if (action.type === GET_GROUPS_ERROR) {
    return { ...state, groupLoading: false, groupError: true };
  } else if (action.type === SET_SELECTED_GROUP) {
    if (action.payload == null) {
      return { ...state, privateGroup: null, selectedGroupId: null };
    } else {
      const privateGroup = state.groups.filter((group) => group.idGroup === action.payload)[0];
      console.log(privateGroup);
      return { ...state, selectedGroupId: action.payload, privateGroup };
    }
  }
  throw new Error(`No matching ${action.type} - action type`);
};

export default groupsReducer;
