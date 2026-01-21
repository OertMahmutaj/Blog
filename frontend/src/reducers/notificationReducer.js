import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        displayNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return initialState
        },
        setNotification(state, action) {
            return action.payload
        }
    }
})

const { displayNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
    return async (dispatch) =>{
        dispatch(displayNotification(message))
        setTimeout(() => dispatch(clearNotification()), seconds*1000)
    }
}
export default notificationSlice.reducer