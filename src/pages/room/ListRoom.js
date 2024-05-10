import logo from '../../components/Logo Đại Học Giao Thông Vận Tải - UTC.svg'
import './ListRoom.css'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addRooms, getRooms} from "../../services/roomsServices/RoomService";
import {useEffect, useState} from "react";

export default function ListRoom() {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let rooms = useSelector(state => {
        return  state.rooms.rooms
    })
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(6);
    useEffect(() => {
        dispatch(getRooms())
    }, []);
    let handleCreateBill = (id) => {
        navigate(`/admin/room/create-bill/${id}`)
    }
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);
    const totalPageCount = Math.ceil(rooms.length / roomsPerPage);
    const paginate = pageNumber => setCurrentPage(pageNumber);
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
                        currentRooms.map((room, index) => (
                            <tr key={index}>
                                <th scope="row">{indexOfFirstRoom + index + 1}</th>
                                <td><img src={room.img ? room.img : logo} id={`img-table`} alt={`img-room`}/></td>
                                <td>{room.name}</td>
                                <td>{room.maxCurrent}</td>
                                <td>{room.currentPresent}</td>
                                <td>{room.description}</td>
                                <td>{room.price}</td>
                                <td>{room.type}</td>
                                <td>
                                    <Link to={`add/${room.id}`} className="btn btn-outline-success"
                                          type="submit">Sửa</Link>
                                </td>
                                {
                                    room.currentPresent !== 0 ? <td>
                                            <button className="btn btn-outline-primary" type="submit" onClick={() => {
                                                handleCreateBill(room.id)
                                            }}>Tạo hóa đơn
                                            </button>
                                        </td> :
                                        <td></td>
                                }
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <div className="pagination">
                    {currentPage > 1 && (
                        <button className="page-link" onClick={() => paginate(currentPage - 1)}>{'<'}</button>
                    )}
                    <span className="current-page" style={{width: 30, height: 30}}>{currentPage}</span>
                    {currentPage < totalPageCount && (
                        <button className="page-link" onClick={() => paginate(currentPage + 1)}>{'>'}</button>
                    )}
                </div>
            </div>
        </>
    )
}
