import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getRooms} from "../../../services/roomsServices/RoomService";

export default function ClientHome() {
    const dispatch = useDispatch()
    const rooms = useSelector(state => {
        console.log(state.rooms.rooms)
        return state.rooms.rooms
    })
    useEffect(() => {
        dispatch(getRooms())
    }, []);

    return (
        <>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <h1>Danh sách phòng</h1>
                </div>

                <div className="container">
                    <div className="row">
                        {rooms.map(room => (
                            <div className="col-4" key={room.id}>
                                <div className="card">
                                    <img
                                        src={room.img}
                                        className="card-img-top" alt="..."
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{room.name}</h5>
                                        <p className="card-text">Số người: {room.currentPresent}/{room.maxCurrent}</p>
                                        <p className="card-text">Kiểu: {room.type}</p>
                                        <p className="card-text">Mô tả: {room.description}</p>
                                        <p className="card-text">Giá: {room.price}</p>

                                        <div className={'d-flex justify-content-end'}>
                                            <a href="#" className="btn btn-outline-primary">Thuê ngay!!!</a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}