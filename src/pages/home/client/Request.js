export default function Request(){
    return(
        <>
            <div className="container">
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputMSV">Mã Sinh Viên</label>
                            <input type="text" className="form-control" id="inputMSV"/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Mật Khẩu</label>
                            <input type="password" className="form-control" id="inputPassword4"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Địa Chỉ</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="Hà Nội..."/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputBirthDay">Ngày Sinh</label>
                        <input type="date" className="form-control" id="inputBirthDay" placeholder="00123456789..."/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputIdentityID">Số CCCD</label>
                        <input type="text" className="form-control" id="inputIdentityID" placeholder="1234 Main St"/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPhone">Số điện thoại</label>
                            <input type="text" className="form-control" id="inputPhone"/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="inputGender"> Giới tính</label>
                            <select id="inputGender" className="form-control">
                                <option selected>Lựa chọn</option>
                                <option>Nam</option>
                                <option>Nữ</option>
                                <option>Khác...</option>
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputClazz">Bạn thuộc lớp nào?</label>
                            <input type="text" className="form-control" id="inputClazz"/>
                        </div>
                    </div>

                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Sửa</button>
                </form>
            </div>
        </>
    )
}