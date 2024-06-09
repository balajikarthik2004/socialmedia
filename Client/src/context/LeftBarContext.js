import { createContext, useContext } from "react";

export const LeftBarContext = createContext({
    isActive : false,
    showBar : () => {},
    hideBar : () => {}
});

export default function useLeftBarContext() {
    return useContext(LeftBarContext)
}