import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeEnabled, getAllUserByAdmin} from "../../services/usersServices/UserService";
import './listUser.css';
import {Link} from "react-router-dom";

export default function ListUser() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.user.user);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(6);
    console.log(users)
    useEffect(() => {
        dispatch(getAllUserByAdmin());
    }, []);

    const handleChangeEnabled = (id) => {
        dispatch(changeEnabled({id: id})).then(() => {
            dispatch(getAllUserByAdmin());
        });
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPageCount = Math.ceil(users.length / usersPerPage);

    const paginate = pageNumber => setCurrentPage(pageNumber);

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
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentUsers.map((user, index) => (
                        <tr key={index}>
                            <th scope="row">{user.id}</th>
                            <td><img src={user.img} id={`img-table`} alt={`img-room`}/></td>
                            <td>{user.username}</td>
                            <td>{user.clazz}</td>
                            <td>{user.dateOfBirth}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                            <td>{user.identificationCard}</td>
                            <td>{user.enabled ? "Hoạt động" : "Đã khóa"}</td>
                            <td>
                                <button className={user.enabled ? `btn btn-outline-danger` : `btn btn-outline-success`}
                                        type="submit" onClick={() => {
                                    handleChangeEnabled(user.id)
                                }}>{user.enabled ? "Khóa" : "Mở Khóa"}</button>
                            </td>
                            <td>
                                <Link to={`user/${user.id}`} className={`btn btn-outline-primary`}>Thông Tin</Link>
                            </td>
                        </tr>
                    ))}
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
    );
}
