import logo from "../../../components/Logo Đại Học Giao Thông Vận Tải - UTC.svg";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import { useNavigate} from "react-router-dom";
import {getUserRoomByUserId} from "../../../services/userRoomServices/userRoomService";
import dayjs from "dayjs";
export default function ClientInvoice() {
    let currentUser = useSelector(state => state.user.currentUser)
    let {id} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let userRoom = useSelector(state => state.userRooms.userRooms)
    useEffect(() => {
        if (currentUser && currentUser.roles[0].authority === "ROLE_ADMIN") {
            dispatch(getUserRoomByUserId({id}))
        }  else  {
            dispatch(getUserRoomByUserId({id: currentUser.id}))
        }
    }, [])
    return (
        <>
            {userRoom.length && userRoom[0].user ?
                <>
                    <div className="container">
                        <div className="row d-flex">
                            <h1>Hợp Đồng Tháng {userRoom[0].startDate.split('/')[1]}</h1>
                        </div>
                        <div className={`row pt-4`}>
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-3 d-flex justify-content-center align-items-center">
                                        <img src={!userRoom[0].user.img ? logo : userRoom[0].user.img} id={`img-table`}
                                             alt={`img-room`} style={{width: '168', height: '168'}}/>
                                    </div>
                                    <div className="col-9">
                                        <div className="row">
                                            <div className="col-4">
                                                <b>Mã Sinh Viên: </b>
                                            </div>
                                            <div className="col-8">
                                                <p>{userRoom[0].user.username}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-4">
                                                <b>Số Điện Thoại: </b>
                                            </div>
                                            <div className="col-8">
                                                <p>{userRoom[0].user.phone}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-4">
                                                <b>Lớp</b>
                                            </div>
                                            <div className="col-8">
                                                <p>{userRoom[0].user.clazz}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row pt-3">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-6">
                                                <b>Số Căn Cước Công Dân:</b>
                                            </div>
                                            <div className="col-6">
                                                <p>{userRoom[0].user.identificationCard}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-6">
                                                <b>Giới Tinh:</b>
                                            </div>
                                            <div className="col-6">
                                                <p>{userRoom[0].user.gender}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-6">
                                                <b>Ngày Sinh:</b>
                                            </div>
                                            <div className="col-6">
                                                <p>{userRoom[0].user.dateOfBirth}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-6">
                                                <b>Địa Chỉ:</b>
                                            </div>
                                            <div className="col-6">
                                                <p>{userRoom[0].user.address}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="row d-flex justify-content-center align-items-center">
                                    <img src={userRoom[0].room.img} alt="room-img" style={{objectFit: "cover", aspectRatio: `1`, height: `300px`, width: `300px`}}/>
                                </div>
                                <div className="row pt-4">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-4">
                                                <b>Tên Phòng:</b>
                                            </div>
                                            <div className="col-8">
                                                <p>{userRoom[0].room.name}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-4">
                                                <b>Loại Phòng:</b>
                                            </div>
                                            <div className="col-8">
                                                <p>{userRoom[0].room.type}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-4">
                                                <b>Giá:</b>
                                            </div>
                                            <div className="col-8">
                                                <p>{userRoom[0].room.price}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-4">
                                                <b>Thời Hạn:</b>
                                            </div>
                                            <div className="col-8">
                                                <p>{userRoom[0].startDate} - {userRoom[0].endDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    <p>Chưa Thuê Phòng  </p>
                </>}

        </>
    )
}