import React from 'react';
import {Container,Navbar} from 'react-bootstrap';

const Footer = () =>{
    return(
        <Container>
            <Navbar bg="light" variant="light" expand>
                <div className="justify-content-end navbar-collapse collapse"><span className="navbar-text">Project Explorer ©
                        2020 · <a href="https://edconnect.ng/" target="_blank">Edconnect</a></span></div>
            </Navbar>
        </Container>
    )
}
export default Footer;