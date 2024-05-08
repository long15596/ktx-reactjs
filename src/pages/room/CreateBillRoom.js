import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";

export default function CreateBillRoom() {
    let {id} = useParams()
    let dispatch = useDispatch();
    // let room = useSelector(state => {
    //     return state.
    // })
    let handleCreate = (values) => {
        let totalElectric = values.electricityBill * 1.678;
        let totalWater = 0;
        if (values.waterBill <= 10) {
            totalWater = values.waterBill * 5.973;
        } else if (values.waterBill <= 20) {
            totalWater = 10 * 5.973 + (values.waterBill - 10) * 7.052;
        } else if (values.waterBill <= 30) {
            totalWater = 10 * 5.973 + 10 * 7.052 + (values.waterBill - 20) * 8.669;
        } else {
            totalWater = 10 * 5.973 + 10 * 7.052 + 10 * 8.669 + (values.waterBill - 30) * 15.929;
        }
        let totalService = values.serviceBill;
        let totalCost = totalElectric + totalWater + totalService
    };

    return (
        <>
            <div className="container mt-5">
                <h2>Nhập tiền điện và tiền nước</h2>
                <Formik onSubmit={(values) => {
                    handleCreate(values)
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