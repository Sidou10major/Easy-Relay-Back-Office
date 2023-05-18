import React from "react";
import ExitForm from "../../svgs/ExitForm";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import FormInput from "../inputs/FormInput";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import { useMediaQuery } from "react-responsive";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { formatProductOptions } from "../../helpers/HelperFunctions";
import FormSelect from "../inputs/FormSelect";
function ModificationForm({
  setShowModificationForm,
  livraisonData,
  setRefresh,
}) {
  const initialData = {
    quantite: livraisonData.qty || 0,
    id_produit: "",
    ref_produit: livraisonData.produit || "",
    nom_produit: livraisonData.designation || "",
    prix_unitaire: livraisonData.prix_panier / livraisonData.qty || 0,
    prix_livraison: livraisonData.prix_livraison || 0,
  };
  console.log(livraisonData);
  const { id_vendeur } = useSelector((state) => state.vendeur);
  const [data, setData] = useState(initialData);
  console.log(data);
  const [loading, setLoading] = useState(false);
  const { quantite, id_produit, nom_produit, prix_unitaire, prix_livraison } =
    data;
  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const validation = yup.object({
    nom_produit: yup.string().required("*"),
    quantite: yup.string().required("*"),
    prix_unitaire: yup.number().required("*"),
    prix_livraison: yup.number().required("*"),
  });
  const handleDataSubmit = async () => {
    setLoading(true);
    console.log(data);
    const response = await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=update_livraison&id_vendeur=${id_vendeur}`,
        {
          id_livraison: livraisonData.livraison_id,
          qty: data.quantite,
          nom_produit: data.nom_produit,
          prix_panier: data.prix_unitaire * data.quantite,
          prix_livraison: data.prix_livraison,
          id_produit: data.id_produit,
        }
      )
      .catch((error) => console.log(error));
    if (response.data.response) {
      console.log(response);
      setLoading(false);
      setShowModificationForm(false);
      setRefresh((old) => !old);
    }
  };
  const mobile = useMediaQuery({
    query: "(max-width : 480px)",
  });

  const [productID, setProductID] = useState("");
  useEffect(() => {
    setData({
      ...data,
      id_produit: productID,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productID]);
  // options for product references
  const [productOptions, setProductOptions] = useState("");
  const fetchProductOptions = async () => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=produits_vendeur&id_vendeur=${id_vendeur}`
      )
      .catch((error) => {
        console.log(error);
      });
    if (response) {
      if (response.data.response) {
        const products = response.data.content;
        setProductOptions(formatProductOptions(products));
      }
    }
  };
  useEffect(() => {
    fetchProductOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="grayout">
      <div className="modification_form_wrap">
        <div className="ajout_header1">
          Livraison #{livraisonData.livraison_id}
          <i
            className="cursor-pointer transorm scale-75"
            onClick={() => {
              setShowModificationForm(false);
            }}
          >
            <ExitForm />
          </i>
        </div>
        <div className=" h-[1px] w-full bg-[#F2F2F2] my-1"></div>
        <Formik
          enableReinitialize
          initialValues={{
            quantite,
            nom_produit,
            id_produit,
            prix_unitaire,
            prix_livraison,
          }}
          validationSchema={validation}
          onSubmit={handleDataSubmit}
        >
          {(formik) => (
            <Form>
              <div className="flex justify-center items-center my-3">
                <FormSelect
                  placeholder={data.ref_produit ? data.ref_produit : ""}
                  title="Référence produit"
                  name="id_produit"
                  formik={formik}
                  setValue={setProductID}
                  width={mobile ? 300 : 400}
                  options={productOptions}
                  disabled
                />
              </div>
              <div className="flex justify-center items-center my-3">
                <FormInput
                  type="text"
                  name="nom_produit"
                  placeholder="Nom du produit"
                  size="large"
                  onChange={handleDataChange}
                />
              </div>
              <div className="flex flex-row justify-start gap-4">
                <FormInput
                  type="number"
                  name="prix_unitaire"
                  placeholder="Prix"
                  size="small"
                  onChange={handleDataChange}
                />

                <FormInput
                  type="number"
                  name="quantite"
                  placeholder="Quantité"
                  size="small"
                  onChange={handleDataChange}
                />
                <FormInput
                  type="number"
                  name="prix_livraison"
                  placeholder="Prix livraison"
                  size={mobile ? "small" : "medium"}
                  onChange={handleDataChange}
                />
              </div>
              <div className="flex justify-center items-center mt-8 gap-6">
                <Button
                  className="mobile:!text-xs"
                  variant="outlined"
                  onClick={() => {
                    setShowModificationForm(false);
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
                  className="mobile:!text-xs"
                  type="submit"
                  variant="contained"
                  sx={{
                    width: 192,
                    height: 48,
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ModificationForm;
