import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "@material-ui/core/";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

function Home() {
  const [Query, setQuery] = useState("");
  const [eData, seteData] = useState([]);
  const [eDataId, seteDataId] = useState([]);
  const [active, setActive] = useState(false);
  const [create, setcreate] = useState(false);
  const [update, setupdate] = useState(false);
  const [view, setView] = useState(false);
  const [DeleteEmp, setDeleteEmp] = useState(false);

  const getAllData = async () => {
    await axios({
      method: "get",
      url: "http://localhost:3000/users",
    }).then((response) => {
      seteData(response.data);
      console.log(response.data);
    });
  };
  const getEleById = async () => {
    await axios({
      method: "get",
      url: `http://localhost:3000/users/${active}`,
    }).then((response) => {
      seteDataId(response.data);
      console.log(response.data)
    });
  };

  const deleteE = async () => {
    await axios({
      method: "delete",
      url: `http://localhost:3000/users/${active}`,
    }).then((response) => {
      if (response.status === 200) {
        console.log("successfully deleted")
    }})
  };
  const updateE = async () => {
    await axios({
      method: "put",
      url: `http://localhost:3000/users/${active}`,
      data: postData
    }).then((response) => {
      if (response.status === 200) {
        console.log("successfully updated")
    }})
  };

  
  const avg = [];
  const [averageData , setAverage] = useState()
  
  const length = eData.length;
  
  const avvg = async () => { 
      eData.map((inp) => {
     console.log(inp.salary)
     avg.push(parseInt(inp.salary))
     average();
     return inp.salary
    })
    console.log(avg);
    
  }
  const average = async () => {
    const sum = await avg.reduce((total, value) => total + value, 0);
    console.log(sum)
    const avgSalary = sum/length
    setAverage(avgSalary);
  }
  
  console.log(averageData)
  
  
  // useEffect(() => {
    //     fetch("http://localhost:3000/users")
    //       .then((res) => {res.json(); console.log(res.data);})
    
    //   }, []);
    
    const handleMouseEnter = (index) => {
    setActive(index);
  };
  
  
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

  const Chatdata =  eData.map((inp) => {
    return inp.salary;
  })
  const Chatlabel =  eData.map((inp) => {
    return inp.name;
  })
  
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
  
  const data = {
    labels: Chatlabel,
    datasets: [
      {
        label: 'Salary of Employees',
        data: Chatdata,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  useEffect(() => {
    getAllData();
    console.log(eData);
  }, [create, update, DeleteEmp]);

 useEffect(() => {
  avvg();
 }, [getAllData])

  return (
    <div className="bg-secondary position-relative justify-content-center d-flex-column w-100 ">
      <div className=" w-100  justify-content-center align-items-center">
        <div className="d-flex">
          <input
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            className="bg-secondary mx-auto my-5 px-5 py-2 rounded-pill border w-50 focus-ring  text-decoration-none"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="bg-secondary">
        <h1 className="text-center">Total Employee: {length}</h1>
        <h1 className="text-center mb-5">Average Salary: {averageData}</h1>
        {eData
          .filter((el) => {
            if (Query === "") {
              return el;
            } else if (el.name?.toLowerCase().includes(Query.toLowerCase())) {
              return el;
            }
            return null;
          })
          .map((item, index) => (
            <div
              className="d-flex mx-auto  m-1 w-50 py-1 border"
              key={index}
              onMouseEnter={() => {
                handleMouseEnter(item._id);
                console.log(item._id);
              }}
            >
              <p>{item.name}</p>
              <div className=" mx-5 ">
              <div className=" container">
                <button
                  onClick={() => {
                    getEleById();
                    setView(true);
                  }}
                  className="bg-success px-4 rounded-pill"
                  >
                  View
                </button>
              </div>
              <div className=" container">
                <button
                  onClick={() => {
                    deleteE();
                    setDeleteEmp(true);
                  }}
                  className="bg-success px-4 rounded-pill"
                >
                  Delete
                </button>
              </div>
              <div className=" container ">
                <button
                  onClick={() => {
                    setupdate(true);
                  }}
                  className="bg-success px-4 rounded-pill"
                >
                  Update
                </button>
              </div>
            </div>
            </div>
          ))}
        <div className="mx-auto w-50 mt-4">
                <button
                  onClick={() => {
                    setcreate(true);
                  }}
                  className="bg-success p-2 rounded-pill"
                >
                  Create New employee
                </button>
              </div>
      </div>
      {create ? (
        <div className="position-absolute rounded-4 bg-info top-50 start-50 translate-middle">
          <div className="d-flex m-5 flex-column">
            <form className="d-flex flex-column">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                style={errors.firstName && { borderColor: "red" }}
                ref={register({ required: true, maxLength: 20 })}
                className="first-name my-2 input"
              />
              <label>Department</label>
              <input
                type="text"
                name="department"
                placeholder="department"
                onChange={(e) => setdepartment(e.target.value)}
                style={errors.lastName && { borderColor: "red" }}
                ref={register({ required: true })}
                className="last-name my-2 input"
              />
              <label>Position</label>
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
                className="email-address my-2 input"
              />
              <label>Salary</label>
              <input
                type="text"
                name="salary"
                placeholder="salary"
                onChange={(e) => setsalary(e.target.value)}
                style={errors.password && { borderColor: "red" }}
                ref={register({ required: true, maxLength: 20 })}
                className="password input my-2"
              />
            </form>
            <Button
              className="bg-success my-2 rounded-4"
              type="submit"
              onClick={() => {
                createNewE();
              }}
            >
              {" "}
              Create
            </Button>
            <Button
              className="bg-success rounded-4"
              onClick={() => {
                setcreate(false);
              }}
            >
              {" "}
              Exit
            </Button>
          </div>
        </div>
      ) : null}
      {view ? (
          <div className="position-absolute rounded-4 bg-info top-50 start-50 translate-middle">
            <div className=" m-5 w-100 d-flex-column">
              <p>Name: {eDataId.name}</p>
              <p>Department: {eDataId.department}</p>
              <p>Position: {eDataId.position}</p>
              <p>Salary: {eDataId.salary}</p>
              <Button
                className="bg-success rounded-4"
                onClick={() => {
                  setView(false);
                }}
              >
                {" "}
                Exit
              </Button>
            </div>
          </div>
      ) : null}
      {update ? (
          <div className="position-absolute  rounded-4 bg-info top-50 start-50 translate-middle">
            <div className="d-flex m-5 flex-column">
            <form className="d-flex flex-column">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                style={errors.firstName && { borderColor: "red" }}
                ref={register({ required: true, maxLength: 20 })}
                className="first-name my-2 input"
              />
              <label>Department</label>
              <input
                type="text"
                name="department"
                placeholder="department"
                onChange={(e) => setdepartment(e.target.value)}
                style={errors.lastName && { borderColor: "red" }}
                ref={register({ required: true })}
                className="last-name my-2 input"
              />
              <label>Position</label>
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
                className="email-address my-2 input"
              />
              <label>Salary</label>
              <input
                type="text"
                name="salary"
                placeholder="salary"
                onChange={(e) => setsalary(e.target.value)}
                style={errors.password && { borderColor: "red" }}
                ref={register({ required: true, maxLength: 20 })}
                className="password my-2 input"
              />
            </form>
            <Button
              className="bg-success my-2 rounded-4"
              type="submit"
              onClick={() => {
                updateE();
              }}
            >
              {" "}
              Update
            </Button>
            <Button
              className="bg-success rounded-4"
              onClick={() => {
                setupdate(false);
              }}
            >
              {" "}
              Exit
            </Button>
            </div>
            </div>
      ) : null}
      {DeleteEmp ? (
        
          <div className="position-absolute rounded-4 bg-info top-50 start-50 translate-middle">
            <div className=" m-5 w-100 d-flex flex-column">
            <p>Deleted Successfully</p>

          <Button
                className="bg-success w-50  rounded-4"
                onClick={() => {
                  setDeleteEmp(false);
                }}
                >
                {" "}
                Exit
              </Button>
          </div>
        
              </div>
      ) : null}
      
      <h1 className="text-center mt-5">Chart showing the salaries of the Employees </h1>
      <div className=" mx-auto w-50 h-50">
        <Doughnut data={data} />
      </div>
    </div>
  );
}

export default Home;
