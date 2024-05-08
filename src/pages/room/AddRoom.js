import a from './img.png'
import FireUpload from "../../components/FireUpload";
import {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {getDevices} from "../../services/devicesService/DiveceService";

export default function AddRoom() {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [url, setUrl] = useState('')
    let devices = useSelector(state => {
        return state.devices.devices
    })
    console.log(devices)
    useEffect(() => {
        dispatch(getDevices())
    }, [])
    let handleAdd = (values) => {

    }
    return (
        <>
            <Formik initialValues={{
                name: "",
                maxCurrent: "",
                description: "",
                price: "",
                type: "",
            }} onSubmit={values => {
                handleAdd(values)
            }}>
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
                                                    <input className="form-check-input" type="checkbox" value={device.id}
                                                           id="defaultCheck1"/>
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
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