import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import Error from '../Error/Error';
import ErrorContext from '../../contexts/ErrorContext';

const Editorial = () => {
  const [articleContent, setArticleContent] = useState();
  const { errorOn, setErrorOn, setErrorMessage } = useContext(ErrorContext);

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
  }, []);

  return (
    <div className="editorial-container">
      <h2 className="title-president">Mot du Président</h2>
      <div className="article-content">
        {articleContent && parse(articleContent)}
      </div>
      {errorOn && <Error />}
    </div>
  );
};

export default Editorial;
