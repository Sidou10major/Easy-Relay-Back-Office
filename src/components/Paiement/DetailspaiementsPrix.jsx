import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import ExitForm from "../../svgs/ExitForm";
import FormInput from "../inputs/FormInput";
import FormSelect from "../inputs/FormSelect";
import "../../pages/Paiements/style.css";
import BeatLoader from "react-spinners/BeatLoader";
import { useMediaQuery } from "react-responsive";
function DetailspaiementsPrix({ setShowDetailPaie, paiementToRead }) {
  // state and handle change for commande info
  const mobile = useMediaQuery({ query: "(max-width : 480px" });
  const [paiement] = useState(paiementToRead);
  const {
    id,
    date_creation,
    etat_paiement,
    nom_admin,
    nom_vendeur,
    paiement_vendeur,
    prestation_er,
  } = paiement;
  // pour sortir du formulaire quand en clique sur exit ou annuler
  const exitForm = () => {
    setShowDetailPaie(false);
  };
  const [submissionLoading] = useState(false);
  useEffect(() => {
  }, [paiement]);
  // submission function
  return (
    <div className="grayout">
      <div className="ajout_form_wrap w-fit">
        <div className="ajout_header1">
          Détailles du paiement {id}
          <i className="cursor-pointer transform scale-75" onClick={exitForm}>
            <ExitForm />
          </i>
        </div>

        <div className=" h-[1px] w-full bg-[#F2F2F2] my-3"></div>
        <Formik
          enableReinitialize
          initialValues={{
            date_creation,
            etat_paiement,
            nom_admin,
            nom_vendeur,
            paiement_vendeur,
            prestation_er,
          }}
        >
          {(formik) => (
            <Form className="flex flex-col justify-start gap-4">
              <div className="grid-col1">
                <div className="mb-3">
                  <FormSelect
                    placeholder={etat_paiement ? etat_paiement : ""}
                    title="État"
                    name="etat_paiement"
                    formik={formik}
                    width={mobile ? 300 : 400}
                    disabled
                  />
                </div>
                <FormInput
                  type="text"
                  name="date_creation"
                  placeholder="Date de création"
                  size={mobile ? "" : "large"}
                  disabled
                />

                <div className="flex flex-row justify-center items-center gap-4 mt-3 mobile:flex-col">
                  <FormInput
                    type="text"
                    name="nom_admin"
                    placeholder="Nom d'admin"
                    size={mobile ? "" : "medium"}
                    disabled
                  />
                  <FormInput
                    type="text"
                    name="nom_vendeur"
                    placeholder="Nom de vendeur"
                    size={mobile ? "" : "medium"}
                    disabled
                  />
                </div>
                <div className="flex flex-row justify-center items-center gap-4 mt-3">
                  <FormInput
                    type="number"
                    name="paiement_vendeur"
                    placeholder="Paiement de vendeur"
                    size={mobile ? "mid" : "medium"}
                    disabled
                  />
                  <FormInput
                    type="number"
                    name="prestation_er"
                    placeholder="Prestation"
                    size={mobile ? "mid" : "medium"}
                    disabled
                  />
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
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default DetailspaiementsPrix;
