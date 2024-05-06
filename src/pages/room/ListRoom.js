export default function ListRoom(){
    return(
        <>
            <h2>Danh Sách Phòng</h2>
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
                    <td><img/></td>
                    <td>Phòng 1</td>
                    <td>10</td>
                    <td>5</td>
                    <td>Sạch vl</td>
                    <td>10000</td>
                    <td>vip pro no1</td>
                    <td>
                        <button className="btn btn-outline-success" type="submit">Sửa</button>
                    </td>
                    <td>
                        <button className="btn btn-outline-danger" type="submit">Xóa</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    )
}