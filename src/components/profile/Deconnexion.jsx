import React from "react";
import Button from "@mui/material/Button";
import ExitForm from "../../svgs/ExitForm";
import { useDispatch } from "react-redux";
import { logoutVendeur } from "../../reducers/vendeurReducer";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Deconnexion({ setShowLogout }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="grayout">
      <div className="confirmation_form_wrap">
        <div className="ajout_header1">
          Déconnexion
          <i
            className="cursor-pointer trasform scale-75"
            onClick={() => {
              setShowLogout(false);
            }}
          >
            <ExitForm />
          </i>
        </div>
        <div className=" h-[1px] w-full bg-[#F2F2F2] mt-2"></div>
        <div className="confirmation_body mt-6 mobile:mt-3">
          vous étes sur que vous voulez vous déconnecter ?
          <div className="flex justify-center items-center mt-6 mobile:mt-3 gap-4">
            <Button
              className="mobile:!text-xs"
              variant="outlined"
              onClick={() => {
                setShowLogout(false);
              }}
              sx={{
                width: 160,
                height: 40,
                color: "#3F0291",
                border: "1px solid #3F0291",
                borderRadius: "6px",
              }}
            >
              Annuler
            </Button>
            <Button
              className="mobile:!text-xs"
              type="submit"
              variant="contained"
              onClick={() => {
                Cookies.remove("vendeur");
                Cookies.remove("navColors");
                dispatch(logoutVendeur());
                navigate("/");
              }}
              sx={{
                width: 160,
                height: 40,
                backgroundColor: "#3F0291",
                borderRadius: "6px",
              }}
            >
              Se déconnecter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deconnexion;
