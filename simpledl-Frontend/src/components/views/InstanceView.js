import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import "../../App.css";

class InstanceView extends Component {
  render() {
    return (
      <div className="instanceList">
        <h1>List of Instances</h1>
        <ListGroup>
          <ListGroupItem>Instance 1 Name</ListGroupItem>
          <ListGroupItem>Instance 2 Name</ListGroupItem>
          <ListGroupItem>Instance 3 Name</ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

export default InstanceView;
