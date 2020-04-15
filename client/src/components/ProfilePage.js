import React, { Component } from 'react'
import AddMember from './AddMember';
import FamilyMembers from './FamilyMembers';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: []
        }
    }

    componentDidMount() {
        this.getUserData();
    }

    getUserData = () => {
        fetch(`/users/user/${this.props.match.params.id}`)
          .then(response => response.json())
          .then(response => {
            this.setState({ userData: response[0] });
            //this.getCategory();
           // this.getAge();
          });
    };
    

    render() {
        return (
            <div class= "container">
                <div className="row">
                    <div className="span12">
                        <br/>
                        <div className="row">
                            <div className="span4">
                                <h3>{this.state.userData.name} {this.state.userData.surname}</h3>
                            <br/>
                            <AddMember userId={this.props.match.params.id}/>
                            </div>
                            <div className="span8">
                                <FamilyMembers userId={this.props.match.params.id}/>
                            </div>
                        </div>
                    </div>     
                </div>
            </div>
        )
    }
}
