import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getInvoice} from "../../services/invoicesService/InvoiceService";
import dayjs from "dayjs";

export default function ListInvoice() {
    const dispatch = useDispatch();
    const invoices = useSelector(state => {
        let currentDate = new Date();
        let list = state.invoices.invoices;
        let newList = []
        list.forEach(invoice => {
            let endDateParts = invoice.endDate.split('/');
            let endDate = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]);
            if (endDate < currentDate) {
                newList.push({...invoice, isOverdue: true})
            } else {
                newList.push({...invoice, isOverdue: false})
            }
        });
        console.log(newList)
        return newList
    });
    // let invoices = useSelector(state => {
    //     let currentDate = dayjs()
    //     let list = state.invoices.invoices
    //     let newList = []
    //     list.forEach(invoice => {
    //         let endDate = dayjs(invoice.endDate, 'DD/MM/YYYY')
    //         if (endDate.isBefore(currentDate, 'day')) {
    //             newList.push({...invoice, isOverdue: true})
    //         } else {
    //             newList.push({...invoice, isOverdue: false})
    //         }
    //     })
    //     console.log(newList)
    //     return newList
    // })
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
                        <th scope="col">Hợp Đồng Tháng</th>
                        <th scope="col">Mã Sinh Viên</th>
                        <th scope="col">Mã Phòng</th>
                        <th scope="col">Tiền Điện</th>
                        <th scope="col">Tiền Nước</th>
                        <th scope="col">Dịch Vụ</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Ngày tạo</th>
                        <th scope="col">Hạn nộp</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {invoices.map((invoice, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td></td>
                            <td>{invoice.user.username}</td>
                            <td>{invoice.room.name}</td>
                            <td>{invoice.useElectricity}</td>
                            <td>{invoice.useWater}</td>
                            <td>{invoice.servicePrice}</td>
                            <td>{invoice.price}</td>
                            <td>{invoice.startDate}</td>
                            <td>{invoice.endDate}</td>
                            <td>
                                {invoice.isOverdue &&
                                    <>Quá hạn</>
                                }
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
