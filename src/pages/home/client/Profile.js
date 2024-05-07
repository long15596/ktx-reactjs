import './client.css'
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {editProfile, getProfile} from "../../../services/usersServices/UserService";
import {FormSelect} from "react-bootstrap";
import {useParams} from "react-router";
export default function Profile() {
    const currentUser = useSelector(state => {
        return state.user.currentUser
    })
    const dispatch = useDispatch();
    const user = useSelector(state => {
        console.log(state.user.profile)
        return state.user.profile
    })
    useEffect(() => {
        dispatch(getProfile(currentUser.id))
    }, []);
    const handleEdit = async (values)=>{
      await dispatch(editProfile({id:user.id, values}))
    }
    return (
        <>
            <div className="container">
                <Formik
                    enableReinitialize={true}
                    initialValues={user}
                    onSubmit={(values) => {
                        handleEdit(values)
                    }}
                >
                    <Form className={"mt-3"}>
                        <div className="row">
                            <div className="col-md-9">
                                <div className="form-group">
                                    <label htmlFor="inputMSV">Mã Sinh Viên</label>
                                    <Field type="text" name={"username"} className="form-control" id="inputMSV"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputAddress">Địa Chỉ</label>
                                    <Field type="text" name={"address"} className="form-control" id="inputAddress" placeholder="Hà Nội..."/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputBirthDay">Ngày Sinh</label>
                                    <Field type="date" name={"dateOfBirth"} className="form-control" id="inputBirthDay"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputIdentityID">Số CCCD</label>
                                    <Field type="text" name={"identificationCard"} className="form-control" id="inputIdentityID"
                                           placeholder="00123456789..."/>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPhone">Số điện thoại</label>
                                        <Field type="text" name={"phone"} className="form-control" id="inputPhone"/>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputGender"> Giới tính</label>
                                        <FormSelect name={"gender"} id="inputGender" className="form-control">
                                            <option selected>Lựa chọn</option>
                                            <option>Nam</option>
                                            <option>Nữ</option>
                                            <option>Khác...</option>
                                        </FormSelect>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label htmlFor="inputClazz">Lớp?</label>
                                        <Field type="text" name={"clazz"} className="form-control" id="inputClazz"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 avatar-edit text-center">
                                <img src={user.img} className={"avatar img-circle img-thumbnail"} alt="avatar"/>
                                <h6>Upload a different photo...</h6>
                                <Field type="text" name={"img"} className="text-center center-block file-upload"/>
                            </div>

                        </div>

                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Sửa</button>
                    </Form>
                </Formik>

            </div>
        </>
    )
}