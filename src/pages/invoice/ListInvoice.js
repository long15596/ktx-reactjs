import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoice } from '../../services/invoicesService/InvoiceService';
import * as XLSX from 'xlsx';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { setMonth, setYear, getYear, getMonth } from 'date-fns';

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
        return newList
    });

    const [showMonthSelector, setShowMonthSelector] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        dispatch(getInvoice());
    }, [dispatch]);

    const exportToExcel = () => {
        if (!selectedDate) {
            alert("Vui lòng chọn tháng và năm");
            return;
        }

        const selectedMonth = getMonth(selectedDate) + 1;
        const selectedYear = getYear(selectedDate);

        const filteredInvoices = invoices.filter(invoice => {
            const invoiceMonth = parseInt(invoice.startDate.split('/')[1]);
            const invoiceYear = parseInt(invoice.startDate.split('/')[2]);
            return invoiceMonth === selectedMonth && invoiceYear === selectedYear;
        });

        const data = filteredInvoices.map((invoice, index) => ({
            STT: index + 1,
            "Hợp Đồng Tháng": invoice.startDate.split('/')[1],
            "Mã Sinh Viên": invoice.user.username,
            "Mã Phòng": invoice.room.name,
            "Tiền Điện": invoice.useElectricity,
            "Tiền Nước": invoice.useWater,
            "Dịch Vụ": invoice.servicePrice,
            "Tổng tiền": invoice.price,
            "Ngày tạo": invoice.startDate,
            "Hạn nộp": invoice.endDate,
            "Cảnh báo": invoice.isOverdue ? "Quá hạn" : "Chưa đến hạn"
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, `Invoices_${selectedMonth}_${selectedYear}`);
        XLSX.writeFile(wb, `Danh_Sach_Hoa_Don_${selectedMonth}_${selectedYear}.xlsx`);
    };

    const handleMonthChange = (date) => {
        const newDate = setYear(setMonth(new Date(), getMonth(date)), getYear(date));
        setSelectedDate(newDate);
    };

    return (
        <>
            <h2>Danh Sách Hóa Đơn</h2>
            {invoices && <div className="row d-flex justify-content-end">
                {showMonthSelector && (
                    <>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleMonthChange}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                                showFullMonthYearPicker
                                className="form-control"
                                placeholderText="Chọn tháng và năm"
                            />
                            <button className={"btn btn-outline-primary"} onClick={exportToExcel}>
                                Xuất file Excel
                            </button>
                    </>
                )}
                <button className={"btn btn-outline-primary"} onClick={() => setShowMonthSelector(true)}>
                    Xuất file Excel Theo Tháng
                </button>
                <button className={"btn btn-outline-primary"} onClick={exportToExcel}>Xuất file Excel</button>

            </div>}

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
                            <td>{invoice.startDate.split('/')[1]}</td>
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
