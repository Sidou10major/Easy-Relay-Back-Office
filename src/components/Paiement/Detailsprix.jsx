import { Formik, Form } from "formik";
import { useState } from "react";
import ExitForm from "../../svgs/ExitForm";
import FormInput from "../inputs/FormInput";
import "../../pages/Paiements/style.css";
import BeatLoader from "react-spinners/BeatLoader";
import { useMediaQuery } from "react-responsive";
function Detailsprix({ setShowDetail, prix }) {
  const mobile = useMediaQuery({
    query: "(max-width : 480px)",
  });
  // state and handle change for commande info
  const initialPrix = {
    depart: prix.depart,
    arrivee: prix.arrive,
    tarif: prix.tarif,
  };
  const [price] = useState(initialPrix);
  const { depart, arrivee, tarif } = price;
  // pour sortir du formulaire quand en clique sur exit ou annuler
  const exitForm = () => {
    setShowDetail(false);
  };
  const [submissionLoading] = useState(false);
  // submission function

  return (
    <div className="grayout">
      <div className="ajout_form_wrap !w-fit">
        <div className="ajout_header1">
          Détailles du prix livraison {prix.id}
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
        >
          {(formik) => (
            <Form className="flex flex-col justify-start gap-4">
              <div className="grid-col1">
                <div className="flex flex-row justify-center items-center gap-4 mobile:flex-col ">
                  <FormInput
                    type="text"
                    name="depart"
                    placeholder="Départ"
                    size={mobile ? "" : "medium"}
                    disabled
                  />

                  <FormInput
                    type="text"
                    name="arrivee"
                    placeholder="Arrivée"
                    size={mobile ? "" : "medium"}
                    disabled
                  />
                </div>
                <div className="flex flex-row justify-start mobile:justify-center items-center gap-4 mt-3">
                  <FormInput
                    type="number"
                    name="tarif"
                    placeholder="Tarif (DA)"
                    size={mobile ? "" : "medium"}
                    disabled
                  />
                </div>
                {submissionLoading && (
                  <div className="flex flex-row justify-center  itmes-center my-4">
                    <BeatLoader
                      color="#3F0291"
                      loading={submissionLoading}
                      size={10}
                    />
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

export default Detailsprix;
