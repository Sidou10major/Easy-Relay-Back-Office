import { Formik, Form } from "formik";
import { useState } from "react";
import ExitForm from "../../svgs/ExitForm";
import FormInput from "../inputs/FormInput";
import FormSelect from "../inputs/FormSelect";
import "../../pages/Commandes/style.css";
import AdresseSelect from "../inputs/AdresseSelect";
import Button from "@mui/material/Button";
import { useMediaQuery } from "react-responsive";

function Details({ setShowDetails, livraison }) {
  const typeOptions = [
    { id: "0", value: "std", label: "Standard à domicile" },
    { id: "1", value: "exp", label: "Expresse à domicile" },
    { id: "2", value: "pr", label: "Point relais" },
    { id: "3", value: "ret", label: "Retour a domicile" },
    { id: "4", value: "pr ret", label: "Retour point relais" },
    { id: "5", value: "exch", label: "Echange" },
  ];
  const type = typeOptions.find(
    (option) => option.value === livraison.type_service
  );
  console.log(livraison);
  const initialCommande = {
    id: livraison.livraison_id || "",
    type_service: livraison.type_service || "",
    tracking: livraison.tracking || "",
    produit: livraison.produit || "",
    designation: livraison.designation || "",
    prix_unitaire: livraison.prix_panier / livraison.qty || "",
    quantite: livraison.qty || "",
    bon_achat: livraison.bon_achat || "",
    commantaire: livraison.commentaire || "",
    produit_a_donner: "",
    produit_a_collecter: "",
    somme_a_collecter: "",
    gabarit: livraison.gabarit || false,
    fragile: livraison.fragile || false,
    point_relais: livraison.rp_name + " , " + livraison.rp_adresse || "",
    prix_livraison: livraison.prix_livraison || "",
  };
  console.log(initialCommande);
  const initialClient = {
    nom_client: livraison.nom_client.split("-")[0] || "",
    prenom_client: livraison.nom_client.split("-")[1] || "",
    numero_tele: livraison.num_port_1 || "",
    wilaya_bureau: "",
    commune_bureau: "",
    adresse_bureau: "",
    wilaya_maison: livraison.nom_wilaya || "",
    commune_maison: livraison.nom_commune || "",
    adresse_maison: livraison.adresse_client || "",
  };
  // state and handle change for commande info
  const [commande] = useState(initialCommande);
  const {
    id,
    type_service,
    tracking,
    produit,
    prix_unitaire,
    quantite,
    bon_achat,
    commantaire,
    produit_a_donner,
    produit_a_collecter,
    somme_a_collecter,
    prix_livraison,
    point_relais,
    designation,
  } = commande;

  // state and handle change for client info
  const [client] = useState(initialClient);
  const {
    nom_client,
    prenom_client,
    numero_tele,
    adresse_bureau,
    wilaya_maison,
    commune_maison,
    adresse_maison,
  } = client;
  const PrOptions = [];
  const medium = useMediaQuery({
    query: "(max-width : 840px)",
  });
  const mobile = useMediaQuery({
    query: "(max-width : 480px)",
  });
  const submitButton = mobile ? 300 : 192;
  return (
    <div className="grayout">
      <div className="ajout_form_wrap medium:mt-80">
        <div className="ajout_header1">
          Détails de la livraison {livraison.livraison_id}
          <i
            className="cursor-pointer transform scale-75"
            onClick={() => {
              setShowDetails(false);
            }}
          >
            <ExitForm />
          </i>
        </div>
        <div className=" h-[1px] w-full bg-[#F2F2F2] my-3"></div>
        {!medium && (
          <div className="ajout_header2">
            <span>Details de la commande</span> <span>Details du client</span>
          </div>
        )}
        {!medium && <div className=" h-[1px] w-full bg-[#F2F2F2] my-3"></div>}
        <Formik
          enableReinitialize
          initialValues={{
            id,
            type_service,
            tracking,
            produit,
            prix_unitaire,
            quantite,
            bon_achat,
            commantaire,
            produit_a_donner,
            produit_a_collecter,
            somme_a_collecter,
            nom_client,
            prenom_client,
            numero_tele,
            adresse_bureau,
            adresse_maison,
            prix_livraison,
            point_relais,
            designation,
          }}
        >
          {(formik) => (
            <Form className="form_corps">
              <div className="grid-col1">
                {medium && (
                  <div className="font-bold text-base text-center">
                    <span>Detaille de la commande</span>
                  </div>
                )}
                {medium && (
                  <div className=" h-[1px] w-full bg-[#F2F2F2] my-3"></div>
                )}
                <div className="flex flex-row justify-center items-center gap-3 mobile:flex-col">
                  <FormSelect
                    placeholder={type.label}
                    title="Type"
                    name="type_service"
                    formik={formik}
                    width={mobile ? 300 : 200}
                    options={typeOptions}
                    disabled
                  />
                  <div className="flex flex-row justify-center gap-3">
                    <FormInput
                      type="number"
                      name="id"
                      placeholder="Id"
                      size={mobile ? "mid" : "small"}
                      disabled
                    />
                    <FormInput
                      type="text"
                      name="tracking"
                      placeholder="Tracking"
                      size={mobile ? "mid" : "small"}
                      disabled
                    />
                  </div>
                </div>
                {(type_service === null ||
                  type_service === "std" ||
                  type_service === "exp" ||
                  type_service === "pr" ||
                  type_service === "ret" ||
                  type_service === "pr ret") && (
                  <>
                    <div className="flex justify-center items-center my-3">
                      <FormInput
                        type="text"
                        name="produit"
                        placeholder="Produit"
                        size={mobile ? "" : "large"}
                        disabled
                      />
                    </div>
                    <div className="flex justify-center items-center my-3">
                      <FormInput
                        type="text"
                        name="designation"
                        placeholder="Designation Produit"
                        size={mobile ? "" : "large"}
                        disabled
                      />
                    </div>
                  </>
                )}
                <div
                  className={
                    type_service === "ret" || type_service === "pr ret"
                      ? "flex flex-row items-center justify-start ml-2 mb-3 mobile:flex-col"
                      : "flex flex-row items-center justify-center mb-3 gap-4 mobile:flex-col"
                  }
                >
                  <div className="flex flex-row items-center justify-start gap-4">
                    {(type_service === null ||
                      type_service === "std" ||
                      type_service === "exp" ||
                      type_service === "pr") && (
                      <FormInput
                        type="number"
                        name="prix_unitaire"
                        placeholder="Prix"
                        size={mobile ? "mid" : "medium"}
                        disabled
                      />
                    )}
                    {(type_service === null ||
                      type_service === "std" ||
                      type_service === "exp" ||
                      type_service === "pr" ||
                      type_service === "ret" ||
                      type_service === "pr ret") && (
                      <FormInput
                        type="number"
                        name="quantite"
                        placeholder="Quantité"
                        size={
                          mobile &&
                          (type_service === "ret" || type_service === "pr ret")
                            ? ""
                            : (type_service === null ||
                                type_service === "std" ||
                                type_service === "exp" ||
                                type_service === "pr") &&
                              mobile
                            ? "mid"
                            : "medium"
                        }
                        disabled
                      />
                    )}
                  </div>
                  {/* {(type_service === null ||
                    type_service === "std" ||
                    type_service === "exp" ||
                    type_service === "pr") && (
                    <FormInput
                      type="text"
                      name="bon_achat"
                      placeholder="Bon d'achat"
                      size={mobile ? "" : "medium"}
                      disabled
                    />
                  )} */}
                </div>
                <div className="flex flex-col items-center justify-center">
                  {type_service === "exch" && (
                    <div className="flex justify-center items-center my-3">
                      <FormInput
                        type="text"
                        name="produit_a_donner"
                        placeholder="Produit a donner"
                        size={mobile ? "" : "large"}
                        disabled
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center">
                  {type_service === "exch" && (
                    <div className="flex justify-center items-center">
                      <FormInput
                        type="text"
                        name="produit_a_recuperer"
                        placeholder="Produit a récupérer"
                        width={mobile ? 300 : 400}
                        disabled
                      />
                    </div>
                  )}
                  {(type_service === "pr" || type_service === "pr ret") && (
                    <FormSelect
                      placeholder={point_relais}
                      title="Point relais"
                      name="point_relais"
                      formik={formik}
                      width={mobile ? 300 : 400}
                      options={PrOptions}
                      disabled
                    />
                  )}
                </div>

                {type_service === "exch" && (
                  <div className="flex justify-start items-center my-3 m-2">
                    <FormInput
                      type="text"
                      name="somme_a_collecter"
                      placeholder="Somme a collecter"
                      size={mobile ? "" : "medium"}
                      disabled
                    />
                  </div>
                )}

                {/* <div className="flex flex-row gap-4 justify-start items-center ">
                  <Checkbox
                    sx={{
                      color: "#000000",
                      "&.Mui-checked": {
                        color: "#3F0291",
                      },
                    }}
                    size="small"
                    checked={gabarit}
                  />
                  Gabarit
                  <Checkbox
                    sx={{
                      color: "#000000",
                      "&.Mui-checked": {
                        color: "#3F0291",
                      },
                    }}
                    size="small"
                    checked={fragile}
                  />
                  Fragil
                </div> */}
                <div className="flex flex-row justify-evenly gap-4 my-3 ">
                  <FormInput
                    type="text"
                    name="commentaire"
                    placeholder="Commentaire"
                    size={mobile ? "" : "large"}
                    high
                    disabled
                  />
                </div>
              </div>

              <div className="grid_col2">
                {medium && (
                  <div className="font-bold text-base text-center">
                    <span>Detaille du client</span>
                  </div>
                )}
                {medium && (
                  <div className=" h-[1px] w-full bg-[#F2F2F2] my-3"></div>
                )}
                <div className="flex flex-row justify-center items-center gap-4 mobile:flex-col">
                  <FormInput
                    type="text"
                    name="nom_client"
                    placeholder="Nom du client"
                    size={mobile ? "" : "medium"}
                    disabled
                  />
                  <FormInput
                    type="text"
                    name="prenom_client"
                    placeholder="Prénom du client"
                    size={mobile ? "" : "medium"}
                    disabled
                  />
                </div>
                <div className="flex justify-center items-center mt-3">
                  <FormInput
                    type="phone"
                    name="numero_tele"
                    placeholder="Numero de Téléphone"
                    size={mobile ? "" : "large"}
                    disabled
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <AdresseSelect
                    name="selection"
                    formik={formik}
                    wilaya={wilaya_maison}
                    commune={commune_maison}
                    adresse={adresse_maison}
                    disabled
                  />
                </div>
                <div className="flex justify-center items-center mt-3 gap-4 mobile:flex-col">
                  <FormInput
                    type="number"
                    name="prix_livraison"
                    placeholder="Prix de livraison (DA)"
                    size={mobile ? "" : "medium"}
                    disabled
                  />
                  <Button
                    variant="outlined"
                    sx={{
                      //fix outline color
                      width: submitButton,
                      height: 48,
                      color: "#3F0291",
                      border: "1px solid #3F0291",
                      borderRadius: "6px",
                    }}
                  >
                    Imprimer BL
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Details;
