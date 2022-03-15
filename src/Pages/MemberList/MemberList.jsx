import React, { useState, useContext, useEffect } from 'react';
import './MemberList.css';
import axios from 'axios';
import ErrorContext from '../../contexts/ErrorContext';
import Error from '../../components/Error/Error';
import MemberCard from '../../components/MemberCard/MemberCard';

function MemberList() {
  const { errorOn, setErrorOn, setErrorMessage } = useContext(ErrorContext);
  const [members, setMembers] = useState([]);

  const getMembres = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users`,
        { withCredentials: true }
      );
      setMembers(resp.data);
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

  useEffect(() => {
    getMembres();
  }, []);

  return (
    <div>
      <div className="member-list-page">
        <div className="page-title-container">
          <h1 className="page-title">Annuaire des membres</h1>
        </div>

        <div className="members-list">
          {members.map((member) => (
            <MemberCard key={member.id} {...member} />
          ))}
        </div>
        {errorOn && <Error />}
      </div>
    </div>
  );
}

export default MemberList;
