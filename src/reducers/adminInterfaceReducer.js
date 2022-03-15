/* eslint-disable indent */
import {
  UPDATE_INTERFACE_MEMBERS,
  UPDATE_INTERFACE_EVENTS,
  UPDATE_INTERFACE_TRAININGS,
  UPDATE_INTERFACE_ARTICLE,
  UPDATE_INTERFACE_DOCUMENTS,
} from '../actions/adminInterfaceActions.json';

const adminInterfaceReducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case UPDATE_INTERFACE_MEMBERS:
      return {
        ...state,
        interfaceMembersActive: !state.interfaceMembersActive,
      };
    case UPDATE_INTERFACE_EVENTS:
      return {
        ...state,
        interfaceEventsActive: !state.interfaceEventsActive,
      };
    case UPDATE_INTERFACE_TRAININGS:
      return {
        ...state,
        interfaceTrainingsActive: !state.interfaceTrainingsActive,
      };
    case UPDATE_INTERFACE_ARTICLE:
      return {
        ...state,
        interfaceArticleActive: !state.interfaceArticleActive,
      };
    case UPDATE_INTERFACE_DOCUMENTS:
      return {
        ...state,
        interfaceDocumentsActive: !state.interfaceDocumentsActive,
      };
    default:
      return state;
  }
};

export default adminInterfaceReducer;
