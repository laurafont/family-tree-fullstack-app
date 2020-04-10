import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         name: "",
         surname: "",
         email:"",
         birth: "",
         users: [],
         user: {}
        };
    }

    componentDidMount() {
        this.getUsers();
        //this.getUser();
      }
    
    getUsers = () => {
        fetch("/users/user")
          .then(response => response.json())
          .then(response => {
            this.setState({ users: response });
          });
    };

    inputChanged = event => {
        //const value = event.target.value;
        const name = event.target.name;
        event.preventDefault();
        this.setState({
          [name]: event.target.value 
        })
      }

    addUser()
      {
        fetch("/users/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            birth: this.state.birth
          })
        })
          .then(response => response.json())
          .then(response => {
            console.log(response)
            this.setState({ users: response }); 
          })
          .catch(error => {
            console.log(error);
          });
        //this.getUser();
    }

    deleteUser = i => {
        fetch(`/users/user/${i}`, {
          method: "DELETE"
        })
          .then(res => res.json())
          .then(response => {
            this.setState({
              users: response
            });
          })
          .catch(error => {
            console.log(error);
          });
    };
     
    updateUser = i => {
        fetch(`/users/user/${i}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            birth: this.state.birth
          })    
        })
         .then(res => res.json())
          .then(response => {
            this.setState({
              users: response
            });
          })
          .catch(error => {
            console.log(error);
          });
    }


    render() {
        return (
            <div>
            <div className="container mt-4">
               <h4 className="display-4">Create new user</h4>
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
          <br/>
          <button className="btn btn-info" 
          onClick={() => this.addUser()}>Create profile</button> 
            </div>
          <br/>
            <div>
                <div>
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
                    <Link to={`/profile/${user.id}`}><button className="btn btn-outline-primary ml2">Access profile
                    </button></Link>
                    <button className="btn btn-outline-danger ml2"onClick={() => this.deleteUser(user.id)}>Delete
                    </button>
                    </div>
                    </div>
                    );
                    }         
                    )}
                </div> 
            </div>
            </div>
        )
    }
}
