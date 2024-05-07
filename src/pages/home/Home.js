import './Home.css'
import {Outlet, Route, Routes} from "react-router";
import {Navbar} from "react-bootstrap";

export default function Home() {
return(
    <>
    <div className="container-fluid">
        <Navbar></Navbar>
    </div>
        <div className="container-fluid">
            <Outlet></Outlet>
        </div>
    </>
)


}