import './App.css';
import Admin from "./pages/admin/Admin";
import NavBar from "./components/NavBar";
import {Route, Routes} from "react-router";
import Home from "./pages/home/Home";
import ListUser from "./pages/user/ListUser";
import ListRoom from "./pages/room/ListRoom";
import ListInvoice from "./pages/invoice/ListInvoice";
import ListDevice from "./pages/device/ListDevice";
import AddRoom from "./pages/room/AddRoom";
import EditRoom from "./pages/room/EditRoom";
import Room from "./pages/room/Room";
import Device from "./pages/device/Device";
import AddDevice from "./pages/device/AddDevice";
import EditDevice from "./pages/device/EditDevice";
import Home from "./pages/home/Home";

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
                  <Routes>
                      <Route to={`home`} element={<Home/>}></Route>
                      <Route to={`admin`} element={<Admin/>}>
                          <Route path={``} element={<ListUser/>}></Route>
                          <Route path={`room`} element={<Room/>}>
                              <Route path={``} element={<ListRoom/>}></Route>
                              <Route path={`add`} element={<AddRoom/>}/>
                              <Route path={`edit`} element={<EditRoom/>}/>
                          </Route>
                          <Route path={`invoice`} element={<ListInvoice/>}></Route>
                          <Route path={`device`} element={<Device/>}>
                              <Route path={``} element={<ListDevice/>}></Route>
                              <Route path={`add`} element={<AddDevice/>}/>
                              <Route path={`edit`} element={<EditDevice/>}/>
                          </Route>
                      </Route>
                  </Routes>
                  <Home></Home>
              </div>
          </div>
      </div>
  );
}

export default App;
