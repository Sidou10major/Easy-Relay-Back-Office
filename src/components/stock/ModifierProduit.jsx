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

function ModifierProduit({
  setShowModifierProduit,
  produitAmodifier,
  setRefresh,
}) {
  const [error, setError] = useState();
  const { id_vendeur } = useSelector((state) => state.vendeur);
  //const id_vendeur = 23; // juste pour le moment
  const init_produit = {
    id_produit: produitAmodifier.id || "",
    reference: produitAmodifier.reference || "",
    qty: produitAmodifier.qty || "",
    label: produitAmodifier.label || "",
    prix_achat: produitAmodifier.prix_achat || "",
    prix_vente: produitAmodifier.prix || "",
  };
  const [produit, setProduit] = useState(init_produit); // state pour un produit
  const { label, reference, prix_vente, prix_achat, qty } = produit;
  //const [attributs, setAttributs] = useState(init_produit.attributs); // pour les données de la table des attributs
  const [loading, setLoading] = useState(false);
  // const [selectedAttributes, setSelectedAttributes] = useState(() => {
  //   const arr = []; // extract selected attributs from initial data (could change depending on the API)
  //   Object.keys(init_produit.attributs[0]).forEach((att) => {
  //     if (att !== "quantite" && att !== "prix") {
  //       arr.push(att);
  //     }
  //   });
  //   return arr;
  // }); // pour les attributs selectionnés pour ce type de produit
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
    setError("");
    const response = await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=update_produit&id_vendeur=${id_vendeur}`,
        produit
      )
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.response.data.content === "produit not updated") {
          setError("vous n'avaez pas modifier le produit");
        }
      });
    if (response) {
      if (response.data.response) {
        setLoading(false);
        setShowModifierProduit(false);
        //refresh products table
        setRefresh((old) => !old);
      }
    }
  };
  // const attributs_options = [
  //   { value: "couleur", label: "Couleur" },
  //   { value: "taille", label: "Taille" }, // + la liste exhaustive
  //   // pour le moment on n'a pas d'attributs dans le backend :(
  // ];
  const mobile = useMediaQuery({
    query: "(max-width : 480px)",
  });
  const buttonWidth = mobile ? 140 : 192;
  const buttonHeight = mobile ? 40 : 48;
  return (
    <div className="grayout">
      <div className="ajout_produit_wrap !w-fit mobile:!w-[325px]">
        <div className="ajout_header1">
          modifier le produit #{produitAmodifier.id}
          <i
            className="cursor-pointer transform scale-75"
            onClick={() => {
              setShowModifierProduit(false);
            }}
          >
            <ExitForm />
          </i>
        </div>
        <div className=" h-[1px] w-full bg-[#F2F2F2] my-2"></div>
        <Formik
          initialValues={{
            label,
            reference,
            prix_vente,
            prix_achat,
            qty,
          }}
          validatoinSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form className="grid grid-cols-[min-content_auto] mobile:grid-cols-[min-content]">
              {/* ajouter gap-4 si on retourne le tableau */}
              <div className="ajout_produit_col1">
                <FormInput
                  type="text"
                  name="reference"
                  placeholder="Référence"
                  size={mobile ? "" : "large"}
                  onChange={handleChange}
                />
                {/* <SelectMulti  // on cahe les inputs relatives au attributs car on n'a pas ca sur le backend
                    placeholder="selectionner les attributs"
                    title="Attributs"
                    width={400}
                    height={72}
                    options={attributs_options}
                    setSelectedAttributes={setSelectedAttributes}
                    selectedAttributes={selectedAttributes}
                  /> */}
                <FormInput
                  type="text"
                  name="label"
                  placeholder="Description"
                  size={mobile ? "" : "large"}
                  onChange={handleChange}
                />
                <div
                  className="flex flex-row items-center justify-center mobile:justify-start 
                  mobile:gap-[18px] mb-3 gap-4"
                >
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
                    className="mobile:!text-xs"
                    variant="outlined"
                    onClick={() => {
                      setShowModifierProduit(false);
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
                    className="mobile:!text-xs"
                    type="submit"
                    variant="contained"
                    sx={{
                      width: buttonWidth,
                      height: buttonHeight,
                      backgroundColor: "#3F0291",
                      borderRadius: "6px",
                    }}
                  >
                    Modifier
                  </Button>
                </div>
                {loading && (
                  <div className="flex flex-row justify-center itmes-center my-4">
                    <BeatLoader color="#3F0291" loading={loading} size={10} />
                  </div>
                )}
              </div>
              {/* pour le moment on n'a pas d'attributs */}
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
        {error && (
          <div className="text-Red flex justify-center mt-3 w-full">
            {error}
          </div>
        )}
        <div className="ajout_produit_table"></div>
      </div>
    </div>
  );
}

export default ModifierProduit;
