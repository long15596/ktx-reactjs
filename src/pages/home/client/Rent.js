import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getRoomDevice} from "../../../services/roomDeviceService/roomDeviceService";
import {getOneRoom} from "../../../services/roomsServices/RoomService";
import {addUserRoom, getUserRoom, getUserRoomByRoomId} from "../../../services/userRoomServices/userRoomService";
import Swal from "sweetalert2";
import {getProfile } from "../../../services/usersServices/UserService";

const currentDate = new Date();

function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function nextMonthSameDayFormatted(currentDate) {
    let endDate
    if (currentDate.getMonth() >= 8) {
        endDate = new Date(currentDate.getFullYear() + 1, 1, 0)
    } else {
        endDate = new Date(currentDate.getFullYear(), 6, 31)
    }
    return formatDate(endDate);
}

const currentDateFormatted = formatDate(currentDate);
const nextMonthSameDay = nextMonthSameDayFormatted(currentDate);

export default function Rent() {
    const Toast = Swal.mixin({
        toast: true, position: 'top', iconColor: 'white', customClass: {
            popup: 'colored-toast',
        }, showConfirmButton: false, timer: 1500, timerProgressBar: true,
    });
    const showError = (errorMessage) => {
        Toast.fire({
            icon: 'error', title: `<span class="error-message">${errorMessage}</span>`,
        });
    };
    const showSuccess = (successMessage) => {
        Toast.fire({
            icon: 'success', title: successMessage,
        });
    };
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {id} = useParams();
    const room = useSelector(state => {
        return state.rooms.room
    })
    const roomDevices = useSelector(state => {
        let list = state.roomDevices.roomDevices;
        const uniqueList = list.filter((item, index, self) =>
                index === self.findIndex((t) => (
                    t.id === item.id
                ))
        );
        return uniqueList;
    })
    const currentUser = useSelector(state => {
        return state.user.currentUser
    })
    const user = useSelector(state => {
        return state.user.profile
    })
    const userRoom = useSelector(state => {
        return state.userRooms.userRoomsAll
    })
    let userInRoom = useSelector(state => state.userRooms.userRoomsByRoom)
    useEffect(() => {
        dispatch(getProfile(currentUser.id))
        dispatch(getOneRoom(id))
        dispatch(getRoomDevice({id}))
        dispatch(getUserRoom())
        dispatch(getUserRoomByRoomId({id: id}))
    }, []);

    function handleRent() {
        const values = {user, room, startDate: currentDateFormatted, endDate: nextMonthSameDay}
        let list = userRoom
        let roomCheck = {}
        let check = false
        if (user && list.length > 0 && list[0].user) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].user.id === user.id) {
                    check = true;
                    roomCheck = list[i].room;
                }
            }
        }
        if (check === true) {
            showError(`Bạn đã thuê phòng ${roomCheck.name} rồi. Đợi tháng sau nhé`)
        } else {
            showSuccess("Bạn thuê thành công!")
            setTimeout(async () => {
                await dispatch(addUserRoom({values}))
                await navigate(`/`);
                await window.location.reload()
            }, 1500)
        }
    }

    return (
        <>
            <div className="container">
                <div className="col-lg-10 border p-3 main-section bg-white">
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
                                        <span>Số Người đang ở hiện tại: {room.currentPresent}</span>
                                        <br/>
                                        {
                                            userInRoom.length > 0 &&
                                            <>
                                                {
                                                    userInRoom.map((item, index) => (
                                                        <>
                                                            <span>{index + 1}. {item.user.name}</span>
                                                            <br/>
                                                        </>
                                                    ))
                                                }
                                            </>
                                        }
                                    </div>
                                    <div className="col-lg-12 pt-1">
                                        <span className="m-0 p-0 text-sm">Số Người tối đa: {room.maxCurrent}</span>
                                    </div>
                                    <div className="col-lg-12 pt-2">
                                        <div>
                                            <h5>Mô tả</h5>
                                            <span>{room.description}</span>
                                            <br/>
                                        </div>
                                        <div className={`pt-2`}>
                                            <h5>Thiết bị</h5>
                                            {
                                                roomDevices ?
                                                    <>
                                                        {
                                                            roomDevices.map((device, index) => (
                                                                <>
                                                                    <span>{index + 1}.{device.device.name}</span>
                                                                    <br/>
                                                                </>
                                                            ))
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        <span>Không có thiết bị</span>
                                                    </>
                                            }
                                            <hr className="m-0 pt-2 mt-2"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <p className="tag-section"><strong>Loại Phòng : </strong><Link to={"#"}
                                                                                                       href="">{room.type}</Link>
                                        </p>
                                    </div>
                                    <div className="col-lg-12 mt-3">
                                        <div className="row">
                                            {user.gender === room.type ? <div className="col-lg-6 pb-2">
                                                <Link className="btn btn-outline-danger w-100" to={"/"}>Không
                                                    thuê</Link>

                                            </div> : <Link className="btn btn-outline-danger w-100 ml-4 mr-4" to={"/"}>Không
                                                thể
                                                thuê phòng dành cho {room.type}</Link>}
                                            {user.gender === room.type ? <div className="col-lg-6">
                                                <button className="btn btn-outline-success w-100"
                                                        onClick={handleRent}
                                                >Thuê
                                                </button>
                                            </div> : ""}
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