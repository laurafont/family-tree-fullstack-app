import React from "react";

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
      description: ""
    };
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    //console.log("form button clicked!");
    // the argument from addProject is the whole object 'cause we're expecting the whole info 
    
      this.props.addProject({
        title: this.state.title,
        url: this.state.url,
        description: this.state.description
      })
 //newProject is what you pass, in this case the argument is the object... with properties, we would group them all (compress the arguments in an object and pass it around)
    }

  render() {
    return (
      <div className="card border-info mb-3 text-center col-sm-3 position-center">
         <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/photo6.jpg" alt="Card"></img>
        <form>
          <label>
            Name
            <input name="title" onChange={e => this.handleInputChange(e)} />
          </label>
          <label>
            Family Tree
            <input name="url" onChange={e => this.handleInputChange(e)} />
          </label>
          <label>
            Description
           
            <textarea name="description" onChange={e => this.handleInputChange(e)} >
            </textarea>
            </label>
             </form>
        <button className="btn btn-secondary" onClick={() => this.handleSubmit()}>Click here!</button>
      </div>
    );
  }
}

export default AdminView;
