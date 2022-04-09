import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Map from "./components/Map";
import Navbar from './components/Navbar';

function App() {
  return (

    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Map />} />
        {/* <Route path="login" element={<Login />} />
        <Route path="issue" element={<Issue />} />
        <Route path="signup" element={<Register/>} /> */}
        <Route path="/*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();