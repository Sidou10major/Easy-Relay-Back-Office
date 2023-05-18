import React from "react";
import ExitForm from "../../svgs/ExitForm";
import Button from "@mui/material/Button";
function ConfirmValidation({ setShowConfirmValidation, livraisonID }) {
  return (
    <div className="grayout">
      <div className="confirmation_form_wrap">
        <div className="ajout_header1">
          Livraison #{livraisonID}
          <i
            className="cursor-pointer transform scale-75"
            onClick={() => {
              setShowConfirmValidation(false);
            }}
          >
            <ExitForm />
          </i>
        </div>
        <div className=" h-[1px] w-full bg-[#F2F2F2] my-3"></div>
        <div className="confirmation_body mt-8">
          Vous etes sur de vouloir Valider cette livraison ?
          <div className="flex justify-center items-center mt-8 gap-4">
            <Button
              className="mobile:!text-xs"
              variant="outlined"
              onClick={() => {
                setShowConfirmValidation(false);
              }}
              sx={{
                width: 160,
                height: 40,
                color: "#3F0291",
                border: "1px solid #3F0291",
                "border-radius": "6px",
              }}
            >
              Annuler
            </Button>
            <Button
              className="mobile:!text-xs"
              type="submit"
              variant="contained"
              onClick={() => {
                // eslint-disable-next-line no-lone-blocks
                {
                  /*Validation de livraison*/
                }
              }}
              sx={{
                width: 160,
                height: 40,
                "background-color": "#3F0291",
                "border-radius": "6px",
              }}
            >
              Confirmer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmValidation;
