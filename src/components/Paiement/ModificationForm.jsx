import React from "react";
import ExitForm from "../../svgs/ExitForm";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import { useState } from "react";
import FormInput from "../inputs/FormInput";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import * as yup from "yup";
import { useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import FormSelect from "../inputs/FormSelect";
import {
  formatWilayasCommunes,
  formatWilayasInverse,
} from "../../helpers/HelperFunctions";
import { useEffect } from "react";
function ModificationForm({ setShowModificationForm, Prixdata, setRefresh }) {
  const initialprix = {
    id: Prixdata.id || 0,
    depart: Prixdata.depart || "",
    arrive: Prixdata.arrive || "",
    tarif: Prixdata.tarif || 0,
  };
  const { id_vendeur } = useSelector((state) => state.vendeur);
  const [data, setData] = useState(initialprix);
  const [wilayas, setWilayas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const tarif = data.tarif;
  const depart = data.depart;
  const arrive = data.arrive;
  const handlechange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const handleDataChange = async () => {
    setLoading(true);
    setError("");
    let newTarif = {};
    if (
      initialprix.depart === data.depart &&
      initialprix.arrive !== data.arrive
    ) {
      newTarif = formatWilayasInverse(wilayas, data, 1);
    } else if (
      initialprix.arrive === data.arrive &&
      initialprix.depart !== data.depart
    ) {
      newTarif = formatWilayasInverse(wilayas, data, 2);
    } else if (
      initialprix.depart === data.depart &&
      initialprix.arrive === data.arrive
    ) {
      newTarif = formatWilayasInverse(wilayas, data, 3);
    } else {
      newTarif = data;
    }
    console.log(newTarif);
    const response = await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=update_tarif_livraison&id_vendeur=${id_vendeur}`,
        {
          id: newTarif.id,
          tarif: newTarif.tarif,
          depart: newTarif.depart,
          arrive: newTarif.arrive,
        }
      )
      .catch((error) => {
        console.log(error);
        if (error.response.data.content === "Tarif not updated") {
          setLoading(false);
          setError("vous n'avaez pas modifier le tarif");
        }
      });
    if (response) {
      setLoading(false);
      setShowModificationForm(false);
      setRefresh((old) => !old);
    }
  };
  const mobile = useMediaQuery({
    query: "(max-width : 480px)",
  });
  const buttonWidth = mobile ? 300 : 192;
  const [wilayaOptions, setWilayaOptions] = useState([]);
  const fetchWilayas = async () => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=get_wilayas&id_vendeur=${id_vendeur}`
      )
      .catch((error) => console.log(error));
    if (response.data.response) {
      setWilayas(response.data.content);
      const wilayas = formatWilayasCommunes(response.data.content);
      setWilayaOptions(wilayas);
    }
  };
  useEffect(() => {
    fetchWilayas();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [wilayaDepart, setWilayaDepart] = useState(data.depart);
  useEffect(() => {
    setData({ ...data, depart: wilayaDepart });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wilayaDepart]);
  const [wilayaArrivee, setWilayaArrivee] = useState(data.arrive);
  useEffect(() => {
    setData({ ...data, arrive: wilayaArrivee });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wilayaArrivee]);
  const validationSchema = yup.object({
    depart: yup.string().required("*"),
    arrive: yup.string().required("*"),
    tarif: yup.number().required("*"),
  });
  return (
    <div className="grayout">
      <div className="ajout_form_wrap w-fit">
        <div className="ajout_header1">
          Prix de livraison #{Prixdata.id}
          <i
            className="cursor-pointer transform scale-75"
            onClick={() => {
              setShowModificationForm(false);
            }}
          >
            <ExitForm />
          </i>
        </div>

        <div className=" h-[1px] w-full bg-[#F2F2F2] my-3"></div>
        <Formik
          enableReinitialize
          initialValues={{
            depart,
            arrive,
            tarif,
          }}
          validationSchema={validationSchema}
          onSubmit={handleDataChange}
        >
          {(formik) => (
            <Form className="flex flex-col justify-start gap-4">
              <div className="grid-col1">
                <div className="flex flex-row justify-center items-center gap-4 mobile:flex-col">
                  <FormSelect
                    placeholder={depart ? depart : Prixdata.depart}
                    title="Départ"
                    name="depart"
                    formik={formik}
                    setValue={setWilayaDepart}
                    width={mobile ? 300 : 192}
                    options={wilayaOptions}
                    wilayaOnly
                  />
                  <FormSelect
                    placeholder={arrive ? arrive : Prixdata.arrive}
                    title="Arrivée"
                    name="arrive"
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
                    onChange={handlechange}
                  />
                </div>

                <div className="flex flex-row justify-start items-center gap-4 mt-4 mobile:flex-col">
                  {!mobile && (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setShowModificationForm(false);
                      }}
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
              {loading && (
                <div className="flex flex-row justify-center itmes-center my-4">
                  <BeatLoader color="#3F0291" loading={loading} size={10} />
                </div>
              )}
            </Form>
          )}
        </Formik>
        {error && (
          <div className="text-Red flex justify-center mt-3 w-full">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
export default ModificationForm;
