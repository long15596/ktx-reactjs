import a from './img.png'
import './ListRoom.css'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addRooms} from "../../services/roomsServices/RoomService";

export default function ListRoom() {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let rooms = useSelector(state => {
        return state.rooms.rooms
    })
    return (
        <>
            <div className={`d-flex align-items-center`}>
                <h2>Danh Sách Phòng</h2>
                <button className="btn btn-outline-primary m-2" onClick={() => {
                    let values = {}
                    dispatch(addRooms({values})).then(data => {
                        navigate(`/admin/room/add/${data.payload.id}`)
                    })
                }}>Thêm Mới
                </button>
            </div>
            <div className={`justify-content-center align-items-center pt-2`}>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Tên Phòng</th>
                        <th scope="col">Số Người</th>
                        <th scope="col">Đã Ở</th>
                        <th scope="col">Mô Tả</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Loại Phòng</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        rooms.map((room, index) => (
                            <>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td><img src={room.img ? room.img : a} id={`img-table`} alt={`img-room`}/></td>
                                    <td>{room.name}</td>
                                    <td>{room.maxCurrent}</td>
                                    <td>{room.currentPresent}</td>
                                    <td>{room.description}</td>
                                    <td>{room.price}</td>
                                    <td>{room.type}</td>
                                    <td>
                                        <Link to={`add/${room.id}`} className="btn btn-outline-success" type="submit">Sửa</Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-danger" type="submit">Tạo hóa đơn</button>
                                    </td>
                                </tr>
                            </>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}