import React, { Component } from 'react';
import Edit from './Edit';

export default class FamilyMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            relationships: null,
            user_id: null,
            editing: null
        }
    }

    componentDidMount() {
      this.getMembers();
/*       this.setState({
        user_id: this.props.userId
      })   */    
    }  

    getMembers = () => {      
        fetch(`/users/user/${this.props.userId}/person`)
          .then(response => response.json())
          .then(response => {
            this.setState({ members: response });
          });
        this.getRelationships(); 
    };

    getRelationships = () => {      
      fetch(`/users/relationship`)
        .then(response => response.json())
        .then(response => {
          this.setState({ relationships: response });
        });
  };

    deletePerson = i => {
        fetch(`/users/person/${i}`, {
          method: "DELETE"
        })
          .then(res => res.json())
          .then(response => {
            this.setState({
              members: response
            });
          })
          .catch(error => {
            console.log(error);
          });
    };
     
    updatePerson = i => {
        fetch(`/users/person/${i}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: this.state.name,
            sex: this.state.sex,
            age: this.state.age,
            image: this.state.image,
            date_of_birth: this.state.date_of_birth,
            location: this.state.location,
            relationship_id: this.state.relationship_id,
            user_id: this.state.user_id
          })    
        })
         .then(res => res.json())
          .then(response => {
            this.setState({
              members: response
            });
          })
          .catch(error => {
            console.log(error);
          });
    }

    edit(i) {
      this.setState({
        editing: i
      })
      console.log(i)
    }

    render() {
        return (
            <div className="container">
                <h3 className="display-4">Your Family</h3>
                <br/>
                <div className="row">                   
                  {this.state.members.map((member, index) => {
                    return (
                      <div key={index} className="card shadow"> 
                        <img src={member.image} className="card-img-top" style={{width: 18 + "rem"}} alt="..."/>
                        <div className="card-bod">
                            <h5 className="card-title mt-3">{member.name}</h5>
                            {this.state.relationships && this.state.relationships.map((relationship, index) => {
                              return (
                                <p key={index} className="card-text">{relationship.id === member.relationship_id ? relationship.type : null}</p>
                              );})}
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{member.sex}</li>
                            <li className="list-group-item">{member.age} years old</li>
                            <li className="list-group-item">From {member.location}</li>
                            <li className="list-group-item">Birthday: {member.date_of_birth}</li>
                        </ul>
                      
                      <div className="card-body">
                          <button className="card-link" onClick={() => this.edit(index)}>Edit</button>
                          <button className="card-link" onClick={() => this.deletePerson(member.id)}>Delete</button>
                      </div>                    
                      </div>
                    );
                  })}
                </div>
            </div>
        )
    }
}
