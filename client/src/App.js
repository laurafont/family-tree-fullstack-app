/*import React, { Component } from "react";
import "./App.css";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: [],
      name: "",
      sex:"",
      age:"",
      date_of_birth:"",
      image_location:""
    };
  }

  inputName = event => {
    event.preventDefault();
    this.setState({
      name: event.target.value
    });
  };

  inputSex = event => {
    event.preventDefault();
    this.setState({
      sex: event.target.value
    });
  };
render() {
  return (
    <div className="App">
      <h1>Family Tree</h1>
      <label>
          Name
          <input
            onChange={this.inputName}
            value={this.state.name}
            type="text"
          />
        </label>
        <label>
          Sex
          <input
            onChange={this.inputSex}
            value={this.state.sex}
            type="text"
          />
        </label>
    </div>
  );
}
}

export default App;
*/

import React from "react";
import AdminView from "./components/adminView";
import UserView from "./components/userView";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      adminView: true, 
      projects: [] };
    
  }

  

  addProject(newProject) {
    this.setState({
      projects: [...this.state.projects, newProject]
    });
  }

  changeUser(isAdmin) {
    this.setState({ adminView: isAdmin});
  }

  render() {
    return (
      <div> 
        <button className= {this.state.adminView ? "btn btn-info " : null} onClick={() => this.changeUser(true)} >ADMIN</button>

        <button className= {!this.state.adminView ? "btn btn-info" : null} onClick={() => this.changeUser(false)} >USER</button>
        { this.state.adminView ? 
        (<AdminView addProject={newProject => this.addProject(newProject)} />) // anything inlined here (an attribute in html) is a prop. This prop is a function that triggers something in the parent. AND THE PROPS ARE ARGUMENTS TO A FUNCTION EX.: FUNCTION ADMINVIEW (ADDPROJECT) if addProject is more than one thing, React will compress it in an object. 
        : (<UserView myProjects = {this.state.projects} /> )}
      </div>
    );
  }
}
export default App;
 //or for the buttons: this.state.adminView && "btn btn-secondary btn-sm" 

