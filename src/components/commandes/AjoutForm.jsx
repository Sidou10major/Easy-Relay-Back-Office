import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import ExitForm from "../../svgs/ExitForm";
import FormInput from "../inputs/FormInput";
import FormSelect from "../inputs/FormSelect";
import "../../pages/Commandes/style.css";
import BeatLoader from "react-spinners/BeatLoader";
import AdresseSelect from "../inputs/AdresseSelect";
import Button from "@mui/material/Button";
import { Checkbox } from "@mui/material";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import * as yup from "yup";
import {
  formatPrOptions,
  formatProductOptions,
} from "../../helpers/HelperFunctions";
import { useSelector } from "react-redux";
const initialCommande = {
  id: "",
  type_service: "",
  tracking: "",
  id_produit: "",
  nom_produit: "",
  prix_unitaire: "",
  quantite: "",
  bon_achat: "",
  commantaire: "",
  produit_a_donner: "",
  produit_a_recuperer: "",
  somme_a_collecter: "",
  gabarit: "",
  fragile: "",
  point_relais: "",
  prix_livraison: "",
};
const initialClient = {
  nom_client: "",
  prenom_client: "",
  email: "",
  numero_tele: "",
  selection: "",
  wilaya_bureau: "",
  commune_bureau: "",
  adresse_bureau: "",
  wilaya_maison: "",
  commune_maison: "",
  adresse_maison: "",
};

function AjoutForm({ setShowAjoutForm, setRefresh }) {
  const { id_vendeur } = useSelector((state) => state.vendeur);
  // state and handle change for commande info
  const [prOptions, setPrOptions] = useState([]);
  const [commande, setCommande] = useState(initialCommande);
  const {
    type_service,
    nom_produit,
    prix_unitaire,
    quantite,
    bon_achat,
    commantaire,
    produit_a_donner,
    produit_a_recuperer,
    somme_a_collecter,
    point_relais,
    prix_livraison,
    id_produit,
  } = commande;
  const typeOptions = [
    { id: "0", value: "std", label: "Standard à domicile" },
    { id: "1", value: "exp", label: "Expresse à domicile" },
    { id: "2", value: "pr", label: "Point relais" },
    { id: "3", value: "ret", label: "Retour a domicile" },
    { id: "4", value: "pr ret", label: "Retour point relais" },
    { id: "5", value: "exch", label: "Echange" },
  ];
  const handleCommandeChange = (e) => {
    const { name, value } = e.target;
    setCommande({ ...commande, [name]: value });
  };
  const [typeValue, setTypeValue] = useState("");
  const [PrValue, setPrValue] = useState("");
  const [productID, setProductID] = useState("");
  useEffect(() => {
    if (typeValue === "pr" || typeValue === "pr ret") {
      setCommande({
        ...commande,
        type_service: typeValue,
        point_relais: PrValue,
      });
    } else {
      setCommande({ ...commande, type_service: typeValue });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeValue, PrValue]);
  useEffect(() => {
    setCommande({
      ...commande,
      id_produit: productID,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productID]);
  // state and handle change for client info
  const [client, setClient] = useState(initialClient);
  const {
    nom_client,
    prenom_client,
    email,
    numero_tele,
    commune_bureau,
    wilaya_maison,
    wilaya_bureau,
    commune_maison,
    adresse_bureau,
    adresse_maison,
    selection,
  } = client;
  const [place, setPlace] = useState("");
  const handleClientChange = (e) => {
    const { name, value } = e.target;
    if (name === "selection") {
      setPlace(value);
      setClient({ ...client, [name]: value });
      return;
    }
    setClient({ ...client, [name]: value });
  };
  // state and change handeling for commune and wilaya
  const [communeValue, setCommuneValue] = useState("");
  useEffect(() => {
    if (place) {
      if (place === "maison") {
        setClient({ ...client, commune_maison: communeValue });
      } else {
        if (place === "bureau") {
          setClient({ ...client, commune_bureau: communeValue });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communeValue]);

  const [wilayaValue, setWilayaValue] = useState("");
  useEffect(() => {
    if (place) {
      if (place === "maison") {
        setClient({ ...client, wilaya_maison: wilayaValue });
      } else {
        if (place === "bureau") {
          setClient({ ...client, wilaya_bureau: wilayaValue });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wilayaValue]);

  const gabaritChange = (e) => {
    setCommande({ ...commande, gabarit: e.target.checked });
  };
  const fragilChange = (e) => {
    setCommande({ ...commande, fragile: e.target.checked });
  };
  // pour sortir du formulaire quand en clique sur exit ou annuler
  const exitForm = () => {
    setShowAjoutForm(false);
  };
  const formValidation = yup.object({
    id_produit: yup.string().when("type_service", {
      is: (value) =>
        value === "std" ||
        value === "exp" ||
        value === "pr" ||
        value === "ret" ||
        value === "pr ret",
      then: yup.string().required("*"),
    }),
    nom_produit: yup.string().when("type_service", {
      is: (value) =>
        value === "std" ||
        value === "exp" ||
        value === "pr" ||
        value === "ret" ||
        value === "pr ret",
      then: yup.string().required("*"),
    }),
    prix_unitaire: yup.string().when("type_service", {
      is: (value) => value === "std" || value === "exp" || value === "pr",
      then: yup.string().required("*"),
    }),
    quantite: yup.string().when("type_service", {
      is: (value) =>
        value === "std" ||
        value === "exp" ||
        value === "pr" ||
        value === "ret" ||
        value === "pr ret",
      then: yup.string().required("*"),
    }),
    produit_a_donner: yup.string().when("type_service", {
      is: (value) => value === "exch",
      then: yup.string().required("*"),
    }),
    produit_a_recuperer: yup.string().when("type_service", {
      is: (value) => value === "exch",
      then: yup.string().required("*"),
    }),
    somme_a_collecter: yup.string().when("type_service", {
      is: (value) => value === "exch",
      then: yup.string().required("*"),
    }),
    point_relais: yup.string().when("type_service", {
      is: (value) => value === "pr" || value === "pr ret",
      then: yup.string().required("*"),
    }),
    nom_client: yup.string().required("*"),
    prenom_client: yup.string().required("*"),
    email: yup.string().email("Veuillez entrer un email valide").required("*"),
    numero_tele: yup.string().required("*"),
    prix_livraison: yup.number().required("*"),
    type_service: yup.string().required("*"),
    selection: yup.string().required("*"),
    wilaya_bureau: yup.string().when("selection", {
      is: (value) => value === "bureau",
      then: yup.string().required("*"),
    }),
    commune_bureau: yup.string().when("selection", {
      is: (value) => value === "bureau",
      then: yup.string().required("*"),
    }),
    wilaya_maison: yup.string().when("selection", {
      is: (value) => value === "maison",
      then: yup.string().required("*"),
    }),
    commune_maison: yup.string().when("selection", {
      is: (value) => value === "maison",
      then: yup.string().required("*"),
    }),
    adresse_bureau: yup.string().when("selection", {
      is: (value) => value === "bureau",
      then: yup.string().required("*"),
    }),
    adresse_maison: yup.string().when("selection", {
      is: (value) => value === "maison",
      then: yup.string().required("*"),
    }),
  });

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

  const [submissionLoading, setSubmissionLoading] = useState(false);
  // submission function
  // prettier-ignore
  const ajoutSubmit = async () => {
    const type = typeOptions.find((option) => option.value === commande.type_service);
    console.log(commande);
    console.log(client);
    setSubmissionLoading(true);
    const response = await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=create_livraison_vendeur&id_vendeur=${id_vendeur}`,
        {
          type_service_livraison: type.id,
          point_relais: commande.point_relais,
          gabarit: commande.gabarit ? 1 : 0,
          bureau: selection==="bureau" ? 1 : 0,
          fragile: commande.fragile ? 1 : 0,
          nom: client.nom_client,
          prenom: client.prenom_client,
          email: client.email,
          commune_livraison: client.adresse_bureau
            ? client.commune_bureau
            : client.commune_maison,
          wilaya_livraison: client.adresse_bureau
            ? client.wilaya_bureau
            : client.wilaya_maison,
          adresse_livraison: client.adresse_bureau
            ? client.adresse_bureau
            : client.adresse_maison,
          num_port_1: client.numero_tele,
          num_port_2: "",
          qty: commande.quantite || 0,
          prix_panier: commande.prix_unitaire * commande.quantite,
          prix_livraison: commande.prix_livraison,
          nom_produit: commande.nom_produit,
          id_produit:commande.id_produit,
        }
      )
      .catch((err) => console.log(err));
    if (response) {
      setSubmissionLoading(false); 
      console.log(response.data)
      setShowAjoutForm(false);
      //refresh livraison table programatically 
      setRefresh((old)=> !old);
    }
  };

  const medium = useMediaQuery({
    query: "(max-width : 840px)",
  });
  const mobile = useMediaQuery({
    query: "(max-width : 480px)",
  });
  const submitButton = mobile ? 300 : 192;

  const fetchPointsRelais = async () => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=get_pointRelay&id_vendeur=${id_vendeur}`
      )
      .catch((error) => console.log(error));
    if (response.data.response) {
      const prOptions = formatPrOptions(response.data.content);
      setPrOptions(prOptions);
    }
  };
  useEffect(() => {
    fetchPointsRelais();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grayout">
      <div className="ajout_form_wrap medium:mt-[450px]">
        <div className="ajout_header1">
          Ajouter une nouvelle commande
          <i className="cursor-pointer transform scale-75" onClick={exitForm}>
            <ExitForm />
          </i>
        </div>
        <div className=" h-[1px] w-full bg-[#F2F2F2] my-3"></div>
        {!medium && (
          <div className="ajout_header2">
            <span>Detaille de la commande</span> <span>Detaille du client</span>
          </div>
        )}
        {!medium && <div className=" h-[1px] w-full bg-[#F2F2F2] my-3"></div>}
        <Formik
          enableReinitialize
          initialValues={{
            type_service,
            nom_produit,
            prix_unitaire,
            quantite,
            bon_achat,
            commantaire,
            produit_a_donner,
            produit_a_recuperer,
            somme_a_collecter,
            nom_client,
            prenom_client,
            email,
            numero_tele,
            wilaya_bureau,
            commune_bureau,
            wilaya_maison,
            commune_maison,
            adresse_bureau,
            adresse_maison,
            prix_livraison,
            point_relais,
            selection,
            id_produit,
          }}
          validationSchema={formValidation}
          onSubmit={ajoutSubmit}
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
                <div className="flex flex-row justify-center items-center gap-4 mobile:flex-col">
                  <FormSelect
                    placeholder="choisissez un type"
                    title="Type de service"
                    name="type_service"
                    formik={formik}
                    setValue={setTypeValue}
                    width={mobile ? 300 : 400}
                    options={typeOptions}
                  />
                  {/* <div className="flex flex-row justify-center items-center gap-4">
                    <FormInput
                      type="number"
                      name="id"
                      placeholder="Id"
                      size={mobile ? "mid" : "small"}
                      onChange={handleCommandeChange}
                    />
                    <FormInput
                      type="text"
                      name="tracking"
                      placeholder="Tracking"
                      size={mobile ? "mid" : "small"}
                      onChange={handleCommandeChange}
                    />
                  </div> */}
                </div>
                {(typeValue === "std" ||
                  typeValue === "exp" ||
                  typeValue === "pr" ||
                  typeValue === "ret" ||
                  typeValue === "pr ret") && (
                  <div className="flex justify-center items-center my-3">
                    <FormSelect
                      placeholder="choisissez un produit"
                      title="produit"
                      name="id_produit"
                      formik={formik}
                      setValue={setProductID}
                      width={mobile ? 300 : 400}
                      options={productOptions}
                    />
                  </div>
                )}
                {(typeValue === "std" ||
                  typeValue === "exp" ||
                  typeValue === "pr" ||
                  typeValue === "ret" ||
                  typeValue === "pr ret") && (
                  <div className="flex justify-center items-center my-3">
                    <FormInput
                      type="text"
                      name="nom_produit"
                      placeholder="Nom de produit"
                      size={mobile ? "" : "large"}
                      onChange={handleCommandeChange}
                    />
                  </div>
                )}
                <div
                  className={
                    typeValue === "ret" || typeValue === "pr ret"
                      ? "flex flex-row items-center justify-start ml-2 mb-3 mobile:flex-col"
                      : "flex flex-row items-center justify-center mb-3 gap-4 mobile:flex-col"
                  }
                >
                  <div className="flex flex-row items-center justify-start gap-4">
                    {(typeValue === "std" ||
                      typeValue === "exp" ||
                      typeValue === "pr") && (
                      <FormInput
                        type="number"
                        name="prix_unitaire"
                        placeholder="Prix"
                        size={mobile ? "mid" : "medium"}
                        onChange={handleCommandeChange}
                      />
                    )}
                    {(typeValue === "std" ||
                      typeValue === "exp" ||
                      typeValue === "pr" ||
                      typeValue === "ret" ||
                      typeValue === "pr ret") && (
                      <FormInput
                        type="number"
                        name="quantite"
                        placeholder="Quantité"
                        size={
                          mobile &&
                          (typeValue === "ret" || typeValue === "pr ret")
                            ? ""
                            : (typeValue === "std" ||
                                typeValue === "exp" ||
                                typeValue === "pr") &&
                              mobile
                            ? "mid"
                            : "medium"
                        }
                        onChange={handleCommandeChange}
                      />
                    )}
                  </div>
                  {/* {(typeValue === "std" ||
                    typeValue === "exp" ||
                    typeValue === "pr") && (
                    <FormInput
                      type="text"
                      name="bon_achat"
                      placeholder="Bon d'achat"
                      size={mobile ? "" : "medium"}
                      onChange={handleCommandeChange}
                    />
                  )} */}
                </div>
                <div className="flex flex-col items-center justify-center">
                  {typeValue === "exch" && (
                    <div className="flex justify-center items-center my-3">
                      <FormInput
                        type="text"
                        name="produit_a_donner"
                        placeholder="Produit a donner"
                        size={mobile ? "" : "large"}
                        onChange={handleCommandeChange}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center">
                  {typeValue === "exch" && (
                    <div className="flex justify-center items-center">
                      <FormInput
                        type="text"
                        name="produit_a_recuperer"
                        placeholder="Produit a récupérer"
                        size={mobile ? "" : "large"}
                        onChange={handleCommandeChange}
                      />
                    </div>
                  )}
                  {(typeValue === "pr" || typeValue === "pr ret") && (
                    <FormSelect
                      placeholder="choisir un point relais"
                      title="Point relais"
                      name="point_relais"
                      formik={formik}
                      setValue={setPrValue}
                      width={mobile ? 300 : 400}
                      options={prOptions}
                    />
                  )}
                </div>

                {typeValue === "exch" && (
                  <div className="flex justify-start items-center my-3 m-2">
                    <FormInput
                      type="text"
                      name="somme_a_collecter"
                      placeholder="Somme a collecter"
                      size={mobile ? "" : "medium"}
                      onChange={handleCommandeChange}
                    />
                  </div>
                )}

                <div className="flex flex-row gap-4 justify-start items-center ">
                  <Checkbox
                    sx={{
                      color: "#000000",
                      "&.Mui-checked": {
                        color: "#3F0291",
                      },
                    }}
                    size="small"
                    onChange={gabaritChange}
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
                    onChange={fragilChange}
                  />
                  Fragil
                </div>
                <div className="flex flex-row justify-evenly gap-4 my-3 ">
                  <FormInput
                    type="text"
                    name="commentaire"
                    placeholder="Commentaire"
                    size={mobile ? "" : "large"}
                    onChange={handleCommandeChange}
                    high
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
                    onChange={handleClientChange}
                  />
                  <FormInput
                    type="text"
                    name="prenom_client"
                    placeholder="Prénom du client"
                    size={mobile ? "" : "medium"}
                    onChange={handleClientChange}
                  />
                </div>
                <div className="flex justify-center items-center mt-3">
                  <FormInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    size={mobile ? "" : "large"}
                    onChange={handleClientChange}
                  />
                </div>
                <div className="flex justify-center items-center mt-3">
                  <FormInput
                    type="text"
                    name="numero_tele"
                    placeholder="Numero de Téléphone"
                    size={mobile ? "" : "large"}
                    onChange={handleClientChange}
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <AdresseSelect
                    name="selection"
                    formik={formik}
                    handleChange={handleClientChange}
                    setCommune={setCommuneValue}
                    wilaya={wilayaValue}
                    setWilaya={setWilayaValue}
                    disabled={false}
                    checked={false}
                  />
                </div>
                <div className="flex justify-center items-center mt-3 gap-4 mobile:flex-col">
                  <FormInput
                    type="number"
                    name="prix_livraison"
                    placeholder="Prix de livraison (DA)"
                    size={mobile ? "" : "medium"}
                    onChange={handleCommandeChange}
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
                <div className="flex justify-center items-center mt-3 gap-4 mobile:flex-col">
                  {!mobile && (
                    <Button
                      variant="outlined"
                      onClick={exitForm}
                      sx={{
                        width: submitButton,
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
                      width: submitButton,
                      height: 48,
                      backgroundColor: "#3F0291",
                      borderRadius: "6px",
                    }}
                  >
                    Enregistrer
                  </Button>
                </div>
                {submissionLoading && (
                  <div className="flex flex-row justify-center itmes-center my-4">
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

export default AjoutForm;
