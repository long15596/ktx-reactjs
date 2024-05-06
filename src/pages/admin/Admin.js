import {Outlet} from "react-router";
export default function Admin() {
    return(
        <>
            <div className="row pt-4">
                <div className="offset-1 col-10">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}