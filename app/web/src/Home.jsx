import React from 'react';
import Layout from './shared/Layout';
import {Container,Jumbotron,Button} from 'react-bootstrap';
const Home = ()=>{
    return(

        <Layout>
            <Container>
                <Jumbotron>
                <h1>Welcome to Project Explorer</h1>
                <p>Project Explorer is a repository for final year projects across all departments at your institution.
                    You can submit your project and search projects submitted by others to learn from.
                </p>
                <p>
                    <Button href="/Signup" variant="primary" className="btn-1 mr-2">Get Started</Button> 
                    <Button href="/Login"variant="secondary">Login</Button>
                </p>

                </Jumbotron>
            </Container>
        </Layout>
    )

}
export default Home;