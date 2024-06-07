import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import logo from './Logo Đại Học Giao Thông Vận Tải - UTC.svg';
import Login from '../pages/login/Login';
import {useDispatch, useSelector} from 'react-redux';
import {logOut, setCheckShow} from '../services/usersServices/UserService';

export default function NavBar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const checkShow = useSelector(state => state.user.checkShow);
    const currentUser = useSelector(state => state.user.currentUser);
    const handleLoginClick = () => {
        dispatch(setCheckShow(true));
    };
    const handleLogoutClick = () => {
        localStorage.clear();
        dispatch(logOut());
        navigate('/')
        window.location.reload();
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#e3f2fd'}}>
                <Link to={currentUser && currentUser.roles[0].authority === "ROLE_ADMIN" ? "admin" : ''}
                      className="navbar-brand">
                    <img src={logo} width="50" height="50" className="d-inline-block align-top" alt=""/>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {currentUser &&
                        currentUser.roles[0].authority === 'ROLE_ADMIN' ? (
                            <>
                                <li className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}>
                                    <Link className="nav-link" to={`/admin`}>Sinh Viên<span
                                        className="sr-only">(current)</span></Link>
                                </li>
                                <li className={`nav-item ${location.pathname === '/admin/room' ? 'active' : ''}`}>
                                    <Link className="nav-link" to={`/admin/room`}>Phòng</Link></li>
                                <li className={`nav-item ${location.pathname === '/admin/invoice' ? 'active' : ''}`}>
                                    <Link className="nav-link" to={`/admin/invoice`}>Hóa Đơn</Link></li>
                                <li className={`nav-item ${location.pathname === '/admin/device' ? 'active' : ''}`}>
                                    <Link className="nav-link" to={`/admin/device`}>Thiết Bị</Link></li>
                            </>
                        ) : (
                            <>
                                <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                                    <Link className="nav-link" to={``}>Trang chủ<span
                                        className="sr-only">(current)</span></Link>
                                </li>
                                {currentUser &&
                                currentUser.roles[0].authority === 'ROLE_USER' ? (
                                    <>
                                        <li className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
                                            <Link className="nav-link" to={`profile`}>Thông tin cá nhân</Link>
                                        </li>
                                        <li className={`nav-item ${location.pathname === '/invoice' ? 'active' : ''}`}>
                                            <Link className="nav-link" to={`invoice`}>Hợp Đồng</Link>
                                        </li>
                                    </>
                                ) : (
                                    <li className={`nav-item ${location.pathname === '/request' ? 'active' : ''}`}>
                                        <Link className="nav-link" to={`request`}>Yêu cầu thuê phòng</Link>
                                    </li>
                                )}
                            </>
                        )}
                    </ul>

                    {currentUser ? (
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit"
                                onClick={handleLogoutClick}>Đăng Xuất</button>
                    ) : (
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit"
                                onClick={handleLoginClick}>Đăng Nhập</button>
                    )}
                </div>
            </nav>
            {checkShow && <Login/>}
        </>
    );
}
