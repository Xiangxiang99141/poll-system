import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    // useEffect(() => {
    //     setIsLoggedIn(!!token);
    // }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('isVoted'); 
        setIsLoggedIn(false);
        navigate('/');
    };

    return(
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">選舉系統</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">首頁</Nav.Link>
                        <Nav.Link href="/vote" >我要投票</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {token ? (
                            <>
                                <Nav.Link href="/manage">後台</Nav.Link>
                                <Nav.Link onClick={handleLogout}>登出</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link href="/login">登入</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}