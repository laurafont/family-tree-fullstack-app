import React from "react";

class UserView extends React.Component {
  

  render() {
    return ( 
      <div> 
      <h2>My Projects</h2>
      <div>

        {this.props.myProjects.map((project, index) => ( 
        <div key={index}> 
        {project.title} 
        <img alt="" src={project.url} width="200"/>
        </div>
          
          ))}

          
          
      </div>
      
    </div>
);  

}


//makeDisplayedProject(newProject) {
  //this.setState({
    //displayedProjects : projects})
}


export default UserView;

