import a from "../../room/img.png";

export default function ClientInvoice(){
    return(
        <>
            <div className="container">
                <h2>Danh Sách Hóa Đơn</h2>
                <div className={`justify-content-center align-items-center pt-2`}>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Số phòng</th>
                            <th scope="col">Số điện</th>
                            <th scope="col">Số nước</th>
                            <th scope="col">Dịch vụ</th>
                            <th scope="col">Giá phòng</th>
                            <th scope="col">Tổng cộng</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>123123123</td>
                            <td>40</td>
                            <td>10</td>
                            <td>1000</td>
                            <td>5000</td>
                            <td>1 tỷ</td>
                            <td>
                                <button className="btn btn-outline-primary">Chi tiết</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}