import {Link} from "react-router-dom";
import a from "../room/img.png";

export default function ListUser() {
    return(
        <>
            <h2>Danh Sách Sinh Viên</h2>
            <div className={`justify-content-center align-items-center pt-2`}>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Mã Sinh Viên</th>
                        <th scope="col">Lớp</th>
                        <th scope="col">Ngày Sinh</th>
                        <th scope="col">Số Điện Thoại</th>
                        <th scope="col">Địa Chỉ</th>
                        <th scope="col">Căn Cước Công Dân</th>
                        <th scope="col">Trạng Thái</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td><img src={a} id={`img-table`} alt={`img-room`}/></td>
                        <td>123123123</td>
                        <td>10</td>
                        <td>01/01</td>
                        <td>10000</td>
                        <td>Abc</td>
                        <td>019224</td>
                        <td>Đúp</td>
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