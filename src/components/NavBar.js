import { Link, useLocation } from "react-router-dom";
import logo from './Logo Đại Học Giao Thông Vận Tải - UTC.svg';
export default function NavBar() {
    const location = useLocation();

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}>
                <Link to={``} className="navbar-brand">
                    <img src={logo} width="50" height="50" className="d-inline-block align-top" alt="" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/*<ul className="navbar-nav mr-auto">*/}
                    {/*    <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>*/}
                    {/*        <Link className="nav-link" to={``}>Trang chủ<span className="sr-only">(current)</span></Link>*/}
                    {/*    </li>*/}
                    {/*    <li className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>*/}
                    {/*        <Link className="nav-link" to={`profile`}>Thông tin cá nhân</Link>*/}
                    {/*    </li>*/}
                    {/*    <li className={`nav-item ${location.pathname === '/invoice' ? 'active' : ''}`}>*/}
                    {/*        <Link className="nav-link" to={`invoice`}>Hóa Đơn</Link>*/}
                    {/*    </li>*/}
                    {/*    <li className={`nav-item ${location.pathname === '/request' ? 'active' : ''}`}>*/}
                    {/*        <Link className="nav-link" to={`#`}>Yêu cầu thuê phòng</Link>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to={``}>Sinh Viên<span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item"><Link className="nav-link" to={`room`}>Phòng</Link></li>
                        <li className="nav-item"><Link className="nav-link" to={`invoice`}>Hóa Đơn</Link></li>
                        <li className="nav-item"><Link className="nav-link" to={`device`}>Thiết Bị</Link></li>
                    </ul>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Đăng Nhập</button>
                </div>
            </nav>
        </>
    )
}