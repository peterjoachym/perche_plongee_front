/* eslint-disable no-console */
/* eslint-disable indent */
import {
  UPDATE_MEMBERS,
  UPDATE_CREATE_TOGGLE,
  UPDATE_UPDATE_TOGGLE,
  UPDATE_DELETE_TOGGLE,
  UPDATE_MEMBER_ID,
  UPDATE_WEB_ADMIN,
  UPDATE_LAST_NAME,
  UPDATE_FIRST_NAME,
  UPDATE_EMAIL,
  UPDATE_PHONE_NUMBER,
  UPDATE_CLUB_ROLE,
  UPDATE_DESCRIPTION,
  UPDATE_CREATED_USER,
  UPDATE_AVATAR_FILE,
  UPDATE_CREATED_AVATAR,
  RESET_INPUT,
  RESET_FILE_INPUT,
  REFRESH_AFTER_UPDATE,
} from '../actions/adminInterfaceActions.json';

const adminInterfaceReducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case UPDATE_MEMBERS:
      return { ...state, members: action.payload };
    case UPDATE_CREATE_TOGGLE:
      return { ...state, createToggleActive: !state.createToggleActive };
    case UPDATE_UPDATE_TOGGLE:
      return { ...state, updateToggleActive: !state.updateToggleActive };
    case UPDATE_DELETE_TOGGLE:
      return { ...state, deleteToggleActive: !state.deleteToggleActive };
    case UPDATE_MEMBER_ID:
      return { ...state, memberId: action.payload };
    case UPDATE_WEB_ADMIN:
      return { ...state, websiteAdmin: action.payload };
    case UPDATE_LAST_NAME:
      return { ...state, lastName: action.payload };
    case UPDATE_FIRST_NAME:
      return { ...state, firstName: action.payload };
    case UPDATE_EMAIL:
      return { ...state, email: action.payload };
    case UPDATE_PHONE_NUMBER:
      return { ...state, phoneNumber: action.payload };
    case UPDATE_CLUB_ROLE:
      return { ...state, clubRole: action.payload };
    case UPDATE_DESCRIPTION:
      return { ...state, description: action.payload };
    case UPDATE_CREATED_USER:
      return { ...state, createdUser: action.payload };
    case UPDATE_AVATAR_FILE:
      return { ...state, avatarFile: action.payload };
    case UPDATE_CREATED_AVATAR:
      return { ...state, createdAvatar: action.payload };
    case RESET_FILE_INPUT:
      return { ...state, file: '' };
    case REFRESH_AFTER_UPDATE:
      return { ...state, refreshUpdate: !state.refreshUpdate };
    case RESET_INPUT:
      return {
        ...state,
        memberId: '',
        websiteAdmin: '0',
        lastName: '',
        firstName: '',
        email: '',
        phoneNumber: '',
        clubRole: 'member',
        description: '',
        createdUser: '',
        avatarFile: '',
        createdAvatar: '',
      };
    default:
      return state;
  }
};

export default adminInterfaceReducer;
