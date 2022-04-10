import React, { useState } from "react"; // import useState from react library to use state in this component
import { Link, useNavigate } from "react-router-dom"; // import Link from react-router-dom library to use links in this component
import "./style/login.css"; // import Login.css file

function Login() {
  // define Login component
  const [email, setEmail] = useState(""); // define email and setEmail state
  const [password, setPassword] = useState(""); // define password and setPassword state
  let history = useNavigate(); // define history and useNavigate from react-router-dom library to redirect to login page
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:4000/api/userLoginStat", {
        // Create fetch request to register user
        method: "POST", // Set request method to POST to register user
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      }).then((data) => {
        console.log(data.json());
      });
      history("/");
    }
  });
  async function loginUser(event) {
    // define loginUser function async to handle async requests and prevent page refresh
    event.preventDefault(); // prevent page refresh on submit button click

    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json(); // get the response data as json format and store it in data variable

    if (data.user) {
      localStorage.setItem("token", data.user); // set the token in local storage with the data.user
      history("/"); // redirect the user to dashboard
    } else {
      // if the user is not found
      alert("Please check your username and password"); // alert the user that login is unsuccessful
    }
  }
  // render the Login component with the following html elements and properties  :
  return (

    <div className="body">
      <div className="login-form">
        <form onSubmit={loginUser}>
          <h1>Login</h1>
          <div className="content">
            <div className="input-field">
              <input
                type="email"
                placeholder="Email"
                autocomplete="nope"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                autocomplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="action">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login; // export App component to use it in other components in this project
