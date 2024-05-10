import a from "../../room/img.png";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getUserRoomByUserId} from "../../../services/userRoomsService/userRoomService";

export default function ClientInvoice() {
    let {id} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let userRoom = useSelector(state => state.userRooms.userRooms)
    useEffect(() => {
        dispatch(getUserRoomByUserId({id}))
    }, [])
    console.log(userRoom)
    return (
        <>
            {userRoom ?
                <>
                    <div className="container">
                        <h2>Chi Tiết Hóa Đơn</h2>
                        <div className={`row justify-content-center align-items-center pt-2`}>
                            <div className="col-6">

                            </div>
                            <div className="col-6">

                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    <p>Tải Dữ Liệu </p>
                </>}

        </>
    )
}