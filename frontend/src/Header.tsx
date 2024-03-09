import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";

import logo from './image/new-dawn-logo.png';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button style={{marginLeft: '20px'}} onClick={() => loginWithRedirect()}>
            Log In
        </Button>
    )
};

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <Button style={{marginLeft: '20px'}} onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
        </Button>
    );
};

const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img src={logo} style={{maxWidth: '700px'}} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end" style={{ zIndex:'2000', width: "100%", position: 'absolute', top: '18px', right: '20px' }}>
                        <Button href='/user'>Login</Button>
                        <LogoutButton />
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <div style={{marginBottom: '100px'}}>&nbsp;</div>
        </Navbar>
    )
}

export default Header
