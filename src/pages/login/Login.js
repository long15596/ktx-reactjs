import {Field, Form, Formik} from "formik";
import { useNavigate} from "react-router-dom";
import './login.css'
import {useDispatch} from "react-redux";
import {login, setCheckShow} from "../../services/usersServices/UserService";
import Swal from "sweetalert2";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async (values) => {
        await dispatch(login(values)).then(user => {
            if (user.payload === undefined) {
                showError('Sai tên người dùng hoặc mật khẩu, vui lòng kiểm tra lại!');
            } else {
                const userRoles = user.payload.roles.map(role => role.authority);
                if (userRoles.includes("ROLE_USER")) {
                    showSuccess('Đăng nhập thành công');
                    setTimeout(() => {
                        dispatch(setCheckShow(false))
                        // navigate(`/`);
                        window.location.reload();
                    }, 1500);
                } else if (userRoles.includes("ROLE_ADMIN")) {
                    showSuccess('Đăng nhập thành công');
                    setTimeout(() => {
                        dispatch(setCheckShow(false))
                        navigate(`/admin`);
                    }, 1500);
                }
            }
        });
    };
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

    return (
        <div className="card-body p-3 p-md-4 p-xl-5 login-form">
            <div className="row">
                <div className="col-12 login-header" id="header">
                    <button type="button" className="close" aria-label="Close" onClick={() => {
                        dispatch(setCheckShow(false))
                    }}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="mb-5" id="signIn">
                        <h3 className="text-center mb-4">Đăng Nhập</h3>
                        <hr/>
                    </div>

                </div>
            </div>

            <Formik initialValues={{
                username: '',
                password: ''
            }}
                    onSubmit={(values) => {
                        handleLogin(values)
                    }}>
                <Form>
                    <div className="row gy-3 overflow-hidden">
                        <div className="col-12">
                            <div className="form-floating mb-3">
                                <label className={"mb-2"} htmlFor="username">Mã sinh viên</label>
                                <Field type="text" className="form-control login-input" name="username" id="username"
                                       placeholder="Username" required/>

                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-floating mb-3">
                                <label className={"mb-2"} htmlFor="password">Mật khẩu</label>
                                <Field type="password" className="form-control login-input" name="password"
                                       id="password" placeholder="Password" required/>

                            </div>
                        </div>
                        <div className="col-12">
                            <div className="d-grid">
                                <button className="btn btn-primary login-button" type="submit">Đăng nhập</button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
