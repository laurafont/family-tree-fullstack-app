import React, { Component } from 'react'

export default class Edit extends Component {
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
    render() {
        return (
            <div>
                 {this.state.members.map((member, index) => {
                      return (
                      <div key={index}>
                        <div className="card-bod">
                            <h5 className="card-title">{member.name}</h5>
                            {this.state.relationships.map((relationship, index) => {
                              return (
                                <p key={index} className="card-text">{relationship.id === member.relationship_id ? relationship.type : null}</p>
                              );})}
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Sex: {member.sex}</li>
                            <li className="list-group-item">Age: {member.age}</li>
                            <li className="list-group-item">Location: {member.location}</li>
                            <li className="list-group-item">Date of Birth: {member.date_of_birth}</li>
                        </ul>
                        </div>);})}
            </div>
        )
    }
}
