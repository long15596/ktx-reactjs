import {Outlet} from "react-router";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteRoom, getRooms} from "../../services/roomsServices/RoomService";
export default function Admin() {
    let location = useLocation()
    let dispatch = useDispatch()
    let newRoom  = useSelector(state => state.rooms.newRoom)
    useEffect(() => {
        dispatch(getRooms())
        if (location.pathname !== `/admin/room/add/${newRoom.id}`) {
            if (!newRoom.name && !newRoom.maxCurrent && !newRoom.description && !newRoom.type && !newRoom.price) {
                dispatch(deleteRoom({ id: newRoom.id }));
            }
        }
    }, [location.pathname])
    console.log(newRoom)
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