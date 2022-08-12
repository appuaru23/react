import logo from './logo.svg';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Adduser from "./components/Adduser";
import Edituser from "./components/Edituser";
import Userlist from "./components/Userlist";
import Dashboard from "./components/Dashboard";
import Navbar from "./navbar/Navbar";
function App() {
  return (

    <Router>
      <div className="App">
        // <Navbar/>
        <div>
          <Routes>
            <Route path="/" element={<Userlist/>}/>
            <Route path="/adduser" element={<Adduser/>}/>
            <Route path="/edituser/:id" element={<Edituser/>}/>
            <Route path="/Dashboard" element={<Dashboard/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
