/* eslint-disable jsx-a11y/tabindex-no-positive */
import React, { useState, useRef, useContext, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import JoditEditor from 'jodit-react';
import Error from '../Error/Error';
import ErrorContext from '../../contexts/ErrorContext';

const AdminInterfaceArticle = () => {
  const editor = useRef(null); // necessary for Jodit
  const [content, setContent] = useState(); // necessary for Jodit
  const [articleContent, setArticleContent] = useState();
  const { errorOn, setErrorOn, setErrorMessage } = useContext(ErrorContext);
  const title = 'Le mot du Président';

  // this is a custom configuration for rich editor(jodit); For changes see https://xdsoft.net/jodit/play.html, although you need to addapt it a little bit for react;

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

  // API request to fetch Article
  const getArticle = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/articles`,
        { withCredentials: true }
      );
      setArticleContent(resp.data.content);
    } catch (err) {
      if (!err.response) {
        setErrorMessage('Le serveur ne fonctionne pas!');
        setErrorOn(true);
      } else {
        setErrorMessage(err.response.data);
        setErrorOn(true);
      }
    }
  };

  useEffect(async () => {
    await getArticle();
  }, [content, articleContent]);

  // API request to update Editorial POST request delete all previous text in DBB

  const createArticle = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/articles`,
        {
          title: `${title}`,
          content: `${content}`,
        },
        { withCredentials: true }
      );
    } catch (err) {
      if (!err.response) {
        setErrorMessage('Le serveur ne fonctionne pas!');
        setErrorOn(true);
      } else {
        setErrorMessage(err.response.data);
        setErrorOn(true);
      }
    }
  };

  const handleTextSubmit = () => {
    createArticle();
    setContent('');
  };

  return (
    <div>
      <h2 className="admin-article-title">MOT DU PRESIDENT:</h2>
      <div className="article-content">
        {articleContent && parse(articleContent)}
      </div>
      <div className="rich-editor-container">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          // onChange={(newContent) => {}} // outcommented on change in this application context it is not needed
        />
      </div>
      <button
        id="submit-editorial-text"
        className="submit-button"
        type="button"
        onClick={handleTextSubmit}
      >
        Mettre à jour le Mot du Président
      </button>
      {errorOn && <Error />}
    </div>
  );
};

export default AdminInterfaceArticle;
