import axios from "axios";
import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "../../App.css";

function CreateInstance() {
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
      axios.post(
        "http://localhost:8081/api/simple/instance/SampleInstance1",
        body
      );
    } catch (err) {
      console.log(err);
    }
  }
 //
  // async function generateHtmlPages() {
  //   try {
  //     axios.get("http://localhost:8081/api/simple/2");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <div>
      <h2 className="header2">Create Instance</h2>
      <Form className="form">
        <FormGroup floating>
          <Label for="InstanceName"> Name </Label>
          <Input
            type="text"
            name="name"
            id="instanceName"
            placeholder="Enter your Archive Name"
            value={name}
            onChange={handleChange}
          />

          <Button
            className="mt-3"
            size="lg"
            id="CreateButton"
            onClick={() => {
              ChooseXSL(name);
            }}
          >
            Create Instance
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
}

export default CreateInstance;
