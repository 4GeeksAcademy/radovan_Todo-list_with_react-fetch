

import React, { useState, useEffect } from "react";


const initialState = {
  label: "",
  done: false,
};


const Home = () => {
  const apiUrl = "https://playground.4geeks.com/todo"
  const [task, setTask] = useState(initialState);
  const [lisTasks, setLisTasks] = useState([]);
  const [userName, setUserName] = useState("radovan");


  // functions
  function handleChange(event) {
    setTask({
      ...task,
      label: event.target.value,
    });
  }

  function saveTask(event) {
    if (event.key == "Enter" && task.label !== "") {
      addNewTask(userName, task)
    }
  }

  function deleteTask(index) {
    const newlist = lisTasks.filter((item, i) => i !== index);
    setLisTasks(newlist);
  }

  // CREAR USUARIO

  function createUser(name) {
    fetch(apiUrl + '/users/' + name, {
      method: "POST",


    })
      .then(resp => {
        if (resp.status == 201) {
          getData(name)
        }
        console.log(resp.ok); // Será true si la respuesta es exitosa
        console.log(resp.status); // El código de estado 200, 300, 400, etc.
        console.log(resp.text()); // Intentará devolver el resultado exacto como string
        return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
      })
      .then(data => {
        // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch(error => {
        // Manejo de errores
        console.log(error);
      });
  }

  // BORRAR USERNAME

  function clearUser(userName) {
    fetch(apiUrl + '/users/' + userName, {
      method: "DELETE",


    })
      .then(resp => {
        console.log(resp.ok); // Será true si la respuesta es exitosa
        console.log(resp.status); // El código de estado 200, 300, 400, etc.
        if (resp.status == 204) {
          createUser(userName)


        }

      })

      .catch(error => {
        // Manejo de errores
        console.log(error);
      });
  }
  // RECIBIR USER

  function getData(name) {
    fetch(apiUrl + '/users/' + name)
      .then(resp => {
        console.log(resp.ok); // Será true si la respuesta es exitosa
        console.log(resp.status); // El código de estado 200, 300, 400, etc.
        if (resp.status == 404) {
          createUser(name)
        }
        if (resp.ok) {
          return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica

        }
      })
      .then(data => {
        if (data) {
          setLisTasks(data.todos)
        }
        // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch(error => {
        // Manejo de errores
        console.log(error);
      });
  }

  // AÑADIENDO NUEVA TAREA A LA API REST

  function addNewTask(name, newTask) {
    fetch(apiUrl + '/todos/' + name, {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json"
      }


    })
      .then(resp => {
        console.log(resp.ok); // Será true si la respuesta es exitosa
        if (resp.ok) {
          return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica

        }
      })
      .then(data => {
        if (data) {
          getData(name)
          setTask(initialState);
        }
        // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch(error => {
        // Manejo de errores
        console.log(error);
      });
  }
  useEffect(() => {
    getData(userName)
  }, [userName])


  // BORRAR TAREAS DE LA API

  function clearTask(todoId) {
    fetch(apiUrl + '/todos/' + todoId, {
      method: "DELETE",


    })
      .then(resp => {
        console.log(resp.ok); // Será true si la respuesta es exitosa
        getData("radovan")
        return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
      })
      .then(data => {
        // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch(error => {
        // Manejo de errores
        console.log(error);
      });
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
                <div className="d-flex align-items-center justify-content-between" key={index}>
                  <li className="list-group-item newFont w-100" key={index}>
                    {item.label}
                  </li>
                  <div className="trash bg-light  justify-content-end px-2 py-1">
                    <span className="" onClick={() => clearTask(item.id)} >

                      <i className="fa-solid fa-trash-can py-2 " id="addon-wrapping"></i>

                    </span>
                  </div>
                </div>
              );
            })}
          </ul>
          <button type="button" className="btn btn-primary" onClick={() => clearUser("radovan")} >Borrar todas las tareas</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
