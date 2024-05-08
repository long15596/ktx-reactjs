import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {addProfile, editProfile, setCheckShow,} from "../../../services/usersServices/UserService";
import {Field, Form, Formik} from "formik";
import {FormSelect} from "react-bootstrap";
import a from "../../room/img.png";
import FireUpload from "../../../components/FireUpload";
import Swal from "sweetalert2";

export default function Request() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [url, setUrl] = useState('')
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast',
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    });

    const showError = (errorMessage) => {
        Toast.fire({
            icon: 'error',
            title: `<span class="error-message">${errorMessage}</span>`,
        });
    };

    const showSuccess = (successMessage) => {
        Toast.fire({
            icon: 'success',
            title: successMessage,
        });
    };

    const handleAdd = async (values) => {
        values = await {...values, img: url}

        if (values.username === '') {
            showError('Không được để trống mã sinh viên');
        } else if (values.password === '') {
            showError('Không được để trống mật khẩu');
        } else {

            await dispatch(addProfile({values})).then(data=>{
                if(data.payload=== "Username existed"){
                    showError('Tài khoản đã tồn tại');
                }
                else {
                    showSuccess('Đăng ký thành công');
                    setTimeout(async () => {
                        navigate(`/`);
                    }, 1500);
                }
            })

        }
    }

    return (
        <>
            <div className="container">
                <Formik

                    onSubmit={(values) => {
                        handleAdd(values)
                    }}
                    initialValues={{
                        username: "",
                        password: "",
                        dateOfBirth: '',
                        identificationCard: '',
                        address: '',
                        clazz: '',
                        phone: '',
                        gender: '',
                        img: url
                    }}>
                    <Form className={"mt-3"}>
                        <div className="row">
                            <div className="col-md-9">
                                <div className="form-group">
                                    <label htmlFor="inputMSV">Mã Sinh Viên</label>
                                    <Field type="text" name={"username"} className="form-control" id="inputMSV"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputpassword">Mật Khẩu</label>
                                    <Field type="password" name={"password"} className="form-control"
                                           id="inputpassword"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputAddress">Địa Chỉ</label>
                                    <Field type="text" name={"address"} className="form-control" id="inputAddress"
                                           placeholder="Hà Nội..."/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputBirthDay">Ngày Sinh</label>
                                    <Field type="date" name={"dateOfBirth"} className="form-control"
                                           id="inputBirthDay"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputIdentityID">Số CCCD</label>
                                    <Field type="text" name={"identificationCard"} className="form-control"
                                           id="inputIdentityID"
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
                                <img
                                    src={url ? url : "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"}
                                    className={"avatar img-thumbnail"} alt="avatar"/>
                                <FireUpload onUpload={(onUpload) => {
                                    setUrl(onUpload)
                                }}></FireUpload>
                            </div>

                        </div>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Đăng Ký</button>


                    </Form>
                </Formik>

            </div>
        </>
    )
}