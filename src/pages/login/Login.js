import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import './login.css'
import {useDispatch} from "react-redux";

export default function Login() {
    const dispatch = useDispatch();
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .matches(/^[A-Z][a-zA-Z0-9]*$/, 'Username must start with an uppercase letter')
            .min(2, 'Username must be at least 2 characters')
            .max(32, 'Username must not exceed 32 characters'),
        password: Yup.string()
            .required('Password is required')
            .matches(/^[a-zA-Z0-9]*$/, 'Password must contain only alphanumeric characters')
            .min(6, 'Password must be at least 6 characters')
            .max(32, 'Password must not exceed 32 characters'),
    });
    const handleLogin = (values)=>{
            dispatch()
    }

    return (
        <div className="container pt-5 pb-5 mt-5 login-container">
            <div className="row justify-content-center pt-5">
                <div className="col-4">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-3 p-md-4 p-xl-5 login-form">
                            <div className="row">
                                <div className="col-12 login-header" id="header">
                                    <div className="login-icons" id="icons">
                                        <Link to={''} className={`btn-close`} aria-label={`Close`}></Link>
                                    </div>
                                    <div className="mb-5" id="signIn">
                                        <h3 className="ml-3 mt-0 login-title">Sign In</h3>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <Formik initialValues={{
                                username: '',
                                password: ''
                            }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        handleLogin(values)
                                    }}>
                                <Form>
                                    <div className="row gy-3 overflow-hidden">
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <Field type="text" className="form-control login-input" name="username" id="username" placeholder="Username" required />
                                                <label htmlFor="username">Username</label>
                                                <ErrorMessage name="username" component="div" className="text-danger" />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <Field type="password" className="form-control login-input" name="password" id="password" placeholder="Password" required />
                                                <label htmlFor="password">Password</label>
                                                <ErrorMessage name="password" component="div" className="text-danger" />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button className="btn btn-primary login-button" type="submit">Login</button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
