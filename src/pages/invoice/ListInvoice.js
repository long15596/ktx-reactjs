import a from "../room/img.png";

export default function ListInvoice(){
    return(
        <>
            <h2>Danh Sách Hóa Đơn</h2>
            <div className={`justify-content-center align-items-center pt-2`}>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Mã Sinh Viên</th>
                        <th scope="col">Mã Phòng</th>
                        <th scope="col">Tiền Điện</th>
                        <th scope="col">Tiền Nước</th>
                        <th scope="col">Tiền Phòng</th>
                        <th scope="col">Dịch Vụ</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>123123123</td>
                        <td>P1</td>
                        <td>10000</td>
                        <td>10000</td>
                        <td>10000</td>
                        <td>10000</td>
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