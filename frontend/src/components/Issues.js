import React, { useState } from 'react'
import "./style/issue.css"
export default function Issues() {
    const [location, setLocation] = useState("");
    const [issue, setIssue] = useState("");
    const [issueDesc, setIssueDesc] = useState("");
    async function loginUser(event) {
        // define loginUser function async to handle async requests and prevent page refresh
        event.preventDefault(); // prevent page refresh on submit button click
    
        const response = await fetch("http://localhost:4000/api/addissue", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
          },
          body: JSON.stringify({
            location,
            issue,
            issueDesc
          }),
        });
        const data = await response.json()
    }
    return (
        <div className="wrapper-issue">
            <form onSubmit={loginUser}>
                <h1>Add an issue</h1>
                <div id="wizard">
                    <section>
                        <div className="form-row"> <input type="text" className="form-control" placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)} /> </div>
                        <div className="form-row"> <input type="text" className="form-control" placeholder="Issue" value={issue}
                            onChange={(e) => setIssue(e.target.value)} /> </div>
                    </section>
                    <section>
                        <div className="form-row"> <textarea name="" id="" className="form-control" placeholder="Issue Description" value={issueDesc}
              onChange={(e) => setIssueDesc(e.target.value)}></textarea> </div>
                        <div className='checkBox'>
                            <label htmlFor="Anonymous">Anonymous</label>
                            <input id="Anonymous" type="checkbox" />
                        </div>
                    </section>
                </div>
                <button type='submit'>Add</button>
            </form>
        </div >
    )
}
