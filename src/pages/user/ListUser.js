import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {changeEnabled, getAllUserByAdmin} from "../../services/usersServices/UserService";
export default function ListUser() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.user.user);

    useEffect(() => {
        dispatch(getAllUserByAdmin());
    }, []);

    const handleChangeEnabled = (id) => {
        dispatch(changeEnabled({ id: id })).then(() => {
            dispatch(getAllUserByAdmin());
        });
    };

    return (
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
                    {users.map((user, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td><img src={user.img} id={`img-table`} alt={`img-room`} /></td>
                            <td>{user.username}</td>
                            <td>{user.clazz}</td>
                            <td>{user.dateOfBirth}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                            <td>{user.identificationCard}</td>
                            <td>{user.enabled ? "Hoạt động" : "Đã khóa"}</td>
                            <td>
                                <button className={user.enabled ?`btn btn-outline-danger`:`btn btn-outline-success`} type="submit" onClick={()=>{
                                    handleChangeEnabled(user.id)
                                }} >{user.enabled ? "Khóa" : "Mở Khóa"}</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
