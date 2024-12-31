import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SidebarContext } from "../../context/sideBarContext";

const NavItem = ({ path, icon: Icon, label }) => {
  const { toggleBar } = useContext(SidebarContext);

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center hover:bg-[#eeeeee] dark:hover:bg-[#222222] w-full p-2 rounded-lg ${
          isActive && "bg-[#eeeeee] dark:bg-[#222222]"
        }`
      }
      onClick={toggleBar}
    >
      <Icon sx={{ fontSize: 34 }} />
      <p className="ml-3.5 text-lg font-medium">{label}</p>
    </NavLink>
  );
};

export default NavItem;
