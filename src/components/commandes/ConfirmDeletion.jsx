import React from "react";
import ExitForm from "../../svgs/ExitForm";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
function ConfirmDeletion({ setShowConfirmDeletion, livraisonID, setRefresh }) {
  const { id_vendeur } = useSelector((state) => state.vendeur);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const response = await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=annuler_livraison&id_vendeur=${id_vendeur}&id_livraison=${livraisonID}`
      )
      .catch((error) => console.log(error));
    if (response) {
      setLoading(false);
      setShowConfirmDeletion(false);
      setRefresh((old) => !old);
    }
  };
  return (
    <div className="grayout">
      <div className="confirmation_form_wrap">
        <div className="ajout_header1">
          Livraison #{livraisonID}
          <i
            className="cursor-pointer trasform scale-75"
            onClick={() => {
              setShowConfirmDeletion(false);
            }}
          >
            <ExitForm />
          </i>
        </div>
        <div className=" h-[1px] w-full bg-[#F2F2F2] my-3"></div>
        <div className="confirmation_body mt-8">
          Vous etes sur de vouloir Annuler cette livraison ?
          <div className="flex justify-center items-center mt-8 gap-4">
            <Button
              className="mobile:!text-xs"
              variant="outlined"
              onClick={() => {
                setShowConfirmDeletion(false);
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
              onClick={handleSubmit}
              sx={{
                width: 160,
                height: 40,
                backgroundColor: "#3F0291",
                borderRadius: "6px",
              }}
            >
              Confirmer
            </Button>
          </div>
          {loading && (
            <div className="flex flex-row justify-center itmes-center my-4">
              <BeatLoader color="#3F0291" loading={loading} size={10} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeletion;
