/* eslint-disable jsx-a11y/tabindex-no-positive */
import axios from 'axios';
import React, {
  useEffect,
  useReducer,
  useContext,
  useRef,
  useState,
} from 'react';
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import adminInterfaceEventsReducer from '../../reducers/adminInterfaceEventsReducer';
import ClubEvent from '../ClubEvent/ClubEvent';
import Price from '../Price/Price';
import Picture from '../Picture/Picture';
import Error from '../Error/Error';
import ErrorContext from '../../contexts/ErrorContext';

const initialState = {
  events: [],
  eventId: '',
  title: '',
  eventLocality: '',
  eventType: '',
  eventDate: '',
  eventDescription: '',
  isPoster: '0',
  isPublic: '0',
  eventCreated: '',
  pictures: [],
  pictureEvent: '',
  author: '',
  description: '',
  createdPictureEvent: '',
  prices: [],
  eventPrice: '',
  createdEventPrice: '',
  eventPriceCategory: '',
  priceIsPublic: '0',
  priceCreated: '',
  createToggleActive: true,
  updateToggleActive: false,
  deleteToggleActive: false,
  refreshUpdate: false,
};

const AdminInterfaceEvents = () => {
  const { errorOn, setErrorOn, setErrorMessage } = useContext(ErrorContext);
  const [state, dispatch] = useReducer(
    adminInterfaceEventsReducer,
    initialState
  );
  const [evenementId, setEvenementId] = useState();
  const { events } = state;
  const { prices } = state;
  const { pictures } = state;

  const editor = useRef(null); // necessary for Jodit
  const [descriptionEvent, setDescriptionEvent] = useState(); // necessary for Jodit
  const [articleContent, setArticleContent] = useState();

  const config = {
    buttons: [
      'bold',
      'italic',
      'underline',
      'font',
      'fontsize',
      'left',
      'center',
      'right',
      'justify',
      'paragraph',
      'link',
      'paste',
    ],
    readonly: false,
    toolbarSticky: false,
    toolbarAdaptive: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    language: 'fr',
    defaultActionOnPaste: 'insert_only_text',
  };

  const handleCreateToggle = () => {
    if (!state.createToggleActive) {
      dispatch({ type: 'UPDATE_CREATE_TOGGLE' });
      if (state.updateToggleActive) {
        dispatch({ type: 'UPDATE_UPDATE_TOGGLE' });
      }
      if (state.deleteToggleActive) {
        dispatch({ type: 'UPDATE_DELETE_TOGGLE' });
      }
    }
  };

  const handleUpdateToggle = () => {
    if (!state.updateToggleActive) {
      dispatch({ type: 'UPDATE_UPDATE_TOGGLE' });
      if (state.createToggleActive) {
        dispatch({ type: 'UPDATE_CREATE_TOGGLE' });
      }
      if (state.deleteToggleActive) {
        dispatch({ type: 'UPDATE_DELETE_TOGGLE' });
      }
    }
  };

  const handleDeleteToggle = () => {
    if (!state.deleteToggleActive) {
      dispatch({ type: 'UPDATE_DELETE_TOGGLE' });
      if (state.createToggleActive) {
        dispatch({ type: 'UPDATE_CREATE_TOGGLE' });
      }
      if (state.updateToggleActive) {
        dispatch({ type: 'UPDATE_UPDATE_TOGGLE' });
      }
    }
  };

  // refresh display after update function

  const refreshDisplayAfterUpdate = () => {
    dispatch({ type: 'refreshAfterUpdate' });
  };

  const getEvents = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/events`
      );
      setArticleContent(response.data.content);
      dispatch({ type: 'UPDATE_EVENTS', payload: response.data });
    } catch (err) {
      setErrorMessage(err);
      setErrorOn(true);
    }
  };
  useEffect(() => {
    getEvents();
  }, [state.refreshUpdate]);

  const getPrices = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/prices/`
      );
      dispatch({ type: 'UPDATE_PRICES', payload: response.data });
    } catch (err) {
      setErrorMessage(err.response.data);
      setErrorOn(true);
    }
  };
  useEffect(() => {
    getPrices();
  }, [state.refreshUpdate]);

  const getPictures = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/pictures/`
      );
      dispatch({ type: 'UPDATE_PICTURES', payload: response.data });
    } catch (err) {
      setErrorMessage(err.response.data);
      setErrorOn(true);
    }
  };
  useEffect(() => {
    getPictures();
  }, [state.refreshUpdate]);

  const createEvent = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/events`,
        {
          title: `${state.title}`,
          event_date: `${state.eventDate}`,
          event_description: `${descriptionEvent}`,
          event_locality: `${state.eventLocality}`,
          event_type: `${state.eventType}`,
        }
      );
      dispatch({ type: 'UPDATE_CREATED_EVENT', payload: response.data });
      return response.data.id;
    } catch (err) {
      setErrorMessage(err.response.data);
      setErrorOn(true);
      return null;
    }
  };
  const updateEvent = async () => {
    const { eventId } = state;
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/events/${eventId}`,
        {
          title: `${state.title}`,
          event_date: `${state.eventDate}`,
          event_description: `${descriptionEvent}`,
          event_locality: `${state.eventLocality}`,
          event_type: `${state.eventType}`,
        }
      );
      dispatch({ type: 'UPDATE_EVENTS', payload: response.data });
      return response.data.id;
    } catch (err) {
      setErrorMessage(err.response.data);
      setErrorOn(true);
      return null;
    }
  };

  const createPicture = async (id) => {
    if (state.pictureEvent) {
      const { description } = state;
      const { author } = state;
      const { isPublic } = state;
      const { isPoster } = state;
      const data = new FormData();
      data.append('eventPictureFile', state.pictureEvent);
      data.append(
        'eventPictureData',
        JSON.stringify({
          description,
          isPublic,
          author,
          isPoster,
          eventId: id,
        })
      );

      try {
        const resp = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/pictures/events`,
          data,
          { withCredentials: true }
        );
        dispatch({ type: 'UPDATE_CREATED_PICTURE_EVENT', payload: resp.data });
      } catch (err) {
        setErrorMessage(err.response.data);
      }
    }
  };

  const createNewPicture = async () => {
    if (state.pictureEvent) {
      const { description } = state;
      const { author } = state;
      const { isPublic } = state;
      const { isPoster } = state;
      const data = new FormData();
      data.append('eventPictureFile', state.pictureEvent);
      data.append(
        'eventPictureData',
        JSON.stringify({
          description,
          isPublic,
          author,
          isPoster,
          eventId: evenementId,
        })
      );

      try {
        const resp = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/pictures/events`,
          data,
          { withCredentials: true }
        );
        dispatch({ type: 'UPDATE_CREATED_PICTURE_EVENT', payload: resp.data });
      } catch (err) {
        setErrorMessage(err.response.data);
      }
    }
  };

  const deleteEvent = async () => {
    const { eventId } = state;
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/events/${parseInt(eventId, 10)}`
      );
    } catch (err) {
      setErrorMessage(err.response.data);
      setErrorOn(true);
    }
  };

  const createPrice = async (id) => {
    const { eventPriceCategory, eventPrice, priceIsPublic } = state;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/prices`,
        {
          title_price: eventPriceCategory,
          price: eventPrice,
          is_public: priceIsPublic,
          club_event_id: id,
        }
      );
      dispatch({ type: 'UPDATE_CREATED_PRICE', payload: response.data });
      return response.data.id;
    } catch (err) {
      setErrorMessage(err.response.data);
      setErrorOn(true);
      return null;
    }
  };

  const createNewPrice = async () => {
    const { eventPriceCategory, eventPrice, priceIsPublic } = state;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/prices`,
        {
          title_price: eventPriceCategory,
          price: eventPrice,
          is_public: priceIsPublic,
          club_event_id: evenementId,
        }
      );
      dispatch({ type: 'UPDATE_CREATED_PRICE', payload: response.data });
      return response.data.id;
    } catch (err) {
      setErrorMessage(err.response.data);
      setErrorOn(true);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.createToggleActive) {
      const id = await createEvent();
      await createPicture(id);
      await createPrice(id);
      setDescriptionEvent('');
    }
    if (state.deleteToggleActive) {
      await deleteEvent();
    }
    if (state.updateToggleActive) {
      const id = await updateEvent();
      await createPicture(id);
      await createPrice(id);
    }
    refreshDisplayAfterUpdate();
    dispatch({ type: 'RESET_INPUT' });
  };

  useEffect(() => {
    getEvents();
  }, [state.refreshUpdate]);

  // update file state function with controlling the format of file to upload
  const handleChangeFile = (e) => {
    const selectedFile = e.target.files[0];
    const { type } = selectedFile;
    if (type !== 'image/png' && type !== 'image/jpg' && type !== 'image/jpeg') {
      setErrorMessage('Veuillez sélectionner une image .png, .jpg ou .jpeg');
      setErrorOn(true);
      dispatch({ type: 'RESET_FILE_INPUT' });
    } else {
      dispatch({
        type: 'UPDATE_PICTURE_EVENT',
        payload: e.target.files[0],
      });
    }
  };

  const getPictureDescription = () => {
    const description = `${state.description.toLowerCase()}`;
    dispatch({
      type: 'UPDATE_DESCRIPTION_PICTURE_EVENT',
      payload: description,
    });
  };
  useEffect(() => {
    getPictureDescription();
  }, [state.refreshUpdate]);

  const handleCreatePicture = () => {
    createNewPicture();
  };

  const handleCreatePrice = () => {
    createNewPrice();
  };

  return (
    <div className="admin-form-container">
      <button
        id="create-event"
        className={
          state.createToggleActive
            ? 'toggle-admin-form-button-on'
            : 'toggle-admin-form-button-off'
        }
        type="button"
        onClick={handleCreateToggle}
      >
        Créer un événement
      </button>
      <button
        id="update-event"
        className={
          state.updateToggleActive
            ? 'toggle-admin-form-button-on'
            : 'toggle-admin-form-button-off'
        }
        type="button"
        onClick={handleUpdateToggle}
      >
        Mettre à jour un événement
      </button>
      <button
        id="delete-event"
        className={
          state.deleteToggleActive
            ? 'toggle-admin-form-button-on'
            : 'toggle-admin-form-button-off'
        }
        type="button"
        onClick={handleDeleteToggle}
      >
        Supprimer un événement
      </button>
      <h3 className="display-title">EVENEMENTS:</h3>
      <div className="display-members-container">
        <table className="display-members-container">
          <thead>
            <tr>
              <th className="id">ID</th>
              <th className="title">Titre</th>
              <th className="event_date">Date</th>
              <th className="event_description">Description</th>
              <th className="event_locality">Lieu </th>
              <th className="event_type">Type</th>
            </tr>
          </thead>
          <tbody>
            {events
              .filter(
                (noTraining) =>
                  noTraining.event_type !== 'formation' &&
                  noTraining.event_type !== 'bapteme' &&
                  noTraining.event_type !== 'inscription'
              )
              .map((event, index) => (
                <ClubEvent
                  key={index}
                  {...event}
                  eventId={event.id}
                  state={state}
                  evenementId={evenementId}
                  setEvenementId={setEvenementId}
                />
              ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleSubmit}>
        {!state.createToggleActive && !state.updateToggleActive && (
          <label htmlFor="eventId">
            Id événement:
            <input
              type="text"
              id="eventId"
              value={state.eventId}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_EVENT_ID',
                  payload: e.target.value,
                })
              }
            />
          </label>
        )}

        {!state.deleteToggleActive && (
          <>
            <label htmlFor="title">
              Nom de l&apos;événement
              <input
                id="title"
                value={state.title}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_EVENT_TITLE',
                    payload: e.target.value,
                  })
                }
              />
            </label>

            <label htmlFor="eventLocality">
              Lieu de l&apos;événement
              <input
                type="text"
                id="eventLocality"
                value={state.eventLocality}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_EVENT_LOCALITY',
                    payload: e.target.value,
                  })
                }
              />
            </label>

            <label htmlFor="eventType">
              Type de l&apos;événement
              <select
                id="eventType"
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_EVENT_TYPE',
                    payload: e.target.value,
                  })
                }
                value={state.eventType}
              >
                <option value="voyage">Voyage</option>
                <option value="sortie">Sortie</option>
                <option value="festivite">Festivité</option>
                <option value="exposition">Exposition</option>
                <option value="fosse">Fosse</option>
                <option value="technique">Technique</option>
                <option value="autre">Autre</option>
              </select>
            </label>

            <label htmlFor="eventDate">
              Date de l&apos;événement:
              <input
                type="date"
                id="eventDate"
                value={state.eventDate}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_EVENT_DATE',
                    payload: e.target.value,
                  })
                }
              />
            </label>
            <h2 className="admin-article-title">DETAILS:</h2>
            <div className="article-content">
              {articleContent && parse(articleContent)}
            </div>
            <div className="rich-editor-container">
              <JoditEditor
                ref={editor}
                value={descriptionEvent}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setDescriptionEvent(newContent)} // preferred to use only this option to update the content for performance reasons
              />
            </div>

            <h3 className="display-title">IMAGES:</h3>
            <div className="display-members-container">
              <table className="display-members-container">
                <thead>
                  <th className="id">Id</th>
                  <th className="picture_description">Description</th>
                  <th className="author">Photographe</th>
                  <th className="is_public">Publique</th>
                  <th className="is_poster">Affiche</th>
                  <th className="img">Image</th>
                </thead>
                <tbody>
                  {pictures
                    .filter(
                      (pictureMatch) =>
                        pictureMatch.club_event_id === evenementId
                    )
                    .map((picture, index) => (
                      <Picture
                        key={index}
                        {...picture}
                        evenementId={evenementId}
                        state={state}
                      />
                    ))}
                </tbody>
              </table>
            </div>

            <label htmlFor="pictureEvent">
              Image de l&apos;evenement:
              <input
                type="file"
                id="pictureEvent"
                name="pictureEvent"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleChangeFile}
              />
            </label>

            <label htmlFor="authorPicture">
              Photographe:
              <input
                type="text"
                id="authorPicture"
                value={state.author}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_AUTHOR',
                    payload: e.target.value,
                  })
                }
              />
            </label>
            <label htmlFor="description">
              Description
              <input
                type="text"
                id="description"
                value={state.description}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_DESCRIPTION_PICTURE_EVENT',
                    payload: e.target.value,
                  })
                }
              />
            </label>

            <label htmlFor="isPoster">
              Cette image sera-t-elle une affiche pour l&apos;evenement ?
              <select
                id="isPoster"
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_IS_POSTER',
                    payload: e.target.value,
                  })
                }
                value={state.isPoster}
              >
                <option value="0">Non</option>
                <option value="1">Oui</option>
              </select>
            </label>

            <label htmlFor="isPublic">
              Cette image sera-t-elle affichée aux visiteurs ?
              <select
                id="isPublic"
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_IS_PUBLIC',
                    payload: e.target.value,
                  })
                }
                value={state.isPublic}
              >
                <option value="0">Non</option>
                <option value="1">Oui</option>
              </select>
            </label>
            {state.updateToggleActive && (
              <button
                type="button"
                onClick={handleCreatePicture}
                className="toggle-admin-form-button-on"
              >
                Creer une image
              </button>
            )}

            <h3 className="display-title">TARIFS:</h3>
            <div className="display-members-container">
              <table className="display-members-container">
                <thead>
                  <tr>
                    <th className="id">Id</th>
                    <th className="title_price">Titre</th>
                    <th className="price">Prix</th>
                    <th className="is_public">Le prix est public</th>
                  </tr>
                </thead>
                <tbody>
                  {prices
                    .filter(
                      (priceMatch) => priceMatch.club_event_id === evenementId
                    )
                    .map((price, index) => (
                      <Price
                        key={index}
                        {...price}
                        evenementId={evenementId}
                        state={state}
                        // setPriceId={setPriceId}
                      />
                    ))}
                </tbody>
              </table>
            </div>

            <label htmlFor="eventPriceCategory">
              Categorie de prix
              <select
                id="eventPriceCategory"
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_EVENT_PRICE_CATEGORY',
                    payload: e.target.value,
                  })
                }
                value={state.eventPriceCategory}
              >
                <option value="Debutant">Debutant</option>
                <option value="Intermediaire">Intermediaire</option>
                <option value="Avance">Avance</option>
                <option value="Accompagnant">Accompagnant</option>
                <option value="Membre">Membre</option>
                <option value="Sortie">Autre</option>
              </select>
            </label>

            <label htmlFor="eventPrice">
              Prix de l&apos;événement:
              <input
                type="number"
                id="eventPrice"
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_EVENT_PRICE',
                    payload: e.target.value,
                  })
                }
                value={state.eventPrice}
              />
            </label>

            <label htmlFor="priceIsPublic">
              Ce prix sera-t-il public?
              <select
                id="priceIsPublic"
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_PRICE_IS_PUBLIC',
                    payload: e.target.value,
                  })
                }
                value={state.priceIsPublic}
              >
                <option value="0">Non</option>
                <option value="1">Oui</option>
              </select>
            </label>
            {state.updateToggleActive && (
              <button
                type="button"
                onClick={handleCreatePrice}
                className="toggle-admin-form-button-on"
              >
                Ajouter un prix
              </button>
            )}
          </>
        )}

        <button type="submit" className="toggle-admin-form-button-on">
          Valider
        </button>
      </form>
      {errorOn && <Error />}
    </div>
  );
};

export default AdminInterfaceEvents;
