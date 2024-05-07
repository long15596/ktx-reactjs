export default function Request(){
    return(
        <>
            <div className="container">
                <form className={"mt-3"}>
                    <div className="row">
                        <div className="col-md-9">
                            <div className="form-group">
                                <label htmlFor="inputMSV">Mã Sinh Viên</label>
                                <input type="text" className="form-control" id="inputMSV"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Địa Chỉ</label>
                                <input type="text" className="form-control" id="inputAddress" placeholder="Hà Nội..."/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputBirthDay">Ngày Sinh</label>
                                <input type="date" className="form-control" id="inputBirthDay"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputIdentityID">Số CCCD</label>
                                <input type="text" className="form-control" id="inputIdentityID"
                                       placeholder="00123456789..."/>
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
                                    <label htmlFor="inputClazz">Lớp?</label>
                                    <input type="text" className="form-control" id="inputClazz"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 avatar-edit text-center">
                            <img src="https://thammyhanquoc.vn/wp-content/uploads/2023/12/nang-cap-vong-1.jpg" className={"avatar img-circle img-thumbnail"} alt="avatar"/>
                            <h6>Upload a different photo...</h6>
                            <input type="file" className="text-center center-block file-upload"/>
                        </div>

                    </div>

                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Sửa</button>
                </form>
            </div>
        </>
    )
}