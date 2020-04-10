import React, { Component } from 'react'

export default class FamilyMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            user_id: null
        }
    }

    componentDidMount() {
        console.log(this.props.userId)
        this.getMembers();
    }
    

    getMembers = () => {      
        fetch(`/users/user/43/person`)
          .then(response => response.json())
          .then(response => {
            this.setState({ members: response });
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

    render() {
        return (
            <div className="container">
                <h3 className="display-4">Your Family</h3>
                <br/>
                <div className="row">                   
                {this.state.members.map((member, index) => {
                      return (
                      <div key={index} className="card"> 
                        <img src={member.image} className="card-img-top" style={{width: 18 + "rem"}} alt="..."/>
                        <div className="card-bod">
                            <h5 className="card-title">{member.name}</h5>
                            <p className="card-text">Description</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Sex: {member.sex}</li>
                            <li className="list-group-item">Age: {member.age}</li>
                            <li className="list-group-item">Location: {member.location}</li>
                        </ul>
                        <div className="card-body">
                            <button className="card-link" onClick={() => this.updatePerson(member.id)}>Edit</button>
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
