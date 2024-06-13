import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTotalByMonth } from "../../services/invoicesService/InvoiceService";

export default function Statistical() {
    let dispatch = useDispatch();
    let listTotalByMonth = useSelector(state => {
        return state.invoices.totalByMonth;
    });
    console.log(listTotalByMonth);

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

    return (
        <>
            <div className="d-flex align-items-center">
                <h2>Thống kê doanh thu các tháng</h2>
            </div>
            <div className="justify-content-center align-items-center pt-4">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tháng</th>
                        <th scope="col">Tổng doanh thu</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        listTotalByMonth.map((list, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{formatMonth(list.month)}</td>
                                <td>{formatCurrency(list.total)}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
}
