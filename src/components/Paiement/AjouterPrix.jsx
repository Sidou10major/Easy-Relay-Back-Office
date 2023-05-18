import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import ExitForm from "../../svgs/ExitForm";
import FormInput from "../inputs/FormInput";
import FormSelect from "../inputs/FormSelect";
import "../../pages/Paiements/style.css";
import BeatLoader from "react-spinners/BeatLoader";
import Button from "@mui/material/Button";
import axios from "axios";
import { formatWilayasCommunes } from "../../helpers/HelperFunctions";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import * as yup from "yup";
const initialPrix = {
  depart: "",
  arrivee: "",
  tarif: "",
};
function AjoutForm({ setShowAjoutForm, setRefresh }) {
  const { id_vendeur } = useSelector((state) => state.vendeur);
  const mobile = useMediaQuery({
    query: "(max-width : 480px)",
  });
  // state and handle change for commande info
  const [prix, setPrix] = useState(initialPrix);
  const { depart, arrivee, tarif } = prix;

  // pour sortir du formulaire quand en clique sur exit ou annuler
  const exitForm = () => {
    setShowAjoutForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrix({ ...prix, [name]: value });
  };
  const [wilayaDepart, setWilayaDepart] = useState("");
  useEffect(() => {
    setPrix({ ...prix, depart: wilayaDepart });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wilayaDepart]);
  const [wilayaArrivee, setWilayaArrivee] = useState("");
  useEffect(() => {
    setPrix({ ...prix, arrivee: wilayaArrivee });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wilayaArrivee]);

  const validationiSchema = yup.object({
    depart: yup.string().required("*"),
    arrivee: yup.string().required("*"),
    tarif: yup.number().required("*"),
  });

  const [submissionLoading, setSubmissionLoading] = useState(false);
  // submission function
  const ajoutSubmit = async () => {
    setSubmissionLoading(true);
    const response = await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=add_tarif_livraison_vendeur&id_vendeur=${id_vendeur}`,
        {
          depart: prix.depart,
          arrive: prix.arrivee,
          tarif: prix.tarif,
        }
      )
      .catch((error) => {
        console.log(error);
        setSubmissionLoading(false);
      });
    if (response) {
      setSubmissionLoading(false);
      setShowAjoutForm(false);
      setRefresh((old) => !old);
    }
  };
  const [wilayaOptions, setWilayaOptions] = useState([]);
  const fetchWilayas = async () => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=get_wilayas&id_vendeur=${id_vendeur}`
      )
      .catch((error) => console.log(error));
    if (response.data.response) {
      const wilayas = formatWilayasCommunes(response.data.content);
      setWilayaOptions(wilayas);
    }
  };
  useEffect(() => {
    fetchWilayas();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const buttonWidth = mobile ? 300 : 192;
  return (
    <div className="grayout">
      <div className="ajout_form_wrap w-fit">
        <div className="ajout_header1">
          Ajouter Un prix de livraison
          <i className="cursor-pointer transform scale-75" onClick={exitForm}>
            <ExitForm />
          </i>
        </div>

        <div className=" h-[1px] w-full bg-[#F2F2F2] my-3"></div>
        <Formik
          enableReinitialize
          initialValues={{
            depart,
            arrivee,
            tarif,
          }}
          validationSchema={validationiSchema}
          onSubmit={ajoutSubmit}
        >
          {(formik) => (
            <Form className="flex flex-col justify-start gap-4">
              <div className="grid-col1">
                <div className="flex flex-row justify-center items-center gap-4 mobile:flex-col">
                  <FormSelect
                    placeholder={depart ? depart : "wilaya de départ"}
                    title="Départ"
                    name="depart"
                    formik={formik}
                    setValue={setWilayaDepart}
                    width={mobile ? 300 : 192}
                    options={wilayaOptions}
                    wilayaOnly
                  />
                  <FormSelect
                    placeholder={arrivee ? arrivee : "wilaya d'arrivée"}
                    title="Arrivée"
                    name="arrivee"
                    formik={formik}
                    setValue={setWilayaArrivee}
                    width={mobile ? 300 : 192}
                    options={wilayaOptions}
                    wilayaOnly
                  />
                </div>
                <div className="flex flex-row justify-start mobile:justify-center items-center gap-4 mt-3">
                  <FormInput
                    type="number"
                    name="tarif"
                    title="Tarif (DA)"
                    placeholder="Tarif"
                    size={mobile ? "" : "medium"}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-row justify-start items-center gap-4 mt-4 mobile:flex-col">
                  {!mobile && (
                    <Button
                      variant="outlined"
                      onClick={exitForm}
                      sx={{
                        width: buttonWidth,
                        height: 48,
                        color: "#3F0291",
                        border: "1px solid #3F0291",
                        borderRadius: "6px",
                      }}
                    >
                      Annuler
                    </Button>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: buttonWidth,
                      height: 48,
                      backgroundColor: "#3F0291",
                      borderRadius: "6px",
                    }}
                  >
                    Enregistrer
                  </Button>
                </div>
              </div>
              {submissionLoading && (
                <div className="flex flex-row justify-center items-center itmes-center my-4">
                  <BeatLoader
                    color="#3F0291"
                    loading={submissionLoading}
                    size={10}
                  />
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AjoutForm;
