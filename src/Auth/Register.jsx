import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Register() {
    //
   
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
     setAdminData({ ...adminData, [name]: value });
    console.log(adminData);
  };

  const handleSubmit = async (e) => {
        const {name ,email,password } = adminData
        if (!name || !email || !password) {
       alert("please fill the form completely")
        }else{
          e.preventDefault();
          try {
            // Make a POST request to store form data in JSON Server
            const res = await axios.post(`http://localhost:4000/user/register`, adminData);
            console.log(res.status);
            if (res.status === 200) {
              alert(`sign up completed successfully!`);
              setAdminData({
                name: "",
                email: "",
                password: "",
              });
              toast.success("success")
              navigate("/login")
            } else if (res.status === 404) {
              alert(res.data);
            }
            //  handle success message goes here
          } catch (error) {
            // Handle errors
            alert("user already exists");
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
        <div className="container d-flex  flex-column justify-content-center  ">
          <div
            style={{ marginLeft: "100px" }}
            className=" p-1 text-primary  "
          ></div>

          <div
            style={{ width: "65vw", marginLeft: "10%" , }}
            className="row  d-flex flex-row justify-content-center  rounded  bg-primary"
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
              <h2 className="text-light fw-bold mb-4 mt-4 pt-3">
                Sign Up Form{" "}
              </h2>
              <form className="text-light">
                <div class="mb-2">
                  <label for="exampleInputname" class="form-label">
                    Full Name
                  </label>
                  <input
                    placeholder="Enter your name"
                    type="text"
                    name="name"
                    value={adminData.name}
                    onChange={handleInputChange}
                    class="form-control"
                    id="exampleInputname"
                    aria-describedby="nameHelp"
                  />
                </div>
                <div class="mb-2">
                  <label for="exampleInputEmail1" class="form-label">
                    Email address
                  </label>

                  <input
                    name="email"
                    placeholder="eg: xyz@gmail.com"
                    onChange={handleInputChange}
                    type="email"
                    value={adminData.email}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Password
                  </label>
                  <input
                    placeholder="******"
                    type="password"
                    name="password"
                    value={adminData.password}
                    onChange={handleInputChange}
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                {/* <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Confirm Password
                  </label>
                  <input
                    placeholder="******"
                    type="password"
                    name="password"
                    onClick={handleInputChange}
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div> */}

                <button onClick={handleSubmit} className="btn px-3 btn-success">
                  Sign up
                </button>
              </form>

             <Link  style={{textDecoration:"none"}}  to={"/login"}>
             <p className="mt-1   text-light pt-2">
                Already Have an Account?{" "}
                <span className=" text-light  mx-1">click to login!</span>
              </p>
             </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register



