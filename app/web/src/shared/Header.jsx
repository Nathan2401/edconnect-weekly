import React from 'react';
import {Container,Navbar,Form,FormControl,Button,Nav} from 'react-bootstrap';
//import {Link} from 'react-router-dom';
const Header = () =>{
    return (
        <Container>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="/">Project Explorer</Navbar.Brand>
                    <Form inline>
                        <FormControl type="text" placeholder="Search Project" className="mr-2"/>
                        <Button type="submit" variant='outline-light'>Search</Button>
                        </Form>
                            <Nav>
                                <Nav.Link href="/">Projects</Nav.Link>
                                <Nav.Link href="/createProject">Submit</Nav.Link>
                            </Nav>
                            <Nav className="ml-auto">
                                <Nav.Link href="/Signup">Sign up</Nav.Link>
                                <Nav.Link href="/Login">Login</Nav.Link>
                            </Nav>
                               


                   

            </Navbar>

        </Container>

    )
}
export default Header;