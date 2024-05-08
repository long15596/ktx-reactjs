import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvoice } from "../../services/invoicesService/InvoiceService";

export default function ListInvoice() {
    const dispatch = useDispatch();
    const invoices = useSelector(state => state.invoices.invoices);

    useEffect(() => {
        dispatch(getInvoice());
    }, []);

    return (
        <>
            <h2>Danh Sách Hóa Đơn</h2>
            <div className={`justify-content-center align-items-center pt-2`}>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Mã Sinh Viên</th>
                        <th scope="col">Mã Phòng</th>
                        <th scope="col">Tiền Điện</th>
                        <th scope="col">Tiền Nước</th>
                        <th scope="col">Tiền Phòng</th>
                        <th scope="col">Dịch Vụ</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {invoices.map((invoice, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{invoice.user.username}</td>
                            <td>{invoice.room.name}</td>
                            <td>{invoice.useElectricity}</td>
                            <td>{invoice.useWater}</td>
                            <td>{invoice.price}</td>
                            <td>{invoice.servicePrice}</td>
                            <td>
                                {/*<button className="btn btn-outline-danger" type="submit">Xóa</button>*/}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
