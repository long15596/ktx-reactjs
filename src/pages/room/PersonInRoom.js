import { useDispatch, useSelector } from "react-redux";
import './ListPersonInRoom.css'
import { setCheckShow, setCheckShowRoom } from "../../services/usersServices/UserService";

export default function PersonInRoom() {
    let listRoomInUserRoom = useSelector(state => {
        return state.userRooms.userRoomsByRoom;
    });
    const dispatch = useDispatch();

    return (
        <div className="container listuser-inroom">
            <div className="row">
                <div className="col d-flex flex-column align-items-center justify-content-center">
                    <div className="d-flex justify-content-between align-items-center w-100 mb-3">
                        <h3 className="m-0">
                              Danh Sách Sinh Viên Phòng {listRoomInUserRoom.length > 0 && listRoomInUserRoom[0].room.name}
                        </h3>
                        <button type="button" className="close" aria-label="Close" onClick={() => {
                            dispatch(setCheckShowRoom(false));
                        }}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <table className="table">
                        {listRoomInUserRoom.length ?
                            <>
                                <tbody>
                                {listRoomInUserRoom.map((userRoom, index) => (
                                    <tr key={index}>
                                        <td>{userRoom.user.name}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </> :
                            <>
                                <thead>
                                <tr>
                                    <th scope="col" style={{ textAlign: "center" }}>Phòng chưa có người ở</th>
                                </tr>
                                </thead>
                            </>
                        }
                    </table>
                </div>
            </div>
        </div>
    );
}
