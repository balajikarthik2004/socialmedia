import { createContext, useEffect, useReducer } from "react";

const initialState = JSON.parse(localStorage.getItem("user")) || null;

export const UserContext = createContext(initialState);

const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload
    case "FOLLOW":
      return {...state, following: [...state.following, action.payload]}
    case "UNFOLLOW":
      return {...state, following: state.following.filter((userId) => userId !== action.payload)}
    case "SEND_REQUEST":
      return {...state, requestedTo: [...state.requestedTo, action.payload]}
    case "ACCEPT_REQUEST":
      return {...state, requestedBy: state.requestedBy.filter((userId) => userId !== action.payload), followers: [...state.followers, action.payload]};
    case "REJECT_REQUEST":
      return {...state, requestedBy: state.requestedBy.filter((userId) => userId !== action.payload)}
    case "UPDATE":
      return {...state, ...action.payload}
    default:
      return state;
  }
}

export const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(UserReducer, initialState)

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
