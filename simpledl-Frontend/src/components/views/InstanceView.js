import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

class InstanceView extends Component {
  render() {
    return (
      <div>
        <h1>List of Instances:</h1>
        <ListGroup>
          <ListGroupItem>Instance 1 Name</ListGroupItem>
          <ListGroupItem>Instance 2 Name</ListGroupItem>
          <ListGroupItem>Instance 3 Name</ListGroupItem>
          <ListGroupItem>Instance 4 Name</ListGroupItem>
          <ListGroupItem>Instance 5 Name</ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

export default InstanceView;
