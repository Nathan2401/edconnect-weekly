import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import './App.css';
import Home from './Home';
import Signup from './Signup';


function App() {
  return(
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/Signup" component={Signup}/>
      </Switch>
    </Router>

  )
  

    

}

export default App;
