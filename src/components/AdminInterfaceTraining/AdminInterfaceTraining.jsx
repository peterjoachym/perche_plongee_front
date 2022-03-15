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
import adminInterfaceTrainingsReducer from '../../reducers/adminInterfaceEventsReducer';
import Price from '../Price/Price';
import Picture from '../Picture/Picture';
import ClubTraining from '../ClubEvent/ClubTraining';
import Error from '../Error/Error';
import ErrorContext from '../../contexts/ErrorContext';

const initialState = {
  events: [],
  eventId: '',
  title: '',
  eventLocality: '',
  eventType: 'formation',
  eventDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
  eventDescription: '',
  isPoster: '1',
  isPublic: '1',
  eventCreated: '',
  pictures: [],
  pictureEvent: '',
  description: '',
  createdPictureEvent: '',
  prices: [],
  eventPrice: '',
  createdEventPrice: '',
  eventPriceCategory: '',
  priceIsPublic: '1',
  priceCreated: '',
  createToggleActive: true,
  updateToggleActive: false,
  deleteToggleActive: false,
  refreshUpdate: false,
};

const Training = () => {
  const { errorOn, setErrorOn, setErrorMessage } = useContext(ErrorContext);
  const [state, dispatch] = useReducer(
    adminInterfaceTrainingsReducer,
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
      setErrorMessage(err.response.data);
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
        JSON.stringify({ description, isPublic, isPoster, author, eventId: id })
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
        `${process.env.REACT_APP_API_URL}/api/events/${eventId}`
      );
    } catch (err) {
      setErrorMessage(err.response.data);
      setErrorOn(true);
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

  const createPrice = async (id) => {
    if (state.eventPrice) {
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
      } catch (err) {
        setErrorMessage(err.response.data);
        setErrorOn(true);
      }
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
      await createEvent(id);
      await createPrice(id);
    }
    refreshDisplayAfterUpdate();
    dispatch({ type: 'RESET_INPUT' });
  };

  useEffect(() => {
    getEvents();
  }, [state.refreshUpdate]);

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
  }, [state.description]);

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
        Créer une formation
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
        Mettre à jour une formation
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
        Supprimer une formation
      </button>

      <h3 className="display-title">FORMATIONS:</h3>
      <div className="display-members-container">
        <table className="display-members-container">
          <thead>
            <tr>
              <th className="id">Id</th>
              <th className="title">Titre</th>
              <th className="event_description">Description </th>
              <th className="event_locality">Lieu</th>
              <th className="event_type">Type</th>
            </tr>
          </thead>
          <tbody>
            {events
              .filter(
                (onlyTraining) =>
                  onlyTraining.event_type === 'formation' ||
                  onlyTraining.event_type === 'inscription' ||
                  onlyTraining.event_type === 'bapteme'
              )
              .map((event) => (
                <ClubTraining
                  key={event.id}
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
        {state.deleteToggleActive && (
          <label htmlFor="eventId">
            Id formation:
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
              Nom de la formation
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
              Lieu de la formation
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
              Type de la formation
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
                <option value="formation">Formation</option>
                <option value="inscription">Inscription</option>
                <option value="bapteme">Bapteme</option>
              </select>
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
                tabIndex={1}
                onBlur={(newContent) => setDescriptionEvent(newContent)}
              />
            </div>

            <h3 className="display-title">IMAGE:</h3>
            <div className="display-members-container">
              <table className="display-members-container">
                <thead>
                  <th className="id">Id</th>
                  <th className="picture_description">Description</th>
                  <th className="author">Photographe</th>
                  <th className="is_public">Publique</th>
                  <th className="is_poster">Affiche</th>
                  <th className="img__array">image</th>
                </thead>
                <tbody>
                  {pictures
                    .filter(
                      (pictureMatch) =>
                        pictureMatch.club_event_id === evenementId
                    )
                    .map((picture) => (
                      <Picture
                        key={picture.id}
                        {...picture}
                        evenementId={evenementId}
                        state={state}
                      />
                    ))}
                </tbody>
              </table>
            </div>

            <label htmlFor="pictureEvent">
              Image de la formation:
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
              Cette image sera-t-elle une affiche pour la formation ?
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

            {state.eventType === 'inscription' && (
              <h3 className="display-title">TARIFS:</h3>
            )}

            {state.eventType === 'inscription' && (
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
                      .map((price) => (
                        <Price
                          key={price.id}
                          {...price}
                          evenementId={evenementId}
                          state={state}
                          refreshUpdate={state.refreshUpdate}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            {state.eventType === 'inscription' && (
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
                  <option value="Membre">Membre</option>
                  <option value="Sortie">Autre</option>
                </select>
              </label>
            )}

            {state.eventType === 'inscription' && (
              <label htmlFor="eventPrice">
                Prix de la formation:
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
            )}

            {state.eventType === 'inscription' && (
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
            )}
            {state.eventType === 'inscription' && state.updateToggleActive && (
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

        <button className="submit-button" type="submit">
          Valider
        </button>
      </form>
      {errorOn && <Error />}
    </div>
  );
};

export default Training;
