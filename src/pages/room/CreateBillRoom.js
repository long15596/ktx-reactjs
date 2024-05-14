import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {useEffect} from "react";
import {getAllUserRooms} from "../../services/userRoomsService/userRoomService";
import {addInvoice} from "../../services/invoicesService/InvoiceService";
import {useNavigate} from "react-router-dom";

const currentDate = new Date();

function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function nextMonthSameDayFormatted(currentDate) {
    const nextMonthSameDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 10);
    return formatDate(nextMonthSameDay);
}

export default function CreateBillRoom() {
    let {id} = useParams();
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let userRooms = useSelector(state => {
        console.log(state)
        if (id == undefined) {
            return [];
        }
        return state.userRooms.userRooms.filter((userRoom) => {
            if (userRoom.room) {
                return userRoom.room.id == id
            } else {
                return false
            }
        })
    })
    const currentDateFormatted = formatDate(currentDate);
    const nextMonthSameDay = nextMonthSameDayFormatted(currentDate);
    useEffect(() => {
        dispatch(getAllUserRooms())
    }, []);
    let handleCreate = (values) => {
        let totalElectric = values.electricityBill * 1678;
        let totalWater = 0;
        if (values.waterBill <= 10) {
            totalWater = values.waterBill * 5973;
        } else if (values.waterBill <= 20) {
            totalWater = 10 * 5973 + (values.waterBill - 10) * 7052;
        } else if (values.waterBill <= 30) {
            totalWater = 10 * 5973 + 10 * 7052 + (values.waterBill - 20) * 8669;
        } else {
            totalWater = 10 * 5973 + 10 * 7052 + 10 * 8669 + (values.waterBill - 30) * 15929;
        }
        let totalService = values.serviceBill;
        if (userRooms.length > 0) {
            let totalCost = (totalElectric + totalWater + totalService) / userRooms[0].room.currentPresent;
            let totalAll = totalCost + userRooms[0].room.price;
            userRooms.map((i) => {
                dispatch(addInvoice({
                    value: {
                        room: {
                            id: i.room.id
                        },
                        user: {
                            id: i.user.id
                        },
                        useElectricity: totalElectric,
                        useWater: totalWater,
                        servicePrice: totalService,
                        price: totalAll,
                        startDate: currentDateFormatted,
                        endDate: nextMonthSameDay
                    }
                }))
            });
            navigate("/admin/room")
        }
    };

    return (
        <>
            <div className="container mt-5">
                <h2>Nhập tiền điện và tiền nước</h2>
                <Formik onSubmit={(value) => {
                    handleCreate(value)
                }}
                        initialValues={{
                            electricityBill: "",
                            waterBill: "",
                            serviceBill: "",
                        }}
                >
                    <Form>
                        <div className="form-group">
                            <label htmlFor="electricityBill">Tiền Điện(kWh):</label>
                            <Field
                                type="number"
                                name="electricityBill"
                                className=
                                    "form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="waterBill">Tiền Nước(m3):</label>
                            <Field
                                type="number"
                                name="waterBill"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="waterBill">Tiền Dịch Vụ:</label>
                            <Field
                                type="number"
                                name="serviceBill"
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </Form>
                </Formik>
            </div>
        </>
    )
}