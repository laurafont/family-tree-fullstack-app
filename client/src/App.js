import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
     users: [],
     name: "",
     surname: "",
     relationship:"",
     description: ""
    };
  }

  
  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    fetch("/users/user")
      .then(response => response.json())
      .then(response => {
        this.setState({ users: response });
      });
  };


  addUser=()=> 
  {
    fetch("/users/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        surname: this.state.surname,
        relationship: this.state.relationship,
        description: this.state.description
    })
    })

      .then(res => res.json())
      .then(response => {
        this.setState({
          user: response
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteUser = i => {
    fetch(`/users/user/${i}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          user: response
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
        relationship: this.state.relationship,
        description: this.state.description
    })
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          user: response
        });
      })
      .catch(error => {
        console.log(error);
      });
    }


  buttonClicked() // = event => 
  {
      this.addMember({
      name: this.state.name,
      surname: this.state.surname,
      relationship: this.state.relationship,
      description: this.state.description
      })
  }

  addMember(newMember) {
    this.setState({
      users: [...this.state.users, newMember]
    });    
  }

  
  inputChanged = event => {
    //const value = event.target.value;
    const name = event.target.name;
    event.preventDefault();
    this.setState({
      [name]: event.target.value 
    })
  }

  render() {
    return (
      
      <div className="text-center">
      <img className="picture" src="https://cdn.mos.cms.futurecdn.net/jmcLjPTPwnHFT2gyPjmvye-650-80.jpg" alt="family" id="img-fluid"></img>

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
          Relationship
          <input className="form-control" type="text" name="relationship" 
          onChange={e => this.inputChanged(e)} />
       </label>

       <label>
          Description
          <input className="form-control" type="text" name="description"  
          onChange={e => this.inputChanged(e)} />
          
       </label>
      </form>
      
     <button className="btn btn-secondary" 
      onClick={() => this.addUser()}>Click here!</button>

      <div>
         {this.state.users.map((user, index)=> 
           {
             return(
                <div key={index}> 
                <span>
                <ul>
              <li>{user.name + " "}</li>
              <li>{user.surname + " "} </li>
              <li>{user.relationship + " "} </li>
              <li>{user.description} </li>
              </ul>
                </span>
                <button onClick={() =>
                this.deleteUser(user.id)}>Delete
                </button>
                <button onClick={() =>
                this.updateUser(user.id)}>Update
                </button>
                
                </div>
             );
           }         
       )}
       </div>
   </div>
    );
  }
}
export default App;
 
