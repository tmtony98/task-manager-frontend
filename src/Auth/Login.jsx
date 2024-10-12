import React from 'react'
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
// import { BASEURL } from "../services/baseUrl";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-toastify/dist/ReactToastify.css";



function Login() {
    

  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });

  var jsonData = JSON.stringify(adminData);
  localStorage.setItem('adminData', jsonData);


  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
     setAdminData({ ...adminData, [name]: value });
   console.log(adminData);
  };

  const handleSubmit = async (e) => {
    const {email,password } = adminData
    if ( !email || !password) {
      alert("please fill the form completely")
          }else{
            e.preventDefault();
            try {
              // Make a POST request to store form data in JSON Server
              const res = await axios.post(`http://localhost:4000/user/login`, adminData);
              console.log(res.status);
              if (res.status === 200) {
               // notify()
              toast(`login successfull!`);
                setAdminData({
                  email: "",
                  password: "",
                });
                navigate("/")
              } else if (res.status === 404) {
                alert(res.data);
              }
              //handle success message goes here
            } catch (error) {
              // Handle errors
             //notify()
              alert("User Details not Found! sign up now!");
              console.error("Error :", error);
            }
          }
  };
  return (
    <div>
       <div
        style={{ width: "100%", height: "100vh" }}
        className="d-flex justify-content-center  align-items-center"
      >
        <div className="container d-flex flex-column justify-content-center  ">
          <div
            style={{ marginLeft: "100px" }}
            className=" p-1 text-primary  "
          ></div>

          <div
            style={{ width: "65vw", marginLeft: "10%" }}
            className="row  d-flex flex-row justify-content-center  rounded bg-primary"
          >
            <div className="col-lg-6  d-flex justify-content-end px-1 align-items-center">
              <img
                className="img-fluid"
                style={{
                  height: "400px",
                  borderRadius: "300px",
                  padding: "50px",
                }}
                src="https://i.pinimg.com/564x/d1/54/66/d154660a6ae3104de2b0a314667a5ab6.jpg"
                alt="login/register image"
              />
            </div>
            <div className="col-lg-6 d-flex flex-column align-items-start justify-content-start">
              <h1 className="text-light fw-bold mt-5">Login Form</h1>
              <Form className="w-75 mt-3 ">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-light">Email address</Form.Label>
                  <Form.Control type="email"
                  
                   name="email"
                   value={adminData.email}
                   onChange={handleInputChange} placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="text-light">Password</Form.Label>
                  <Form.Control type="password" 
                     name="password"
                     value={adminData.password}
                     onChange={handleInputChange}
               
                  placeholder="Password" />
                </Form.Group>
              </Form>
              
                <button onClick={handleSubmit} className="btn px-3 btn-success p-2">Login</button>
              

              <Link style={{textDecoration:"none"}} to={"/register"}>
              <p className=" text-light  mt-2 p-1">
                Not having an account? Click to Register!
              </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}

export default Login




