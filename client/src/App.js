import React from "react";
import AddMember from './components/AddMember';
import FamilyMembers from './components/FamilyMembers';
import ProfilePage from './components/ProfilePage';
import NewUser from './components/NewUser';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
      return (
        <div className="app">
          <div className="picture"><a href="/"><img src="https://cdn.mos.cms.futurecdn.net/jmcLjPTPwnHFT2gyPjmvye-650-80.jpg" alt="family" id="img-fluid"></img></a>
          </div>         
          <div>   
            <Router>
              <Switch>
                <Route path="/" exact component={NewUser}/>
                <Route path="/profile/:id" component={ProfilePage}/>
              </Switch>
            <div className="footer"></div>
            </Router>
          </div>
        </div>
      );
    }
