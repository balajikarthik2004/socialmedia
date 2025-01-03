import { createContext, useEffect, useReducer } from "react";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false
};

export const UserContext = createContext(initialState);

const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {user: null, isFetching: true}
    case "LOGIN_SUCCESS":
      return {user: action.payload, isFetching: false}
    case "LOGIN_FAILURE":
      return {user: null, isFetching: false}
    case "FOLLOW":
      return {...state, user: {...state.user, following: [...state.user.following, action.payload]}}
    case "UNFOLLOW":
      return {...state, user: {...state.user, following: state.user.following.filter((userId) => userId != action.payload)}}
    case "SEND_REQUEST":
      return {...state, user: {...state.user, requestedTo: [...state.user.requestedTo, action.payload]}}
    case "ACCEPT_REQUEST":
      return {...state, user: {...state.user, requestedBy: state.user.requestedBy.filter((userId) => userId != action.payload), followers: [...state.user.followers, action.payload]}}
    case "REJECT_REQUEST":
      return {...state, user: {...state.user, requestedBy: state.user.requestedBy.filter((userId) => userId != action.payload)}}
    default:
      return state;
  }
}

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState)

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        dispatch
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
