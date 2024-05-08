import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {editDevice, getDevices} from "../../services/devicesService/DiveceService";
import a from "../room/img.png";
import FireUpload from "../../components/FireUpload";
import {Field, Form, Formik} from "formik";

export default function EditDevice() {
    let {id} = useParams()
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let device = useSelector(state => {
        return state.devices.devices.find(item => item.id == id)
    })
    console.log(device)
    useEffect(() => {
        dispatch(getDevices())
    },[])
    let [url, setUrl] = useState('')
    let handleEdit = (values) => {
        values = {...values, img: url}
        dispatch(editDevice({id ,values}))
        navigate(`/device`)
    }
    return(
        <>
            {
                !device ?
                    <>
                        <p>Tải Dữ Liệu </p>
                    </>
                    :
                    <>
                        <div className="row">
                            <div className="d-flex justify-content-center"></div>
                            <div className="offset-3 col-6">
                                <div className={`d-flex justify-content-center`}>
                                    <img src={!url ? device.img : url} alt="room-img"
                                         style={{objectFit: "cover", aspectRatio: `1`}}/>
                                </div>
                                <FireUpload onUpload={(onUpload) => {
                                    setUrl(onUpload)
                                }}></FireUpload>
                                <Formik initialValues={device} onSubmit={values => {
                                    handleEdit(values)
                                }} enableReinitialize={true}>
                                    <Form>
                                        <div className="input-group mb-3">
                                            <Field type="text" className="form-control" placeholder="Tên Thiết Bị"
                                                   aria-label="Recipient's username" aria-describedby="button-addon2"
                                                   name={`name`}/>
                                            <div className="input-group-append">
                                                <button className="btn btn-outline-success" id="button-addon2">Thêm
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}