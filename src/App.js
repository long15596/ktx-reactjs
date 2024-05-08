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
import Room from "./pages/room/Room";
import Device from "./pages/device/Device";
import AddDevice from "./pages/device/AddDevice";
import EditDevice from "./pages/device/EditDevice";
import ClientHome from "./pages/home/client/ClientHome";
import Profile from "./pages/home/client/Profile";
import ClientInvoice from "./pages/home/client/ClientInvoice";
import Request from "./pages/home/client/Request";
import Rent from "./pages/home/client/Rent";
import CreateBillRoom from "./pages/room/CreateBillRoom";

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
                        <Route path={``} element={<Home/>}>
                            <Route path={``} element={<ClientHome/>}></Route>
                            <Route path={`profile`} element={<Profile/>}></Route>
                            <Route path={`invoice`} element={<ClientInvoice/>}></Route>
                            <Route path={`request`} element={<Request/>}></Route>
                            <Route path={`rent/:id`} element={<Rent/>}></Route>
                        </Route>
                        <Route path={`admin`} element={<Admin/>}>
                            <Route path={``} element={<ListUser/>}/>
                            <Route path={`room`} element={<Room/>}>
                                <Route path={``} element={<ListRoom/>}/>
                                <Route path={`add/:id`} element={<AddRoom/>}/>
                                <Route path={`create-bill/:id`} element={<CreateBillRoom/>}/>
                            </Route>
                            <Route path={`invoice`} element={<ListInvoice/>}/>
                            <Route path={`device`} element={<Device/>}>
                                <Route path={``} element={<ListDevice/>}/>
                                <Route path={`add`} element={<AddDevice/>}/>
                                <Route path={`edit/:id`} element={<EditDevice/>}/>
                            </Route>
                        </Route>
                    </Routes>
                </div>
            </div>
        </div>);
}

export default App;
