import TopBar from "./components/TopBar"
import LeftBar from "./components/LeftBar"
import RightBar from "./components/RightBar"
import { Outlet } from "react-router-dom"
import { LeftBarContext } from "./context/LeftBarContext"
import { useState } from "react"

function App() {
  const [isActive, setIsActive] = useState(false)

  const showBar = () => {
    setIsActive(true)
  }
  const hideBar = () => {
    setIsActive(false)
  }

  return (
    <LeftBarContext.Provider value={{isActive, showBar, hideBar}} >
      <TopBar />
      <div className="h-[calc(100vh-52px)] grid grid-cols-12 gap-6 bg-[#f3f3f3]"> 
        <LeftBar />
        <Outlet />
        <RightBar />
      </div>
    </LeftBarContext.Provider>
  )
}

export default App
