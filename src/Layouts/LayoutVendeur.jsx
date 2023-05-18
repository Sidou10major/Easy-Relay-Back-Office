import Sidebar from "../pages/sidebar/Sidebar";
import "../index.css";
import { Outlet, Navigate } from "react-router";
import { useState, useEffect } from "react";
import Profile from "../svgs/Profile";
import Truck from "../svgs/Truck";
import Dollar from "../svgs/Dollar";
import Stock from "../svgs/Stock";
import { useSelector, useDispatch } from "react-redux";
import {
  setColor1,
  setColor2,
  setColor3,
  setColor4,
} from "../reducers/navColorsReducer";
function LayoutVendeur() {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.navColors);
  const vendeur = useSelector((state) => state.vendeur);
  const [menu, setMenu] = useState([
    {
      title: "Livraison",
      Icon: <Truck color={colors.color1} />,
      Path: "/vendeur/commnades",
    },
    {
      title: "Paiement",
      Icon: <Dollar color={colors.color2} />,
      Path: "/vendeur/paiement",
    },
    {
      title: "Stock",
      Icon: <Stock color={colors.color3} />,
      Path: "/vendeur/Stock",
    },
    {
      title: "Profile",
      Icon: <Profile color={colors.color4} />,
      Path: "/vendeur/Profile",
    },
  ]);
  const handleClick = (event, index) => {
    switch (index) {
      case 0:
        dispatch(setColor1());
        break;
      case 1:
        dispatch(setColor2());
        break;
      case 2:
        dispatch(setColor3());
        break;
      case 3:
        dispatch(setColor4());
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    setMenu([
      {
        title: "Livraison",
        Icon: <Truck color={colors.color1} />,
        Path: "/vendeur/",
      },
      {
        title: "Paiement",
        Icon: <Dollar color={colors.color2} />,
        Path: "/vendeur/paiement",
      },
      {
        title: "Stock",
        Icon: <Stock color={colors.color3} />,
        Path: "/vendeur/Stock",
      },
      {
        title: "Profile",
        Icon: <Profile color={colors.color4} />,
        Path: "/vendeur/Profile",
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors]);
  return (
    <div className="flex flex-row">
      <div className="sidebar_wrap">
        <Sidebar
          menu={menu}
          setMenu={setMenu}
          colors={colors}
          handleClick={handleClick}
          userInfo={vendeur}
        />
      </div>
      <div className="children_wrap">
        {vendeur ? <Outlet /> : <Navigate to="/" />}
      </div>
    </div>
  );
}

export default LayoutVendeur;
