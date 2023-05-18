import React from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import Bars from "../../svgs/Bars";
import Ex from "../../svgs/Ex";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
const Sidebar = ({ menu, userInfo, handleClick }) => {
  const large = useMediaQuery({
    query: "(min-width : 1281px)",
  });
  const desktop = useMediaQuery({
    query: "(max-width : 1280px)" && "(min-width : 841px)",
  });

  const [trigger, setTrigger] = useState(false);

  return (
    <div
      className={
        trigger
          ? "bg-white h-screen px-2 py-5 w-[200px] ease-in duration-150"
          : "bg-white h-screen px-2 py-5 w-full ease-out duration-150"
      }
    >
      {desktop && (
        <div className="flex flex-col items-center">
          <div className="rounded-full w-24 h-24 overflow-hidden">
            <img src="/logo.png" alt="" />
          </div>
          <h1 className="text-Black origin-left font-normal text-xl duration-200">
            {userInfo.nom_boutique}
          </h1>
          {large && (
            <h2 className="text-grey origin-left font-normal text-l duration-200 ">
              {userInfo.email}
            </h2>
          )}
        </div>
      )}
      {!desktop && !large && (
        <button
          className={
            trigger
              ? "h-6 w-6 flex ml-2 transform scale-75 duration-150"
              : "h-6 w-6 flex items-center justify-center mx-auto"
          }
          onClick={() => {
            setTrigger(!trigger);
          }}
        >
          {trigger && <Ex />}
          {!trigger && <Bars />}
        </button>
      )}
      <ul className="mt-9">
        {menu.map((Menu, index) => (
          <NavLink
            to={Menu.Path}
            key={index}
            onClick={(event) => handleClick(event, index)}
            className={({ isActive }) =>
              !isActive
                ? "flex  rounded-md p-2 cursor-pointer hover:bg-ER18 text-Black-300 text-sm items-center gap-x-4 active:bg-ER18 mt-2 flex-row justify-start gap-2 w-full"
                : "flex  rounded-md p-2 cursor-pointer bg-ER18 text-ER1 text-sm items-center gap-x-4 active:bg-ER18 mt-2 flex-row justify-start gap-2 w-full"
            }
          >
            <div className="h-6 w-6 flex items-center justify-center">
              {Menu.Icon}
            </div>
            {(desktop || trigger) && (
              <div className=" font-semibold text-sm">{Menu.title}</div>
            )}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;
