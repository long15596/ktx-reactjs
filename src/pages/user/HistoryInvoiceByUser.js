import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getInvoice } from "../../services/invoicesService/InvoiceService";

export default function HistoryInvoiceByUser() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);
    const invoiceByUser = useSelector(state => {
        return state.invoices.invoices.filter(item => (item.user.id === currentUser.id));
    });

    useEffect(() => {
        dispatch(getInvoice());
    }, [dispatch]);

    const formatCurrency = (value) => {
        return Number(value).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    return (
        <>
            <div className="container my-4">
                <div className="row align-items-center">
                    <div className="col">
                        <h2 className="text-center">Lịch Sử Hóa Đơn</h2>
                    </div>
                </div>
                <div className="table-responsive mt-4">
                    <table className="table table-bordered ">
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
                            <th scope="col">Trạng thái</th>
                        </tr>
                        </thead>
                        <tbody>
                        {invoiceByUser.map((invoice, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{invoice.startDate.split('/')[1]}</td>
                                <td>{invoice.user.username}</td>
                                <td>{invoice.room.name}</td>
                                <td>{formatCurrency(invoice.useElectricity)}</td>
                                <td>{formatCurrency(invoice.useWater)}</td>
                                <td>{formatCurrency(invoice.servicePrice)}</td>
                                <td>{formatCurrency(invoice.price)}</td>
                                <td>{invoice.startDate}</td>
                                <td>{invoice.endDate}</td>
                                <td>
                                    {invoice.isOverdue ? <span className="badge badge-danger">Hết hạn</span> : <span className="badge badge-success">Chưa đến hạn</span>}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
