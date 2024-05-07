import './Home.css'
import {Route, Routes} from "react-router";
import ClientHome from "./client/ClientHome";
import Profile from "./client/Profile";
import ClientInvoice from "./client/ClientInvoice";
import Request from "./client/Request";

export default function Home() {
return(
    <>
    <Routes>
        <Route path={``} element={<ClientHome/>}></Route>
        <Route path={`profile`} element={<Profile/>}></Route>
        <Route path={`invoice`} element={<ClientInvoice/>}></Route>
        <Route path={`request`} element={<Request/>}></Route>
    </Routes>
    </>
)


}