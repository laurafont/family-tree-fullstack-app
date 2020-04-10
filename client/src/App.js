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
        <div className="text-center">
          <img className="picture" src="https://cdn.mos.cms.futurecdn.net/jmcLjPTPwnHFT2gyPjmvye-650-80.jpg" alt="family" id="img-fluid"></img>
          <hr/>
          <div className="text-center">   
            <Router>
              <Switch>
                <Route path="/new-user" exact component={NewUser}/>
                <Route path="/profile/:id" component={ProfilePage}/>
              </Switch>
              <NewUser/>
            </Router>
          </div>
        </div>
      );
    }


 /*
const NewUser = () => (
  <div>
    <h4>Create new user</h4>
    <br/>
    <form>
      <label>
        Name
        <input className="form-control" type="text" name="name" 
        onChange={e => this.inputChanged(e)} />
      </label>
      <label>
        Surname
        <input className="form-control" type="text" name="surname" 
        onChange={e => this.inputChanged(e)} />
      </label>
      <label>
        Email
        <input className="form-control" type="text" name="email" 
        onChange={e => this.inputChanged(e)} />
      </label>
      <label>
        Date of birth
        <input className="form-control" type="text" name="birth"  
        onChange={e => this.inputChanged(e)} />
      </label>
    </form>
    <div>
      <button className="btn btn-secondary" 
      onClick={() => this.addUser()}>Create profile</button>
    </div>
   */
{/*   <div>
  {this.state.users.map((user, index) => 
    {
      return(
        <div className="list-group-item align-items-center">
          <div key={index}> 
            <span>
              <ul>
                <li>{user.name + " "}{user.surname + " "}</li>
                <li>{user.email + " "} </li>
                <li>{user.birth} </li>
              </ul>
            </span>
            <button className="btn btn-outline-danger ml2" onClick={() => this.deleteUser(user.id)}>Delete
            </button>
            <button className="btn btn-outline-primary ml2"onClick={() => this.updateUser(user.id)}>Update
            </button>
          </div>
        </div>
      );
    }         
  )}
  </div> */}

{/* <Link to={`/profile/${user.id}`}>

</Link> */}
