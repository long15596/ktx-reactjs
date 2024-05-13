import {createSlice} from "@reduxjs/toolkit";
import {
    editProfile,
    getProfile,
    logOut,
    login,
    setCheckShow,
    getAllUserByAdmin,
    addProfile, setCheckShowRoom
} from "../../services/usersServices/UserService";
let localStorageUser = () => {
    if (JSON.parse(localStorage.getItem(`currentUser`))) {
        return JSON.parse(localStorage.getItem(`currentUser`))
    }
    return null;
}
const initialState = {
    currentUser: localStorageUser(),
    user : [],
    checkShow: false,
    profile:{},
    checkShowRoom : false,
}
const userSlice = createSlice({
    name : 'user',
    initialState,
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload
            localStorage.setItem('currentUser', JSON.stringify(action.payload))
        });
        builder.addCase(setCheckShow.fulfilled, (state, action)=>{
            state.checkShow = action.payload
        });
        builder.addCase(setCheckShowRoom.fulfilled, (state, action)=>{
            state.checkShowRoom = action.payload
        });
        builder.addCase(logOut.fulfilled, (state, action) => {
            state.currentUser = null
        });
        builder.addCase(getProfile.fulfilled,(state,action)=>{
            state.profile = action.payload
        })
        builder.addCase(editProfile.fulfilled,(state,action)=>{
            state.profile = action.payload
        })
        builder.addCase(getAllUserByAdmin.fulfilled,(state,action)=>{
            state.user = action.payload
        })
        builder.addCase(addProfile.fulfilled, (state,action)=>{
            state.user.push(action.payload)
        })
    }
})
export default userSlice.reducer;