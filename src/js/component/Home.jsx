import React, { useState } from "react";

const initialState = {
  label: "",
  done: false,
};


const Home = () => {
  const [task, setTask] = useState(initialState);
  const [lisTasks, setLisTasks] = useState([]);

  // functions
  function handleChange(event) {
    setTask({
      ...task,
      label: event.target.value,
    });
  }

  function saveTask(event) {
    if (event.key == "Enter") {
      setLisTasks([...lisTasks, task]);
      setTask(initialState);
    }
  }

  function deleteTask(index) {
    const newlist = lisTasks.filter((item, i) => i !== index);
    setLisTasks(newlist);
  }

  return (
    <div className="fondo">
      <h1 className="text-center pt-5 text-secondary display-1 newFont">
        TO DO LIST
      </h1>
      {/*Input de Tareas*/}

      <div className="container p-5 bg-primary-subtle">
        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            <i className="fa-regular fa-message"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Agregar tareas"
            value={task.label}
            aria-label="Username"
            aria-describedby="addon-wrapping"
            onChange={handleChange}
            onKeyDown={saveTask}
          />
        </div>
      </div>

      {/*lista de Tareas*/}

      <div className="container">
        <div className="card">
          {lisTasks.length <= 0 ? (
            <p className="text-center text-secondary newFont fw-bold">
              Sin tareas 
            </p>
          ) : (
            <p className="text-center text-secondary newFont fw-bold">{`Te faltan ${lisTasks.length} tareas por terminar`}</p>
          )}
          <ul className="list-group list-group-flush p-4 d-flex justify-content-between">
            {lisTasks.map((item, index) => {
              return (
                <div className="d-flex align-items-center justify-content-between">
                  <li className="list-group-item newFont w-100" key={index}>
                    {item.label}
                  </li>
                  <div>
                    <button type="button" onClick={() => deleteTask(index)}>
                      <span>
					             <i className="fa-solid fa-trash-can py-2"></i>
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;