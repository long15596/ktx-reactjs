import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTotalByMonth } from "../../services/invoicesService/InvoiceService";
import * as XLSX from 'xlsx';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { setMonth, setYear, getYear, getMonth } from 'date-fns';
import Swal from "sweetalert2";

export default function Statistical() {
    const dispatch = useDispatch();
    const listTotalByMonth = useSelector(state => state.invoices.totalByMonth);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        dispatch(getTotalByMonth());
    }, [dispatch]);

    const formatMonth = (month) => {
        const [year, monthNumber] = month.split('-');
        return `${monthNumber}-${year}`;
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const exportToExcel = () => {
        let filteredTotalByMonth = listTotalByMonth;

        if (selectedDate) {
            const selectedMonth = getMonth(selectedDate) + 1;
            const selectedYear = getYear(selectedDate);
            const formattedSelectedMonth = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}`;

            filteredTotalByMonth = listTotalByMonth.filter(item => item.month === formattedSelectedMonth);
        }

        if (filteredTotalByMonth.length === 0) {
            showError("Không có tháng nào phù hợp");
            return;
        } else {
            showSuccess("Xuất thành công vui lòng kiểm tra");
        }

        const data = filteredTotalByMonth.map((item, index) => ({
            STT: index + 1,
            "Tháng": formatMonth(item.month),
            "Tổng doanh thu": formatCurrency(item.total)
        }));

        const fileName = selectedDate
            ? `Thong_Ke_Doanh_Thu_${getMonth(selectedDate) + 1}_${getYear(selectedDate)}.xlsx`
            : 'Thong_Ke_Doanh_Thu_Tat_Ca.xlsx';

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, `DoanhThu_${getMonth(selectedDate) + 1}_${getYear(selectedDate)}`);
        XLSX.writeFile(wb, fileName);
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

    const handleMonthChange = (date) => {
        if (date) {
            const newDate = setYear(setMonth(new Date(), getMonth(date)), getYear(date));
            setSelectedDate(newDate);
        } else {
            setSelectedDate(null);
        }
    };

    return (
        <>
            <div className="container my-4">
                <div className="row align-items-center">
                    <div className="col">
                        <h2 className="text-center">Thống kê doanh thu các tháng</h2>
                    </div>
                    <div className="col-md-auto ml-md-auto">
                        <div className="d-flex align-items-center">
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleMonthChange}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                                showFullMonthYearPicker
                                className="form-control mr-3"
                                placeholderText="Chọn tháng và năm"
                            />
                            <button className="btn btn-outline-primary ml-3" onClick={exportToExcel}>
                                Xuất file Excel
                            </button>
                        </div>
                    </div>
                </div>
                <div className="table-responsive mt-4">
                    <table className="table table-bordered ">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tháng</th>
                            <th scope="col">Tổng doanh thu</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listTotalByMonth.map((list, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{formatMonth(list.month)}</td>
                                <td>{formatCurrency(list.total)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
