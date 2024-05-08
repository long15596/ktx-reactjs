import a from './img.png'
import './ListRoom.css'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

export default function ListRoom() {
    let dispatch = useDispatch();
    let rooms = useSelector(state => {
        return state.rooms.rooms
    })
    return (
        <>
            <div className={`d-flex align-items-center`}>
                <h2>Danh Sách Phòng</h2>
                <Link to={`add`} className="btn btn-outline-primary m-2" type="submit">Thêm Mới</Link>
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
                    <tr>
                        <th scope="row">1</th>
                        <td><img src={a} id={`img-table`} alt={`img-room`}/></td>
                        <td>Phòng 1</td>
                        <td>10</td>
                        <td>5</td>
                        <td>Sạch vl</td>
                        <td>10000</td>
                        <td>vip pro no1</td>
                        <td>
                            <Link to={`edit`} className="btn btn-outline-success" type="submit">Sửa</Link>
                        </td>
                        <td>
                            <button className="btn btn-outline-danger" type="submit">Xóa</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}