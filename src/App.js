 
// import './App.css';
 
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from './pages/Home';
import AuthPage from './pages/Auth';


// import ClientsPage from './pages/clients';
// import AddNewClient from './pages/add-client';
import CreateAccountPage from './pages/create-account';
import SearchPage from './pages/search-page';
import PartnersDetailsPage from './pages/searvice-details-page';
import ProfilePage from './pages/Profile';
import AddPartnairePage from './pages/add-partner';
 
export default class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div >

        <Router>
          <Switch>
            <Route path="/" component={ HomePage } exact/>
            <Route path={ '/search' } component={ SearchPage } exact />
            <Route path={ '/addPartenaire' } component={ AddPartnairePage } exact />
            <Route path={ '/partners/:id' } component={ PartnersDetailsPage } exact />
            

            <Route path={ '/profile' } component={ ProfilePage } exact />
            

            



            <Route path="/auth" component={ AuthPage } exact/>

            <Route path="/create-account" component={ CreateAccountPage } exact/>
            
            
   
          </Switch>
        </Router>
      </div>

    );
  }


}


