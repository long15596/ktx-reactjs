import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {getRoomDevice} from "../../../services/roomDeviceService/roomDeviceService";
import {getOneRoom} from "../../../services/roomsServices/RoomService";

export default function Rent() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const room = useSelector(state => {
        console.log(state.rooms.room)
        return state.rooms.room
    })
    const devices = useSelector(state => {
        console.log(state.roomsDevice.roomDevices)
        return state.roomsDevice.roomDevices
    })
    const user = useSelector(state => {
        return state.user.profile
    })
    useEffect(() => {
        dispatch(getOneRoom(id))
        dispatch(getRoomDevice(id))
    }, []);

    return (
        <>
            <div className="container">
                <div className="col-lg-8 border p-3 main-section bg-white">
                    <div className="row hedding m-0 pl-3 pt-0 pb-3">
                        Thuê phòng: {room.name}
                    </div>
                    <div className="row m-0">
                        <div className="col-lg-4 left-side-product-box pb-3">
                            <img src={room.img} className="border p-3" alt={""}/>
                            <span className="sub-img">
                    <img src={room.img} className="border p-2" alt={""}/>

                </span>
                        </div>
                        <div className="col-lg-8">
                            <div className="right-side-pro-detail border p-3 m-0">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <span>Thông tin chi tiết</span>
                                        <p className="m-0 p-0">{room.name}</p>
                                    </div>
                                    <div className="col-lg-12">
                                        <p className="m-0 p-0 price-pro">Giá: {room.price} VNĐ</p>
                                        <hr className="p-0 m-0"/>
                                    </div>
                                    <div className="col-lg-12 pt-2">
                                        <span
                                            className="m-0 p-0 text-sm">Số Người đang ở hiện tại: {room.currentPresent}</span>
                                    </div>
                                    <div className="col-lg-12">
                                        <span className="m-0 p-0 text-sm">Số Người tối đa: {room.maxCurrent}</span>
                                    </div>
                                    <div className="col-lg-12">
                                        <span className="m-0 p-0 text-sm">Kiểu phòng: Dành cho {room.type}</span>
                                    </div>
                                    <div className="col-lg-12 pt-2">
                                        <h5>Mô tả</h5>
                                        <span>{room.description}</span>
                                        <br/>
                                        <span>Thiết bị: {devices.map(device => {
                                            return (device.device.name? device.device.name + ", ": "Không có thiết bị")
                                        })}</span>
                                        <hr className="m-0 pt-2 mt-2"/>
                                    </div>
                                    <div className="col-lg-12">
                                        <p className="tag-section"><strong>Tag : </strong><Link to={"#"}
                                                                                                href="">{room.type}</Link>
                                        </p>
                                    </div>
                                    <div className="col-lg-12 mt-3">
                                        <div className="row">
                                            {user.gender === room.type ?
                                            <div className="col-lg-6 pb-2">
                                                <Link className="btn btn-outline-danger w-100" to={"/"}>Không
                                                    thuê</Link>

                                            </div>
                                                    :
                                                    <Link className="btn btn-outline-danger w-100" to={"/"}>Không thể
                                                thuê phòng dành cho {room.type}</Link>
                                            }
                                            {user.gender === room.type ?
                                            <div className="col-lg-6">
                                                 <Link to={""} className="btn btn-outline-success w-100">Thuê</Link>
                                            </div>
                                                : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}