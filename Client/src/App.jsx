import TopBar from "./components/TopBar"
import LeftBar from "./components/LeftBar"
import RightBar from "./components/RightBar"
import { Outlet } from "react-router-dom"
import { ThemeContext } from "./context/theme"
import { useEffect, useState } from "react"

function App() {
  const [themeMode, setThemeMode] = useState(localStorage.getItem('theme') || "light")
  const changeTheme = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light")
  }

  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(themeMode)
    localStorage.setItem('theme', themeMode)
  }, [themeMode])

  const [isOpen, setIsOpen] = useState(false)
  const toggleBar = () => {
    setIsOpen(!isOpen);
  }
  
  return (
    <>
    <ThemeContext.Provider value={{themeMode, changeTheme}}>
      <TopBar isOpen={isOpen} toggleBar={toggleBar} />
      <div className="h-[calc(100vh-50px)] sm:h-[calc(100vh-58px)] grid grid-cols-12 bg-[#eeeeee] dark:bg-[#202020]"> 
        <LeftBar isOpen={isOpen} toggleBar={toggleBar} />
        <div className="p-3 lg:p-5 lg:px-7 overflow-y-scroll scroll-smooth no-scrollbar col-span-12 sm:col-span-8 lg:col-span-6"> 
          <Outlet />
        </div>
        <RightBar />
      </div>
    </ThemeContext.Provider>
    </>
  )
}

export default App
