import axios from "axios";
import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const CreateInstance = () => {
  const [name, setName] = useState("");
  const handleChange = (e) => {
    setName(e.target.value);
  };

  async function ChooseXSL() {
    const body = {
      name: "xsl",
      value: "simpleFiles/data/config/transform2.xsl",
    };
    try {
      axios.post("http://localhost:8081/api/simple", body);
    } catch (err) {
      console.log(err);
    }
  }

  async function generateHtmlPages() {
    try {
      axios.get("http://localhost:8081/api/simple/1");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <h2>Create Instance</h2>
      <Form className="form">
        <FormGroup>
          <Label for="InstanceName"> Name </Label>
          <Input
            type="text"
            name="name"
            id="input"
            placeholder="Enter your new Archive Name"
            value={name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Button
            id="CreateButton"
            onClick={() => {
              ChooseXSL();
              generateHtmlPages();
            }}
          >
            Create Instance
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default CreateInstance;
