/* eslint-disable indent */
import {
  UPDATE_DOCUMENT_ID,
  UPDATE_DOCUMENT_NAME,
  UPDATE_DOCUMENT_TYPE,
  UPDATE_DOCUMENT_DATE,
  RESET_INPUT,
  UPDATE_DOCUMENT_FILE,
  RESET_DOCUMENT_FILE_INPUT,
  UPDATE_CREATED_DOCUMENT,
  UPDATE_CREATE_TOGGLE,
  UPDATE_DELETE_TOGGLE,
  REFRESH_AFTER_UPDATE,
} from '../actions/adminInterfaceActions.json';

const adminInterfaceDocumentsReducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case UPDATE_CREATE_TOGGLE:
      return { ...state, createToggleActive: !state.createToggleActive };
    case UPDATE_DELETE_TOGGLE:
      return { ...state, deleteToggleActive: !state.deleteToggleActive };
    case UPDATE_DOCUMENT_ID:
      return {
        ...state,
        documentId: action.payload,
      };
    case UPDATE_DOCUMENT_NAME:
      return {
        ...state,
        documentName: action.payload,
      };
    case UPDATE_DOCUMENT_TYPE:
      return {
        ...state,
        documentType: action.payload,
      };
    case UPDATE_DOCUMENT_DATE:
      return {
        ...state,
        documentDate: action.payload,
      };
    case UPDATE_DOCUMENT_FILE:
      return {
        ...state,
        documentFile: action.payload,
      };
    case RESET_DOCUMENT_FILE_INPUT:
      return {
        ...state,
        documentFile: null,
      };
    case UPDATE_CREATED_DOCUMENT:
      return {
        ...state,
        createdDocument: action.payload,
      };
    case REFRESH_AFTER_UPDATE:
      return { ...state, refreshUpdate: !state.refreshUpdate };
    case RESET_INPUT:
      return {
        ...state,
        documentId: '',
        documentName: '',
        documentType: '',
        documentDate: '',
      };
    default:
      return state;
  }
};

export default adminInterfaceDocumentsReducer;
