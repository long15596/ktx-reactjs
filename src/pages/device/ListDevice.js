import {Link} from "react-router-dom";
import a from "../room/img.png";

export default function ListDevice(){
    return(
        <>
            <div className={`d-flex align-items-center`}>
                <h2>Danh Sách Thiết Bị</h2>
                <Link to={`add`} className="btn btn-outline-primary m-2" type="submit">Thêm Mới</Link>
            </div>
            <div className={`justify-content-center align-items-center pt-2`}>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Tên Thiết Bị</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td><img src={a} id={`img-table`} alt={`img-room`}/></td>
                        <td>Đeèn</td>
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