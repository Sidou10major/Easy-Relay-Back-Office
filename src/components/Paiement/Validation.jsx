import React from "react";
import ExitForm from "../../svgs/ExitForm";
import Button from "@mui/material/Button";
import BeatLoader from "react-spinners/BeatLoader";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
function Validation({ setShowValidation, paiementID, setRefresh }) {
  const { id_vendeur } = useSelector((state) => state.vendeur);
  const [loading, setLoading] = useState(false);

  const handleValidation = async () => {
    setLoading(true);
    const response = await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=validate_paiement&id_vendeur=${id_vendeur}&id_paiement=${paiementID}`
      )
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    if (response) {
      if (response.data.response) {
        console.log(response.data);
        setLoading(false);
        setShowValidation(false);
        setRefresh((old) => !old);
      }
    }
  };
  return (
    <div className="grayout">
      <div className="confirmation_form_wrap w-[432px] mobile:w-[332px]">
        <div className="ajout_header1">
          Paiement {paiementID}
          <i
            className="cursor-pointer transform scale-75"
            onClick={() => {
              setShowValidation(false);
            }}
          >
            <ExitForm />
          </i>
        </div>
        <div className=" h-[1px] w-full bg-[#F2F2F2] my-3"></div>
        <Formik
          initialValues={{}}
          enableReinitialize
          onSubmit={handleValidation}
        >
          {(formik) => (
            <Form>
              <div className="flex flex-col text-center w-full text-xl font-bold">
                Est-ce que vous voulez valider ce paiement ?
                <div className="flex flex-row justify-center gap-4 mt-4 items-center">
                  <Button
                    className="mobile:!text-xs"
                    variant="outlined"
                    onClick={() => {
                      setShowValidation(false);
                    }}
                    sx={{
                      width: 192,
                      height: 48,
                      color: "#3F0291",
                      border: "1px solid #3F0291",
                      borderRadius: "6px",
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    className="mobile:!text-xs"
                    variant="contained"
                    sx={{
                      width: 192,
                      height: 48,
                      backgroundColor: "#3F0291",
                      borderRadius: "6px",
                    }}
                  >
                    Confirmer
                  </Button>
                </div>
                {loading && (
                  <div className="flex flex-row justify-center items-center itmes-center my-4">
                    <BeatLoader color="#3F0291" loading={loading} size={10} />
                  </div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Validation;
