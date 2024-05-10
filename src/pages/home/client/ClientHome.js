import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getRooms} from "../../../services/roomsServices/RoomService";
import './client.css'
import {Link} from "react-router-dom";
import {login} from "../../../services/usersServices/UserService";


export default function ClientHome() {
    const dispatch = useDispatch();
    const [visibleRooms, setVisibleRooms] = useState(6);
    const rooms = useSelector(state => {
        return  state.rooms.rooms.filter((room)=> room.maxCurrent > room.currentPresent)
    });
    const currentUser = localStorage.getItem("currentUser")
    console.log(rooms)
    useEffect(() => {
        dispatch(getRooms());
    }, []);
    const handleShowMore = () => {
        setVisibleRooms(prev => prev + 6);
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <h1>Danh sách phòng</h1>
                </div>

                <div className="container">
                    <div className="row">
                        {rooms.slice(0, visibleRooms).map(room => (
                            <div className="col-4" key={room.id}>
                                <div className="col-4" key={room.id}>
                                    <div className="col-4" key={room.id}>
                                        <div className="card">
                                            <img
                                                src={room.img}
                                                className="card-img-top" alt="..."
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{room.name}</h5>
                                                <p className="card-text">Số người: {room.currentPresent}/{room.maxCurrent}</p>
                                                <p className="card-text">Kiểu phòng: Dành cho {room.type}</p>
                                                <p className="card-text">Mô tả: {room.description}</p>
                                                <p className="card-text">Giá: {room.price}</p>
                                                <div className={'d-flex justify-content-end'}>

                                                    <Link to={currentUser !== null ? `rent/${room.id}`: "request"} className="btn btn-outline-primary">Thuê ngay!!!</Link>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {visibleRooms < rooms.length && (
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <button className="mt-2 btn btn-outline-primary" onClick={handleShowMore}>
                                    Xem thêm
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
