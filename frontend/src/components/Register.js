import React,{ useState } from "react"; // Import useState hook
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom to redirect to login page
import "./style/Register.css"; // Import Register.css file

function Register() {
  // Create Register component and export it to be used in index.js
  const history = useNavigate(); // Create history object to redirect to login page

  const [name, setName] = useState(""); // Create state variables for name and email
  const [email, setEmail] = useState(""); // Create state variables for password and confirm password
  const [password, setPassword] = useState(""); // Create state variables for password and confirm password
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
  async function registerUser(event) {
    // Create async function to handle async requests and prevent page refresh
    event.preventDefault(); // Prevent page refresh on submit button click

    const response = await fetch("http://localhost:4000/api/register", {
      // Create fetch request to register user
      method: "POST", // Set request method to POST to register user
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Send the following data to the server
        name,
        email,
        password,
      }),
    });

    const data = await response.json(); // Get the response data as json format and store it in data variable

    if (data.status === "ok") {
      // If the status is ok then the user is registered
      history("/login"); // Redirect to login page
    }
  }

  return (
    <div className="body">
      <div className="login-form">
        <form onSubmit={registerUser}>
          <h1>Sign Up</h1>

          <div className="content">
            <div className="input-field">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
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
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register; // export the Register component
