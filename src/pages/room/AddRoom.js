import a from './img.png'
import FireUpload from "../../components/FireUpload";
import {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {editRooms, getRooms} from "../../services/roomsServices/RoomService";
import {getDevices} from "../../services/devicesService/DiveceService";
import {addRoomDevice, getRoomDevice} from "../../services/roomDeviceService/roomDeviceService";

export default function AddRoom() {
    let {id} = useParams()
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [url, setUrl] = useState('')
    let [listDevice, setListDevice] = useState([])
    let [showDevice, setShowDevice] = useState(false)
    let room = useSelector(state => {
        if (id) {
            return state.rooms.rooms.find(room => room.id == id)
        } else {
            return state.rooms.newRoom
        }
    })
    let devices = useSelector(state => {
        return state.devices.devices
    })
    let roomDevices = useSelector(state => {
        return state.roomDevices.roomDevices
    })
    console.log(roomDevices)
    useEffect(() => {
        dispatch(getRooms())
        dispatch(getDevices())
        dispatch(getRoomDevice({id: !id ? room.id : id}))
    }, [])
    let handleAdd = (values) => {
        if (!values.name || !values.maxCurrent || !values.description || !values.type || !values.price) {
            alert('Xin hãy điền đầy đủ thông tin')
            return;
        }
        values = {...values, img: url}
        dispatch(editRooms({id: values.id, values}))
        if (listDevice) {
            for (const item of listDevice) {
                let data = {
                    room: {
                        id: values.id
                    },
                    device: {
                        id: item
                    }
                }
                dispatch(addRoomDevice({values: data}))
            }
        }
        navigate(`/admin/room`)
    }
    return (
        <>
            <Formik initialValues={room} onSubmit={values => {
                handleAdd(values)
            }} enableReinitialize={true}>
                <Form>
                    <h2>Thêm Phòng Mới</h2>
                    <div className="row justify-content-center pt-2">
                        <div className="col-6">
                            <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Tên Phòng</label>
                                <div className="col-sm-10">
                                    <Field type="text" className="form-control" name={`name`}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Số Người</label>
                                <div className="col-sm-10">
                                    <Field type="number" className="form-control" name={`maxCurrent`}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Mô Tả</label>
                                <div className="col-sm-10">
                                    <Field type="text" className="form-control" name={`description`}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Loại Phòng</label>
                                <div className="col-sm-10">
                                    <Field type="text" className="form-control" name={`type`}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Giá</label>
                                <div className="col-sm-10">
                                    <Field type="number" className="form-control" name={`price`}/>
                                </div>
                            </div>
                            <fieldset className="form-group row">
                                <legend className="col-form-label col-sm-2 float-sm-left pt-0">Thiết Bị</legend>
                                <div className="col-sm-10">
                                    <div className="form-check">
                                        {
                                            devices ?
                                                devices.map(device => (
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox"
                                                               value={device.id}
                                                               id="defaultCheck1"
                                                               onChange={(event) => {
                                                                   event.target.checked ?
                                                                       setListDevice([...listDevice, device.id])
                                                                       :
                                                                       setListDevice(listDevice.filter(id => id != device.id))
                                                               }}/>
                                                        <label className="form-check-label"
                                                               htmlFor={`checkbox-${device.id}`}>
                                                            {device.name}
                                                        </label>
                                                    </div>
                                                ))
                                                :
                                                <>
                                                    <p>Tải Dữ Liệu </p>
                                                </>
                                        }
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div className="col-6">
                            <div className={`d-flex justify-content-center`}>
                                <img src={!url ? a : url} alt="room-img"
                                     style={{objectFit: "cover", aspectRatio: `1`}}/>
                            </div>
                            <FireUpload onUpload={(uploadUrl) => {
                                console.log(uploadUrl)
                                setUrl(uploadUrl)
                            }}></FireUpload>
                            <div className="form-group row pt-2">
                                <div className="col-sm-10">
                                    <button type="submit" className="btn btn-primary">Thêm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
}