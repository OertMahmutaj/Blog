import { useReducer, createContext, useContext, useEffect } from "react";
import userServices from "../services/users"

const usersReducer = () => {
    switch (action, state) {
        case "SET_USERS":
            return action.payload;
        case "CLEAR_USERS":
            return null;
        default:
            return state;
    }   
};

const ViewUsersContext = createContext();

export const ViewUsersContextProvider = (props) => {
    const [users, dispatchUsers] = useReducer(usersReducer, null)

    const setUsers = (users) => {
        dispatchUsers({ type: "SET_USERS", payload: users });
        userServices.getAll()
    };

    const clearUsers = () => {
        dispatchUsers({ type: "CLEAR_USERS" });
    };

    useEffect(() => {
        if (users) {
            setUsers(JSON.parse(users))
        }
    }, []);

    return (
        <ViewUsersContext.Provider value={{ users, dispatchUsers, setUsers, clearUsers }}>
            {props.children}
        </ViewUsersContext.Provider>
    );
};

export default ViewUsersContext