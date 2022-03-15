/* eslint-disable camelcase */
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Error from '../Error/Error';
import ErrorContext from '../../contexts/ErrorContext';

const Price = (props) => {
  const { id, title_price, price, is_public, evenementId } = props;

  const [priceData, setPriceData] = useState('');
  const { errorOn, setErrorOn, setErrorMessage } = useContext(ErrorContext);

  const getPriceData = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/events/${evenementId}/prices`,
        { withCredentials: true }
      );
      setPriceData(resp.data);
    } catch (err) {
      setErrorMessage(err.response.data);
      setErrorOn(true);
    }
  };
  useEffect(() => {
    getPriceData();
  }, []);

  const deletePrice = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/prices/${id}`);
    } catch (err) {
      setErrorMessage(err.response.data);
      setErrorOn(true);
    }
  };
  useEffect(() => {
    deletePrice();
  }, []);

  return (
    <>
      {priceData && (
        <tr className="member-line">
          <td>{id}</td>
          <td>{title_price}</td>
          <td>{price}</td>
          <td>{is_public ? 'OUI' : 'NON'}</td>
          <button onClick={deletePrice} type="button">
            Effacer
          </button>
        </tr>
      )}
      {errorOn && <Error />}
    </>
  );
};

export default Price;
