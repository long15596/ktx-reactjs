import a from './img.png'
import FireUpload from "../../components/FireUpload";
import {useState} from "react";

export default function AddRoom() {
    let [url, setUrl] = useState('')
    return (
        <>
            <form>
                <h2>Thêm Phòng Mới</h2>
                <div className="row justify-content-center pt-2">
                    <div className="col-6">
                        <div className="form-group row">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Tên Phòng</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Số Người</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Mô Tả</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Loại Phòng</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Giá</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control"/>
                            </div>
                        </div>
                        <fieldset className="form-group row">
                            <legend className="col-form-label col-sm-2 float-sm-left pt-0">Thiết Bị</legend>
                            <div className="col-sm-10">
                                <div className="form-check">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value=""
                                               id="defaultCheck1"/>
                                        <label className="form-check-label" htmlFor="defaultCheck1">
                                            Default checkbox
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value=""
                                               id="defaultCheck2"
                                               disabled/>
                                        <label className="form-check-label" htmlFor="defaultCheck2">
                                            Disabled checkbox
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="col-6">
                        <div className={`d-flex justify-content-center`}>
                            <img src={!url ? a : url} alt="room-img" style={{objectFit: "cover", aspectRatio: `1`}}/>
                        </div>
                        <FireUpload onUpload={(uploadUrl) => {
                            console.log(uploadUrl)
                            setUrl(uploadUrl)
                        }}></FireUpload>
                        <div className="form-group row pt-2">
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-primary">Thêm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}