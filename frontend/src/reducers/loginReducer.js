import { createSlice } from "@reduxjs/toolkit";
import loginServices from '../../services/login'
import blogServices from '../../services/blogs'

const loginSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    }
  }
})


export const { setUser, clearUser } = loginSlice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginServices.login(credentials)

    // store in Redux
    dispatch(setUser(user))

    // persist in localStorage
    window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user))

    // set token for blogServices
    blogServices.setToken(user.token)
  }
}


export const removeUser = () => {
    return async (dispatch) => {
        dispatch(clearUser())
    }
}

export default loginSlice.reducer