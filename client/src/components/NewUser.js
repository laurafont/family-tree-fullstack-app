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
            <div className="container mt-5">
               <h4 className="display-4">Create your family tree</h4>
          <br/>

          <form>
          <label>
            
              <input className="form-control" type="text" name="name" placeholder="Name"
            onChange={e => this.inputChanged(e)} />
          </label>
  
          <label>
              
              <input className="form-control" type="text" name="surname" placeholder="Surname"
              onChange={e => this.inputChanged(e)} />
          </label>
          
          <label>
              
              <input className="form-control" type="text" name="email" placeholder="Email" 
              onChange={e => this.inputChanged(e)} />
          </label>
  
          <label>
              
              <input className="form-control" type="text" name="birth" placeholder="Date of birth"  
              onChange={e => this.inputChanged(e)} />
          </label>
          </form>
          <br/>
          <button className="btn btn-info" 
          onClick={() => this.addUser()}>Create new profile</button> 
            </div>
          <br/>
          <br/>
            <div>
                <div>
                    {this.state.users.map((user, index) => 
                    {   
                    return(
                    <div className="list-group-item align-items-center">
                      <div key={index}> 
                       
                            <ul className="mt-2">
                              <li className="h4">{user.name + " "}{user.surname + " "}</li>
                              <li>{user.email} </li>
                              <li className="font-italic">{user.birth} </li>
                            </ul>
                        <div className="mb-2">
                          <Link to={`/profile/${user.id}`}><button className="btn btn-outline-primary">Access</button></Link>
                          <span> </span>
                          <button className="btn btn-outline-danger"onClick={() => this.deleteUser(user.id)}>Delete</button>
                        </div>
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
