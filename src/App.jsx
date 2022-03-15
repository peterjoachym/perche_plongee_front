import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import UserContext from './contexts/UserContext';

import Home from './Pages/Home/Home';
import AdminPage from './Pages/AdminPage/AdminPage';
import ClubLife from './Pages/ClubLife/ClubLife';
import MemberList from './Pages/MemberList/MemberList';
import ClubEvents from './Pages/ClubEvents/ClubEvents';
import Training from './Pages/Training/Training';
import RegistrationInfos from './Pages/RegistrationInfos/RegistrationInfos';
import Login from './Pages/Login/Login';
import AccountActivate from './Pages/AccountActivate/AccountActivate';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import NewPasswordActivate from './Pages/NewPasswordActivate/NewPasswordActivate';
import Archives from './Pages/ Archives/Archives';
import ActivityReportsFiles from './components/ActivityReporFiles/ActivityReportFiles';
import AssemblyFiles from './components/AssemblyFiles/AssemblyFiles';
import DirectorsComityfiles from './components/DirectorsComityFiles/DirectorsComityFiles';
import PresidentReportFiles from './components/PresidentReportFiles/PresidentReportFiles';
import Deconnect from './components/Logout/Logout';
import Footer from './components/Footer/Footer';

function App() {
  const { user, setUser, refreshTokenRef, setRefreshTokenRef } =
    useContext(UserContext);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${process.env.REACT_APP_API_URL}/api/auth/refresh_token`,
          withCredentials: true,
        });
        const { id, role, firstname, expires_in } = data;
        // console.log('Data: ', data);
        setTimeout(() => {
          // console.log('in setTimeout');
          refreshToken();
        }, expires_in - 10000);

        setUser({ id, role, firstname });
      } catch (err) {
        // console.log(err.message);
        setUser({ role: 'guest' });
      }
    };
    setRefreshTokenRef((prevState) => {
      // console.log(prevState);
      return prevState === null ? refreshToken : null;
    });
    if (!refreshTokenRef) {
      refreshToken();
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          {/* routes with access guest */}

          <Route path="/" element={<Home />} />
          <Route path="/evenements" element={<ClubEvents />} />
          <Route path="/formations" element={<Training />} />
          <Route path="/inscription" element={<RegistrationInfos />} />

          {/* routes with access member */}

          {(user.role === 1 || user.role === 0) && (
            <Route path="/annuaire" element={<MemberList />} />
          )}

          {(user.role === 1 || user.role === 0) && (
            <Route path="/vie-associative" element={<ClubLife />} />
          )}
          {(user.role === 1 || user.role === 0) && (
            <Route path="/archives" element={<Archives />} />
          )}
          {(user.role === 1 || user.role === 0) && (
            <Route
              path="/archives/assembly-drive"
              element={<AssemblyFiles />}
            />
          )}
          {(user.role === 1 || user.role === 0) && (
            <Route
              path="/archives/activity-drive"
              element={<ActivityReportsFiles />}
            />
          )}
          {(user.role === 1 || user.role === 0) && (
            <Route
              path="/archives/director-drive"
              element={<DirectorsComityfiles />}
            />
          )}
          {(user.role === 1 || user.role === 0) && (
            <Route
              path="/archives/president-drive"
              element={<PresidentReportFiles />}
            />
          )}

          {(user.role === 1 || user.role === 0) && (
            <Route path="/deconnect" element={<Deconnect />} />
          )}

          {/* routes with access admin */}

          {user.role === 1 && (
            <Route
              path="/admin"
              element={user.role === 1 ? <AdminPage /> : <Navigate to="/" />}
            />
          )}

          {/* auth routes */}

          <Route
            path="/login"
            element={<Login refreshToken={refreshTokenRef} />}
          />
          <Route
            path="/account-activate/:token"
            element={<AccountActivate />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/new-password-activate/:token"
            element={<NewPasswordActivate />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
