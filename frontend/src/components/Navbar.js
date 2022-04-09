import React from 'react'
import { Link } from 'react-router-dom'
import "./style/navbar.css"

export default function Navbar() {
  let [option, setOption]=React.useState([{link:"login",text:"Login"}, {link:"signup",text:"Signup"}])
  React.useEffect(()=>{
    
    fetch("http://localhost:4000/api/userLoginStat", {
      // Create fetch request to register user
      method: "POST", // Set request method to POST to register user
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      },
    }).then(response=>response.json()).then(data=>{
      if(data.status==="ok"){
        setOption([{link:"issue",text:"add an issue"},{link: "profile",text:"profile"}])
      }
    })
  },[])
  return (
    <section className="navbar">
    <div className="container">
        <h1 className="logo"><Link to="/">Yugma</Link></h1>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {option.map(item=>(
                  <li><Link to={item.link}>{item.text}</Link></li>
                ) )}
            </ul>


        </nav>
    </div>
</section>

  //   <nav className="menu-container">
  //   {/* <!-- burger menu --> */}
  //   <input type="checkbox" aria-label="Toggle menu" />
  //   <span></span>
  //   <span></span>
  //   <span></span>

  //   {/* <!-- logo --> */}
  //   <Link to="#" className="menu-logo">
  //     <img
  //       src="/Logo.png"
  //       alt="LOgo" />
  //   </Link>

  //   {/* <!-- menu items --> */}
  //   <div className="menu">
  //     <ul>
        

        
  //     </ul>
  //     <ul>
  //       <li>
  //         <Link to="signup">
  //           Sign-up
  //         </Link>
  //       </li>
  //       <li>
  //         <Link to="login">
  //           Login
  //         </Link>
  //       </li>
  //     </ul>
  //   </div>
  // </nav>



  )
}
