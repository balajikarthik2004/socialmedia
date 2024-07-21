import { createContext, useContext } from "react"

export const ThemeContext = createContext({
    themeMode : "light",
    changeTheme : () => {}
})

export default function useThemeContext() {
    return useContext(ThemeContext)
}