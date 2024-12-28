import { createContext, useEffect, useReducer } from "react"

const initialState = {
    user : JSON.parse(localStorage.getItem("user")) || null,
    isFetching : false,
    error : false,
}

export const AuthContext = createContext(initialState)

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return { user: null, isFetching: true, error: false }
        case "LOGIN_SUCCESS":
            return { user: action.payload, isFetching: false, error: false }
        case "LOGIN_FAILURE":
            return { user: null, isFetching: false, error: true }
        case "REGISTER_START":
            return { user: null, isFetching: true, error: false }
        case "REGISTER_SUCCESS":
            return { user: null, isFetching: false, error: false }
        case "REGISTER_FAILURE":
            return { user: null, isFetching: false, error: true }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider value={{ user: state.user, isFetching: state.isFetching, error: state.error, isAuthenticated: state.isAuthenticated, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}