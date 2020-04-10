import React, { Component } from 'react'

export default class AddMember extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            sex: "",
            age: null,
            image: "",
            date_of_birth: null,
            location: "",
            relationship: null,
            user: null,
            members: []
        };
    }

/*     componentDidMount() {
        this.getUser();
      }
    
    getUser = () => {
        fetch(`/users/user/${this.props.match.params.id}`)
          .then(response => response.json())
          .then(response => {
            this.setState({ user: response[0].id });
        });
    }; */
    
    inputChanged = event => {
        //const value = event.target.value;
        const name = event.target.name;
        event.preventDefault();
        this.setState({
          [name]: event.target.value 
        })
    }
    
    addPerson() {
        fetch("/users/person", {
          method: "POST",
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
            relationship_id: this.state.relationship,
            user_id: this.state.user
          })
        })
          .then(response => response.json())
          .then(response => {
            console.log(response)
            this.setState({ members: response });
        })
          .catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <h4>Add a member of your family</h4>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-8">
                            <input className="form-control"
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={e => this.inputChanged(e)}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-secondary" onClick={e => this.addMember()}>Add member</button>
                    </div>
                </form>
            </div>
        )
    }
    
}
