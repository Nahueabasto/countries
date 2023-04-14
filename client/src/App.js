import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './component/LandingPage';
import Home from './component/Home';
import CountryDetails from './component/Detail';
import Form from './component/Form';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/';


function App() {
  return (
  <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path ="/home" component={Home} />
      <Route exact path="/countries/:id" render={({match}) => <CountryDetails id={match.params.id}/>} />
      <Route exact path="/home/form" component={Form} />
    </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
