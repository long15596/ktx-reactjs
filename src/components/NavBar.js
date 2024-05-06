import {Link} from "react-router-dom";

export default function NavBar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to={`room`}>Phòng Trọ Ngọt Nước</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to={`room`}>Sinh Viên<span className="sr-only">(current)</span></Link>
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