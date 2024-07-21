import TopBar from "./components/TopBar"
import LeftBar from "./components/LeftBar"
import RightBar from "./components/RightBar"
import { Outlet } from "react-router-dom"
import { ThemeContext } from "./context/theme"
import { useEffect, useState } from "react"

function App() {
  const [themeMode, setThemeMode] = useState("light")
  const changeTheme = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light")
  }

  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])

  const [isOpen, setIsOpen] = useState(false)
  const toggleBar = () => {
    setIsOpen(!isOpen);
  }
  
  return (
    <>
    <ThemeContext.Provider value={{themeMode, changeTheme}}>
      <TopBar isOpen={isOpen} toggleBar={toggleBar} />
      <div className="h-[calc(100vh-50px)] sm:h-[calc(100vh-58px)] grid grid-cols-12 bg-[#f3f3f3] dark:bg-[#252525]"> 
        <LeftBar isOpen={isOpen} toggleBar={toggleBar} />
        <Outlet />
        <RightBar />
      </div>
    </ThemeContext.Provider>
    </>
  )
}

export default App
