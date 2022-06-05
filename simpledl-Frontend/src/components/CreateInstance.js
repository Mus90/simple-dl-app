import { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "../App.css";

class CreateInstance extends Component {
  render() {
    return (
      <div className="App">
        <h2>Create New Instance</h2>
        <Form className="form">
          <FormGroup>
            <Label for="InstanceName"> Name </Label>
            <Input
              type="text"
              name="name"
              id="exampleName"
              placeholder="NDLT Archive"
            />
          </FormGroup>
          <FormGroup>
            <Button id="createButton">Create</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
export default CreateInstance;
