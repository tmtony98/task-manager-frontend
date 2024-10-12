import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTasklist] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    const res = await axios.get("http://localhost:4000/getTask");
    console.log(res.data);
    setTasklist(res.data);
    console.log(taskList);
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setTask(e.target.value);
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      if (!task) {
        toast.error("Task cannot be empty");
      } else {
        const res = await axios.post("http://localhost:4000/addTask", { task });
        console.log(res.status);

        if (res.status === 200) {
          toast.success("Task Added Successfully");
          setTask("");
          getTask()
        } else if (res.status === 404) {
          toast.error(res.data);
        }
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

const deleteTask = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:4000/deleteTask/${id}`);
    console.log(id);
    
    if (res.status === 200) {
      toast.success("Task deleted successfully");
      getTask(); 
    }
  } catch (error) {
      // toast.error(`Error: ${error.message}`);
  }
};



  return (
    <>
      <div className="App">
        <div className="container-fluid">
          <div className="row d-flex justify-content-center app-row">
            <div className="col-lg-5 col-11">
              <h1 className="text-primary text-center mb-5">
                Task Management App
              </h1>
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Task Name
                  </label>
                  <div className="d-flex task-field">
                    <input
                      name="task"
                      value={task}
                      onChange={handleInputChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter task name"
                      aria-describedby="emailHelp"
                    />
                    <button
                      onClick={addTask}
                      type="submit"
                      className="btn submit-btn btn-primary"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </form>

              <div className="container-fluid mt-4">
                <div className="row">
                  {taskList.map((item, index) => (
                    <div className="col-lg-12" key={index}>
                      <div className="task-card">
                        <div className="d-flex justify-content-between align-items-center">
                         <div className="d-flex task-text">
                         <p className=" mx-1">{index+1}.</p>
                         <p>{item.task}</p>
                         </div>
                         
                          <div className="btns ">
                            <button  className="btn btn-primary mx-2"><i class="fa-regular fa-pen-to-square"></i></button>
                            <button onClick={()=>deleteTask(item._id) } className="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
