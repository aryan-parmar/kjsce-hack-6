import React from "react";
import { Link } from "react-router-dom";
import "./style/navbar.css";

export default function Navbar() {
  let [option, setOption] = React.useState([
    { link: "login", text: "Login" },
    { link: "signup", text: "Signup" },
  ]);
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
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            setOption([
              { link: "issue", text: "add an issue" },
              { link: "about", text: "about" },
            ]);
          }
        });
    }
  }, []);
  return (
    <section className="navbar">
      <div className="container">
        <h1 className="logo">
          <Link to="/">Yugma</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {option.map((item) => (
              <li>
                <Link to={item.link} key={item.link}>
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
