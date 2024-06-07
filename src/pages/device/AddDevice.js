import FireUpload from "../../components/FireUpload";
import {useState} from "react";
import a from '../../components/Logo Đại Học Giao Thông Vận Tải - UTC.svg'
import {Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {addDevices} from "../../services/devicesService/DiveceService";

export default function AddDevice() {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [url, setUrl] = useState('')
    let handleAdd = (values) => {
        values = {...values, img: url}
        dispatch(addDevices({values}))
        navigate(`/admin/device`)
    }
    return (
        <>
            <div className="row">
                <div className="d-flex justify-content-center"></div>
                <div className="offset-3 col-6">
                    <div className={`d-flex justify-content-center`}>
                        <img src={!url ? a : url} alt="room-img"
                             style={{objectFit: "cover", aspectRatio: `1`, width: 180, height: 180}}/>
                    </div>
                    <FireUpload onUpload={(onUpload) => {
                        setUrl(onUpload)
                    }}></FireUpload>
                    <Formik initialValues={{
                        name: "",
                        quantity: 0,
                        img: url
                    }} onSubmit={values => {
                        handleAdd(values)
                    }}>
                        <Form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Tên Thiết Bị</label>
                                <Field type="text" className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" name={`name`}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Số Lượng</label>
                                <Field type="number" className="form-control" id="exampleInputPassword1"
                                       name={`quantity`}/>
                            </div>
                            <button type="submit" className="btn btn-outline-success">Thêm</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}