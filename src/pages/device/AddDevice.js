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
    return(
        <>
            <div className="row">
                <div className="d-flex justify-content-center"></div>
                <div className="offset-3 col-6">
                    <div className={`d-flex justify-content-center`}>
                        <img src={!url ? a : url} alt="room-img"
                             style={{objectFit: "cover", aspectRatio: `1`, width:640,height:640}}/>
                    </div>
                    <FireUpload onUpload={(onUpload) => {
                        setUrl(onUpload)
                    }}></FireUpload>
                    <Formik initialValues={{
                        name: "",
                        img: url
                    }} onSubmit={values => {
                        handleAdd(values)
                    }}>
                        <Form>
                            <div className="input-group mb-3">
                                <Field type="text" className="form-control" placeholder="Tên Thiết Bị" aria-label="Recipient's username" aria-describedby="button-addon2" name={`name`}/>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-success" id="button-addon2">Thêm</button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}