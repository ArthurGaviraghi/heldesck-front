// App.jsx

import { Link } from "react-router-dom";
import "./App.css";


export default function App() {


  return (
    <div className="app-container">
      <h1 style={{ color: 'white' }}>HELPDESCK</h1>
      <div className="button-group">
        <Link className="btn" to="/login">Login</Link>
     
      </div>
    </div>
  );
}
