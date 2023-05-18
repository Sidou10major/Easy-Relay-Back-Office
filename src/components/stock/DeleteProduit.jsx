import React from "react";
import ExitForm from "../../svgs/ExitForm";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
function DeleteProduit({ setshowConfirmDeletion, produitId, setRefresh }) {
  const { id_vendeur } = useSelector((state) => state.vendeur);
  //const id_vendeur = 23;
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    const id = produitId.toString();
    const response = await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=delete_produit&id_vendeur=${id_vendeur}`,
        { id_produit: id }
      )
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    if (response) {
      if (response.data.response) {
        setLoading(false);
        setshowConfirmDeletion(false);
        //refresh products table programatically if possible
        setRefresh((old) => !old);
      }
    }
  };
  return (
    <div className="grayout">
      <div className="confirmation_form_wrap">
        <div className="ajout_header1">
          Produit #{produitId}
          <i
            className="cursor-pointer trasform scale-75"
            onClick={() => {
              setshowConfirmDeletion(false);
            }}
          >
            <ExitForm />
          </i>
        </div>
        <div className=" h-[1px] w-full bg-[#F2F2F2] my-3"></div>
        <div className="confirmation_body mt-8">
          Vous etes sur de vouloir supprimer ce produit ?
          <div className="flex justify-center items-center mt-8 gap-4">
            <Button
              variant="outlined"
              onClick={() => {
                setshowConfirmDeletion(false);
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
              type="submit"
              variant="contained"
              onClick={handleDelete}
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

export default DeleteProduit;
