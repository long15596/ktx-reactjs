import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {addProfile} from "../../../services/usersServices/UserService";
import {Field, Form, Formik} from "formik";
import FireUpload from "../../../components/FireUpload";
import Swal from "sweetalert2";
import * as Yup from "yup";
import {getOneRoom, getRooms} from "../../../services/roomsServices/RoomService";
import {addUserRoom} from "../../../services/userRoom/userRoomService";

const currentDate = new Date();

function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function nextMonthSameDayFormatted(currentDate) {
    const nextMonthSameDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

    return formatDate(nextMonthSameDay);
}

const currentDateFormatted = formatDate(currentDate);
const nextMonthSameDay = nextMonthSameDayFormatted(currentDate);
export default function Request() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [url, setUrl] = useState('')
    let [gender, setGender] = useState('')
    let choiceRoom = useSelector(state =>{
    return state.rooms.room
    })
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
    const rooms = useSelector(state => state.rooms.rooms);

    useEffect(() => {
        dispatch(getRooms());
    }, []);
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

        values = await {...values, gender: gender, img: url}

        if (values.username === '') {
            showError('Không được để trống mã sinh viên');
        } else if (values.password === '') {
            showError('Không được để trống mật khẩu');
        } else {

            await dispatch(addUserRoom({values})).then(data => {
                console.log(data)
                if (data.payload === "Username existed") {
                    showError('Tài khoản đã tồn tại');
                } else {
                    showSuccess('Đăng ký thành công');
                    const valuesMoi = {user: data.payload, room: choiceRoom, startDate: currentDateFormatted, endDate: nextMonthSameDay}
                    dispatch(addUserRoom({values :valuesMoi}))
                    setTimeout(async () => {
                        navigate(`/`);
                    }, 1500);
                }
            })

        }
    }


    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .matches(/^[0-9]{9}$/, 'Mã sinh viên phải là 9 chữ số')
            .required('Không được để trống mã sinh viên')
    });


    return (
        <>
            <div className="container">
                <Formik

                    onSubmit={(values) => {
                        handleAdd(values)
                    }}
                    validationSchema={validationSchema}
                    initialValues={{
                        username: "",
                        password: "",
                        dateOfBirth: '',
                        identificationCard: '',
                        address: '',
                        clazz: '',
                        phone: '',
                        gender: gender,
                        img: url
                    }}>
                    {({errors, touched}) => ( // Destructure errors and touched from Formik props
                        <Form className={"mt-3"}>
                            <div className="row">
                                <div className="col-md-9">
                                    {/* InputMSV Field */}
                                    <div className="form-group">
                                        <label htmlFor="inputMSV">Mã Sinh Viên</label>
                                        <Field type="text" name={"username"} className="form-control" id="inputMSV"/>
                                        {touched.username && errors.username && (
                                            <div><p className={'text-danger'}>{errors.username}</p></div>
                                        )}
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
                                            <select onChange={(event) => {
                                                setGender(event.target.value)
                                            }} name={"gender"} id="inputGender" className="form-control">
                                                <option>Lựa chọn</option>
                                                <option value={"Nam"}>Nam</option>
                                                <option value={"Nữ"}>Nữ</option>
                                                <option value="Khác">Khác...</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-2">
                                            <label htmlFor="inputClazz">Lớp?</label>
                                            <Field type="text" name={"clazz"} className="form-control" id="inputClazz"/>
                                        </div>

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputRoom"> Danh sách các phòng phù hợp</label>
                                        <select name={"room"} id="inputRoom" className="form-control" onChange={(event) => {
                                           dispatch(getOneRoom(event.target.value))
                                        }}>
                                            <option selected>Lựa chọn
                                            </option>
                                            {rooms.map(room => {
                                                if (room.type === gender && (room.maxCurrent - room.currentPresent) > 0) {
                                                    return (<option value={room.id}>{room.name}</option>)
                                                }
                                            })}
                                        </select>
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
                            {/* Submit button */}
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Đăng Ký</button>
                        </Form>
                    )}
                </Formik>

            </div>
        </>
    )
}