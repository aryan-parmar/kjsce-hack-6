import { useState } from 'react'                                  // import useState from react library to use state in this component
import {Link} from 'react-router-dom'                            // import Link from react-router-dom library to use links in this component

function Login() {                                             // define Login component
	const [email, setEmail] = useState('')                    // define email and setEmail state
	const [password, setPassword] = useState('')             // define password and setPassword state

    async function loginUser(event) {                      // define loginUser function async to handle async requests and prevent page refresh
		event.preventDefault()                            // prevent page refresh on submit button click

        const response = await fetch('http://localhost:1337/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
            body: JSON.stringify({
				email,
				password,
            }),
        })
        const data = await response.json()                // get the response data as json format and store it in data variable
        
        if (data.user) {                          
			localStorage.setItem('token', data.user)   // set the token in local storage with the data.user
			alert('Login successful')                 // alert the user that login is successful
			window.location.href = '/dashboard'      // redirect the user to dashboard
		} else {                                    // if the user is not found
			alert('Please check your username and password') // alert the user that login is unsuccessful
		}
	}
    // render the Login component with the following html elements and properties  :
	return (                                                
		<div>   
			<h1>Login</h1>                       
			<form onSubmit={loginUser}>          
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Login" />
			</form>
		</div>
	)
}

export default App                                            // export App component to use it in other components in this project