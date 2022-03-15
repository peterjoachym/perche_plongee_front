/* eslint-disable indent */
import {
  UPDATE_CREATE_TOGGLE,
  UPDATE_UPDATE_TOGGLE,
  UPDATE_DELETE_TOGGLE,
  UPDATE_EVENTS,
  UPDATE_CREATED_EVENT,
  UPDATE_EVENT_ID,
  UPDATE_EVENT_TITLE,
  UPDATE_EVENT_LOCALITY,
  UPDATE_EVENT_TYPE,
  UPDATE_EVENT_DATE,
  UPDATE_EVENT_DESCRIPTION,
  UPDATE_PICTURES,
  UPDATE_AUTHOR,
  UPDATE_PICTURE_EVENT,
  UPDATE_CREATED_PICTURE_EVENT,
  UPDATE_DESCRIPTION_PICTURE_EVENT,
  UPDATE_IS_PUBLIC,
  RESET_INPUT,
  RESET_FILE_INPUT,
  UPDATE_IS_POSTER,
  UPDATE_PRICES,
  UPDATE_EVENT_PRICE_CATEGORY,
  UPDATE_PRICE_CREATED,
  UPDATE_PRICE_IS_PUBLIC,
  UPDATE_EVENT_PRICE,
  REFRESH_AFTER_UPDATE,
} from '../actions/adminInterfaceActions.json';

const adminInterfaceEventsReducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case UPDATE_CREATE_TOGGLE:
      return { ...state, createToggleActive: !state.createToggleActive };
    case UPDATE_UPDATE_TOGGLE:
      return { ...state, updateToggleActive: !state.updateToggleActive };
    case UPDATE_DELETE_TOGGLE:
      return { ...state, deleteToggleActive: !state.deleteToggleActive };
    case UPDATE_EVENTS:
      return { ...state, events: action.payload };
    case UPDATE_CREATED_EVENT:
      return { ...state, createdEvent: action.payload };
    case UPDATE_EVENT_ID:
      return { ...state, eventId: action.payload };
    case UPDATE_EVENT_TITLE:
      return { ...state, title: action.payload };
    case UPDATE_EVENT_LOCALITY:
      return { ...state, eventLocality: action.payload };
    case UPDATE_EVENT_TYPE:
      return { ...state, eventType: action.payload };
    case UPDATE_EVENT_DATE:
      return { ...state, eventDate: action.payload };
    case UPDATE_EVENT_DESCRIPTION:
      return { ...state, eventDescription: action.payload };
    case UPDATE_PRICES:
      return { ...state, prices: action.payload };
    case UPDATE_EVENT_PRICE_CATEGORY:
      return { ...state, eventPriceCategory: action.payload };
    case UPDATE_PRICE_CREATED:
      return { ...state, priceCreated: action.payload };
    case UPDATE_PRICE_IS_PUBLIC:
      return { ...state, priceIsPublic: action.payload };
    case UPDATE_EVENT_PRICE:
      return { ...state, eventPrice: action.payload };
    case UPDATE_PICTURES:
      return { ...state, pictures: action.payload };
    case UPDATE_PICTURE_EVENT:
      return { ...state, pictureEvent: action.payload };
    case UPDATE_AUTHOR:
      return { ...state, author: action.payload };
    case UPDATE_CREATED_PICTURE_EVENT:
      return { ...state, createdPictureEvent: action.payload };
    case UPDATE_IS_PUBLIC:
      return { ...state, isPublic: action.payload };
    case UPDATE_DESCRIPTION_PICTURE_EVENT:
      return { ...state, description: action.payload };
    case REFRESH_AFTER_UPDATE:
      return { ...state, refreshUpdate: !state.refreshUpdate };
    case RESET_FILE_INPUT:
      return { ...state, file: '' };

    case RESET_INPUT:
      return {
        ...state,
        eventId: '',
        title: '',
        eventLocality: '',
        eventType: '',
        eventDate: '',
        eventDescription: '',
        createdEvent: '',
        pictureEvent: '',
        author: '',
        isPublic: '0',
        createdPictureEvent: '',
        description: '',
        isPoster: '0',
        eventPriceCategory: '',
        priceIsPublic: '0',
        eventPrice: '',
        priceCreated: '',
      };
    case UPDATE_IS_POSTER:
      return { ...state, isPoster: action.payload };
    default:
      return state;
  }
};

export default adminInterfaceEventsReducer;
