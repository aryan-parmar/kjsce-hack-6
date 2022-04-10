import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/issue.css";
export default function Issues() {
  const [location, setLocation] = useState("");
  const [issue, setIssue] = useState("");
  const [issueDesc, setIssueDesc] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [select, setSelect] = useState([]);
  let history = useNavigate();
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
    } else {
      history("/login"); //  if user is not logged in, redirect to login page
    }
  }, []);
  async function submitIssue(event) {
    // define loginUser function async to handle async requests and prevent page refresh
    event.preventDefault(); // prevent page refresh on submit button click
    const response = await fetch("http://localhost:4000/api/addissue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"), // get the token from local storage and set it in the header
      },
      body: JSON.stringify({
        location,
        issue,
        issueDesc,
        anonymous,
      }),
    });
    const data = await response.json();
  }
  async function searchLocation(e) {
    setLocation(e.target.value);
    const response = await fetch("http://localhost:4000/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        value: e.target.value,
      }),
    });
    const data = await response.json();
    console.log(data);
    setSelect(data.locations);
  }
  console.log(anonymous);
  return (
    // <div className="wrapper-issue">
    //   <form onSubmit={submitIssue}>
    //     <h1>Add an issue</h1>
    //     <div id="wizard">
    //       <section>
    //         <div className="form-row">
    //           <input
    //             type="text"
    //             className="form-control"
    //             placeholder="Location"
    //             value={location}
    //             onChange={(e) => searchLocation(e)}
    //             list="locations" id="location" name="location"
    //           />
    //           {select.length === 0? <></>:
    //           <datalist id="locations">
    //             {select.map((item) => (
    //               <option value={item.name} placeholder="hello"/>
    //               ))}
    //           </datalist>
    //             }
    //         </div>
    //         <div className="form-row">
    //           <input
    //             type="text"
    //             className="form-control"
    //             placeholder="Issue"
    //             value={issue}
    //             onChange={(e) => setIssue(e.target.value)}
    //           />
    //         </div>
    //       </section>
    //       <section>
    //         <div className="form-row">
    //           <textarea
    //             name=""
    //             id=""
    //             className="form-control"
    //             placeholder="Issue Description"
    //             value={issueDesc}
    //             onChange={(e) => setIssueDesc(e.target.value)}
    //           ></textarea>
    //         </div>
    //         <div className="checkBox">
    //           <label htmlFor="Anonymous">Anonymous</label>
    //           <input id="Anonymous" type="checkbox" value={anonymous}
    //             onChange={(e) => setAnonymous(e.target.checked)}/>
    //         </div>
    //       </section>
    //     </div>
    //     <button type="submit">Add</button>
    //   </form>
    // </div>
    <div className="body">
      <div className="login-form">
        <form onSubmit={submitIssue}>
          <h1>Add an issue</h1>
          <div className="content">
            <div className="input-field">
              <input
                type="text"
                className="form-control"
                placeholder="Location"
                value={location}
                onChange={(e) => searchLocation(e)}
                list="locations"
                id="location"
                name="location"
              />
              {select.length === 0 ? (
                <></>
              ) : (
                <datalist id="locations">
                  {select.map((item) => (
                    <option value={item.name} placeholder="hello" />
                  ))}
                </datalist>
              )}
            </div>
            <div className="input-field">
              <input
                type="text"
                className="form-control"
                placeholder="Issue"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
              />
            </div>
            <div className="input-field">
              <textarea
                name=""
                id=""
                className="form-control"
                placeholder="Issue Description"
                value={issueDesc}
                onChange={(e) => setIssueDesc(e.target.value)}
              ></textarea>
            </div>
            <div className="input-field">
              <label htmlFor="Anonymous">Anonymous</label>
              <input
                id="Anonymous"
                type="checkbox"
                value={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
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
