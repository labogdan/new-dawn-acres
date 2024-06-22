import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import UserForm from "./UserForm";
import Confirmation from "./Confirmation";
import WelcomePage from './Welcome';

import { createRoot } from 'react-dom/client';

const domain = process.env.REACT_APP_AUTH0_DOMAIN || ''
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || ''

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
<Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={process.env.REACT_APP_AUTH0_REDIRECT_URI}
    >

            <Router>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="confirmation" element={<Confirmation />} />
                    <Route path="user" element={<UserForm />} />
                </Routes>
            </Router>

    </Auth0Provider>


);
