import ExitForm from "../../svgs/ExitForm";
import FormInput from "../../components/inputs/FormInput";
import { useState } from "react";
import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import * as yup from "yup";

function AjoutProduit({ setShowAjoutProduit, setRefresh }) {
  const { id_vendeur } = useSelector((state) => state.vendeur);
  const init_produit = {
    reference: "",
    qty: "",
    label: "",
    prix_achat: "",
    prix_vente: "",
  };
  const [produit, setProduit] = useState(init_produit); // state pour un produit
  const { reference, qty, label, prix_achat, prix_vente } = produit;
  const [loading, setLoading] = useState(false);
  //const [attributs, setAttributs] = useState([]); // pour les données de la table des attributs
  //const [selectedAttributes, setSelectedAttributes] = useState([]); // pour les attributs selectionnés pour ce type de produit
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduit({ ...produit, [name]: value });
  };
  // handle selected attributes change with useEffect{
  // useEffect(() => {
  //   setProduit({ ...produit, attributs: selectedAttributes });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedAttributes]);

  const validationSchema = yup.object({
    reference: yup.string().required("*"),
    qty: yup.number().required("*"),
    label: yup.string().required("*"),
    prix_achat: yup.number().required("*"),
    prix_vente: yup.number().required("*"),
  });

  const handleSubmit = async () => {
    setLoading(true);
    const response = await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=add_produit&id_vendeur=${id_vendeur}`,
        produit
      )
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    if (response) {
      if (response.data.response) {
        setLoading(false);
        setShowAjoutProduit(false);
        setRefresh((old) => !old);
        //refresh products table programatically if possible
      }
    }
  };
  // const attributs_options = [
  //   { value: "couleur", label: "Couleur" },
  //   { value: "taille", label: "Taille" },
  // ];
  const mobile = useMediaQuery({
    query: "(max-width : 480px)",
  });
  const buttonWidth = mobile ? 140 : 192;
  const buttonHeight = mobile ? 40 : 48;
  return (
    <div className="grayout">
      <div className="ajout_produit_wrap !w-fit mobile:!w-[325px] ">
        <div className="ajout_header1">
          Ajouter un nouveau produit
          <i
            className="cursor-pointer transform scale-75"
            onClick={() => {
              setShowAjoutProduit(false);
            }}
          >
            <ExitForm />
          </i>
        </div>
        <div className=" h-[1px] w-full bg-[#F2F2F2] my-2"></div>
        <div className="ajout_produit_body">
          <Formik
            initialValues={{
              reference,
              qty,
              label,
              prix_achat,
              prix_vente,
            }}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form className="grid grid-flow-row grid-cols-[min-content_auto] mobile:grid-cols-[min-content]">
                {/* return the gap-4 if use table attributs */}
                <div className="ajout_produit_col1">
                  <FormInput
                    type="text"
                    name="reference"
                    placeholder="Référence"
                    size={mobile ? "" : "large"}
                    onChange={handleChange}
                  />
                  {/* <SelectMulti
                    placeholder="selectionner les attributs"
                    title="Attributs"
                    width={400}
                    height={72}
                    options={attributs_options}
                    setSelectedAttributes={setSelectedAttributes}
                  /> */}
                  <FormInput
                    type="text"
                    name="label"
                    placeholder="Description"
                    size={mobile ? "" : "large"}
                    onChange={handleChange}
                  />
                  <div className="flex flex-row items-center justify-center mb-3 gap-4">
                    <FormInput
                      type="number"
                      name="prix_vente"
                      placeholder="Prix de vente"
                      size={mobile ? "small" : "medium"}
                      onChange={handleChange}
                    />
                    <FormInput
                      type="number"
                      name="prix_achat"
                      placeholder="Prix d'achat"
                      size="small"
                      onChange={handleChange}
                    />

                    <FormInput
                      type="number"
                      name="qty"
                      placeholder="Quantité"
                      size="small"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex  mt-3 gap-4">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setShowAjoutProduit(false);
                      }}
                      sx={{
                        width: buttonWidth,
                        height: buttonHeight,
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
                      sx={{
                        width: buttonWidth,
                        height: buttonHeight,
                        backgroundColor: "#3F0291",
                        borderRadius: "6px",
                      }}
                    >
                      Enregistrer
                    </Button>
                  </div>
                  {loading && (
                    <div className="flex flex-row justify-center itmes-center my-4">
                      <BeatLoader color="#3F0291" loading={loading} size={10} />
                    </div>
                  )}
                </div>
                {/* <div className="ajout_produit_col2">
                  <TableAttributs
                    attributs={attributs}
                    setAttributs={setAttributs}
                    selectedAttributes={selectedAttributes}
                  />
                </div> */}
              </Form>
            )}
          </Formik>
          <div className="ajout_produit_table"></div>
        </div>
      </div>
    </div>
  );
}

export default AjoutProduit;
