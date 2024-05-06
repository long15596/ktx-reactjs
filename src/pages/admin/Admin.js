import NavBar from "../../components/NavBar";
import {Route, Routes} from "react-router";
import ListRoom from "../room/ListRoom";
import ListUser from "../user/ListUser";
import ListInvoice from "../invoice/ListInvoice";
import ListDevice from "../device/ListDevice";

export default function Admin() {
    return(
        <>
            <Routes>
                <Route path={`user`} element={<ListUser/>}></Route>
                <Route path={`room`} element={<ListRoom/>}></Route>
                <Route path={`invoice`} element={<ListInvoice/>}></Route>
                <Route path={`device`} element={<ListDevice/>}></Route>
            </Routes>
        </>
    )
}