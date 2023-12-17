import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@material-ui/core/";
import axios from "axios";

function Form() {
  const { register, errors } = useForm();

  const [name, setName] = useState("");
  const [department, setdepartment] = useState("");
  const [salary, setsalary] = useState("");
  const [position, setposition] = useState("");
  const postData = {
    department: department,
    name: name,
    position: position,
    salary: salary,
  };

  const createNewE = async () => {
    await axios({
      method: "post",
      url: `http://localhost:3000/users`,
      data: postData,
    }).then((response) => {
      if (response.status === 200) {
        console.log("success");
      } else {
        console.log("error");
      }
    });
  };


  return (
    <div className="d-flex m-5  d-flex-column">
      <form className="d-flex d-flex-column">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          style={errors.firstName && { borderColor: "red" }}
          ref={register({ required: true, maxLength: 20 })}
          className="first-name input"
        />

        <input
          type="text"
          name="department"
          placeholder="department"
          onChange={(e) => setdepartment(e.target.value)}
          style={errors.lastName && { borderColor: "red" }}
          ref={register({ required: true })}
          className="last-name input"
        />

        <input
          type="text"
          name="position"
          placeholder="position"
          onChange={(e) => setposition(e.target.value)}
          style={errors.email && { borderColor: "red" }}
          ref={register({
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
          className="email-address input"
        />

        <input
          type="text"
          name="salary"
          placeholder="salary"
          onChange={(e) => setsalary(e.target.value)}
          style={errors.password && { borderColor: "red" }}
          ref={register({ required: true, maxLength: 20 })}
          className="password input"
        />
      </form>
      <Button
        className="bg-success rounded-4"
        type="submit"
        onClick={() => {createNewE()}}
      >
        {" "}
        Create
      </Button>
    </div>
  );
}

export default Form;
