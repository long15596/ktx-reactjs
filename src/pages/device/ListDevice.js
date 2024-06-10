import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getDevices} from "../../services/devicesService/DiveceService";

export default function ListDevice(){
    let dispatch = useDispatch()
    let devices = useSelector(state => {
        return state.devices.devices
    })
    useEffect(() => {
        dispatch(getDevices())
    },[])
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
                    </tr>
                    </thead>
                    <tbody>
                    {
                        devices.map((device, index) => (
                            <>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td><img src={device.img} id={`img-table`} alt={`img-devices`}/></td>
                                    <td>{device.name}</td>
                                    <td>
                                        <Link to={`edit/${device.id}`} className="btn btn-outline-success">Sửa</Link>
                                    </td>
                                </tr>
                            </>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}