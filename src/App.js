import './App.css';
import Admin from "./pages/admin/Admin";
import NavBar from "./components/NavBar";
import {Route, Routes} from "react-router";

function App() {
  return (

      <div className="container-fluid">
          <div className="row">
              <div className="col-12">
                  <NavBar></NavBar>
              </div>
          </div>
          <div className="row">
              <div className="col-12">
                  <Admin></Admin>
              </div>
          </div>
      </div>
  );
}

export default App;
