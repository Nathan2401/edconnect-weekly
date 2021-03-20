import {React,useState,useEffect} from 'react';

import {Container,Form,Row,Col,FormGroup,FormControl,FormLabel} from 'react-bootstrap';
import Layout from './shared/Layout';

const Signup = ()=> {
    const[program,setProgram] = useState([]);
    const[gradYear,setGradYear] = useState([]);
    useEffect(()=>{
        const getProgram = async () => {
            let programUrl = '/api/programs';
            const response = await fetch(programUrl);
            const data = await response.json();
            console.log(data);
        }
            
        getProgram();

    },[program,gradYear]);
    return(
        <Layout>
           
           <Container className="mycontainer my-3">
            <Row className="justify-content-center my-5 w-75 mx-auto">
                <Col>
                    <h3>Sign up</h3>
                    <Form className="" id="signupForm">
                        <Row className="form-row">
                            <Col>
                                <FormGroup controlId="firstName">
                                    <FormLabel>First name</FormLabel>
                                    <FormControl type="text"
                                        name="firstName" placeholder="First name" required=""/>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup controlId="firstName">
                                    <FormLabel>Last name</FormLabel>
                                    <FormControl type="text"
                                        name="lastName" placeholder="Last name" required=""/>
                                </FormGroup>
                            </Col>
                            
                        </Row>
                        <Row className="form-row">
                            <Col>
                                <FormGroup controlId="email">
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl type="text"
                                        name="email" placeholder="Email Address" required=""/>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup controlId="password">
                                    <FormLabel>Last name</FormLabel>
                                    <FormControl type="password"
                                        name="password" placeholder="password" required=""/>
                                </FormGroup>
                            </Col>
                            
                        </Row>
                        <Row className="form-row">
                            <Col md={6}>
                                <Form.Group controlId="formPrograms">
                                    <Form.Label className="form-label">Program</Form.Label>
                                    <Form.Control as= "select"
                                        name="program" required="">
                                        <option value="">Choose...</option>
                                    
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md= {6}>

                                <Row>
                                    <Col>
                                        <Form.Group controlId="matNumber">
                                        <Form.Label>Matriculation number</Form.Label>
                                        <Form.Control
                                            type="text" name="matricNumber" placeholder="e.g. 16/2020" required=""
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="gradYear">
                                        <Form.Label className="form-label">Graduation year</Form.Label>
                                        <Form.Control as="select"
                                            name="graduationYear" required="" className="form-control">
                                            <option value="">Choose...</option>
                                            
                                        </Form.Control>
                                        </Form.Group>

                                    </Col>
                                
                                
                                </Row>
                                
                            
                            </Col>
                            
                            
                        </Row>
                        <button type="submit" class="btn btn-primary btn-1" id="btn-1">Sign Up</button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </Layout>
    )
}
export default Signup;
