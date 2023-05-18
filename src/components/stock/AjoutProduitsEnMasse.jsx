import React from "react";
import ExitForm from "../../svgs/ExitForm";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import { useState, useRef } from "react";
function AjoutProduitsEnMasse({ setshowAjoutProduitsEnMasse }) {
  const [fileName, setFileName] = useState(false);
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }
    // reset file input
    event.target.value = null;
    // can still access file object here
    setFileName(file.name);
  };
  return (
    <div className="grayout">
      <div className="confirmation_form_wrap">
        <div className="ajout_header1">
          Ajout des produits en masse
          <i
            className="cursor-pointer transform scale-75"
            onClick={() => {
              setshowAjoutProduitsEnMasse(false);
            }}
          >
            <ExitForm />
          </i>
        </div>
        <div className=" h-[1px] w-full bg-[#F2F2F2] my-3"></div>
        <div className="confirmation_body mt-4 text-xs font-normal">
          Selectionner un fichier Excel contenant les produits à ajouter
          <Formik initialValues={{ file: "" }} onSubmit={() => {}}>
            {(formProps) => (
              <Form className="flex flex-row justify-center  gap-4 mt-4">
                <div className="input_wrap text-left px-2 pt-1 w-40 h-10">
                  <div className=" text-[10px] text-[#707070] font-normal mt-[-3px]">
                    Fichier
                  </div>
                  <div className="font-bold text-sm mt-[-5px]">
                    {" "}
                    {fileName ? fileName : "Aucun fichier"}
                  </div>
                </div>
                <input
                  type="file"
                  name="file"
                  ref={inputRef}
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  hidden
                  onChange={handleFileChange}
                />
                <Button
                  variant="contained"
                  onClick={handleClick}
                  sx={{
                    width: 160,
                    height: 40,
                    "background-color": "#3F0291",
                    "border-radius": "6px",
                  }}
                >
                  Uploader
                </Button>
              </Form>
            )}
          </Formik>
          <div className="flex justify-center items-center mt-4 gap-4">
            <Button
              variant="outlined"
              onClick={() => {}}
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
              type="submit"
              variant="outlined"
              onClick={() => {
                // eslint-disable-next-line no-lone-blocks
                {
                  /*sous mettre le fichier au backend*/
                }
              }}
              sx={{
                width: 160,
                height: 40,
                color: "#3F0291",
                border: "1px solid #3F0291",
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

export default AjoutProduitsEnMasse;
