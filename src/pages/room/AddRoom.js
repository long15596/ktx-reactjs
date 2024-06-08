import a from '../../components/Logo Đại Học Giao Thông Vận Tải - UTC.svg'
import FireUpload from "../../components/FireUpload";
import {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {editRooms, getRooms} from "../../services/roomsServices/RoomService";
import {getDevices} from "../../services/devicesService/DiveceService";
import {addRoomDevice, deleteRoomDevice, getRoomDevice} from "../../services/roomDeviceService/roomDeviceService";
import Swal from "sweetalert2";
import {addUserRoom} from "../../services/userRoomServices/userRoomService";

export default function AddRoom() {
    let {id} = useParams()
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [url, setUrl] = useState('')
    let [listDevice, setListDevice] = useState([])
    let [roomType, setRoomType] = useState('Nam')
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
    useEffect(() => {
        dispatch(getRooms())
        dispatch(getDevices())
        dispatch(getRoomDevice({id: !id ? room.id : id}))
    }, [])
    const Toast = Swal.mixin({
        toast: true, position: 'top', iconColor: 'white', customClass: {
            popup: 'colored-toast',
        }, showConfirmButton: false, timer: 1500, timerProgressBar: true,
    });
    const showError = (errorMessage) => {
        Toast.fire({
            icon: 'error', title: `<span class="error-message">${errorMessage}</span>`,
        });
    };
    const showSuccess = (successMessage) => {
        Toast.fire({
            icon: 'success', title: successMessage,
        });
    };
    let handleAdd = async (values) => {
        if (!values.name || !values.maxCurrent || !values.description || !values.price) {
            showError("Xin hãy điền đầy đủ thông tin")
        } else {
            values = {...values, img: !url ? values.img : url, type: roomType}
            await dispatch(editRooms({id: values.id, values})).then((i)=>{
                if (i.payload === "Room name existed"){
                    showError("Tên phòng đã tồn tại")
                }else {
                    showSuccess("Thành công")
                    setTimeout(async () => {
                        await navigate(`/admin/room`)
                    }, 1500)
                }
            })
            await dispatch(deleteRoomDevice({id: values.id}))
            if (listDevice) {
                for (let i = 0; i < listDevice.length; i++) {
                    const item = listDevice[i];
                    let data = {
                        room: {
                            id: values.id
                        },
                        device: {
                            id: item
                        },
                    }
                    await dispatch(addRoomDevice({values: data}));
                }
            }

        }
    }
    return (
        <>
            <Formik initialValues={room} onSubmit={values => {
                handleAdd(values)
            }} enableReinitialize={true}>
                <Form>
                    <div className="row justify-content-center pt-2" style={{marginTop: 100}}>
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
                                    <select className="custom-select" id="inputGroupSelect01" onChange={(event) => {
                                        setRoomType(event.target.value)
                                    }}>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
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
                                                    <>
                                                        <div className="col-6">
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
                                                        </div>
                                                    </>
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
                                {
                                    room &&
                                    <img src={!url ? !room.img ? a : room.img : url} alt="room-img"
                                         style={{objectFit: "cover", aspectRatio: `1`, width: 200, height: 200}}/>
                                }
                            </div>
                            <FireUpload onUpload={(uploadUrl) => {
                                console.log(uploadUrl)
                                setUrl(uploadUrl)
                            }}></FireUpload>
                            <div className="form-group row pt-2">
                                <div className="col-sm-10">
                                    <button type="submit" className="btn btn-primary">Xác Nhận</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
}