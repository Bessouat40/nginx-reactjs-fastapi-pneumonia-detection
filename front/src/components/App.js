import React, { useState, useEffect } from 'react';
import NavBar from './navbar';
import Keycloak from 'keycloak-js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PredictionPage from './predictionPage';
import TitleComponent from './about';
import Data from './data';
import Home from './home';

const PrivateComponent = ({ children, authenticated }) => {
  if (!authenticated) {
    return null;
  }

  return children;
};

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [keycloakInstance, setKeycloakInstance] = useState();

  useEffect(() => {
    const keycloakConfig = {
      url: 'http://localhost:8080/',
      realm: 'PneumonIA',
      clientId: 'pneumonia-client',
    };

    const _keycloakInstance = new Keycloak(keycloakConfig);

    _keycloakInstance.init({ onLoad: 'login-required' }).then((auth) => {
      console.log('auth : ' + auth);
      setAuthenticated(auth);
    });

    setKeycloakInstance(_keycloakInstance);
  }, []);
  return (
    <Router>
      <NavBar
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
        keycloakInstance={keycloakInstance}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateComponent authenticated={authenticated}>
              <Home />
            </PrivateComponent>
          }
        />
        <Route
          path="/prediction"
          element={
            <PrivateComponent authenticated={authenticated}>
              <PredictionPage />
            </PrivateComponent>
          }
        />
        <Route
          path="/data"
          element={
            <PrivateComponent authenticated={authenticated}>
              <Data />
            </PrivateComponent>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateComponent authenticated={authenticated}>
              <TitleComponent />
            </PrivateComponent>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
