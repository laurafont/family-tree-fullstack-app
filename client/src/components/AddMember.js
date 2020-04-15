import React, { Component } from 'react';


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
            relationship_id: null,
            user_id: null,
            members: []
        };
    }

      componentDidMount() {
      console.log( this.props.userId);
        this.getUser();
      }
    
    getUser = () => {
      this.setState({
        user_id: this.props.userId 
      })
    };  
    
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
            relationship_id: this.state.relationship_id,
            user_id: this.state.user_id
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
            <div className="container">
                <h5>Add a member of your family</h5>
                <br/>
                <form>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label text-left">Name</label>
                        <div className="col-sm-8">
                            <input className="form-control"
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={e => this.inputChanged(e)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label text-left">Age</label>
                        <div className="col-sm-8">
                            <input className="form-control"
                            type="text"
                            placeholder="Age"
                            name="age"
                            onChange={e => this.inputChanged(e)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label text-left">Location </label>
                        <div className="col-sm-8">
                            <input className="form-control"
                            type="text"
                            placeholder="Location"
                            name="location"
                            onChange={e => this.inputChanged(e)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label text-left">Relation </label>
                        <div className="col-sm-8">
                          <select className="custom-select mr-sm-2"
                            name="relationship_id" 
                            onChange={e => this.inputChanged(e)}>
                                <option selected>Type of relationship</option>
                                <option value="1">Parent</option>
                                <option value="2">Sibling</option>
                                <option value="3">Grandparent</option>
                                <option value="4">Cousin</option>
                                <option value="5">Aunt / Uncle</option>
                                <option value="6">Niece / Nephew</option>
                                <option value="7">Sister / Brother-in-law</option>
                                <option value="8">Daughter / Son-in-law</option>
                                <option value="9">Wife / Husband</option>
                                <option value="10">Child</option>
                          </select>    
                        </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label text-left">Gender</label>
                        <div className="col-sm-8">
                          <select className="custom-select mr-sm-2"
                            name="sex" 
                            onChange={e => this.inputChanged(e)}>
                                <option selected>Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-binary">Non-binary</option>
                          </select>    
                        </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label text-left">Image</label>
                        <div className="col-sm-8">
                          <input className="form-control"
                            type="text"
                            placeholder="Insert image URL"
                            name="image"
                            onChange={e => this.inputChanged(e)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label text-left">Birthday</label>
                        <div className="col-sm-8">
                        <input className="form-control"
                            type="text"
                            placeholder="Insert date"
                            name="date_of_birth"
                            onChange={e => this.inputChanged(e)}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-secondary" onClick={e => this.addPerson()}>Add member</button>
                    </div>
                </form>
            </div>
        )
    }
    
}
/* 
() => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      showYearDropdown
      dateFormatCalendar="MMMM"
      yearDropdownItemNumber={15}
      scrollableYearDropdown
    />
  );
}; */