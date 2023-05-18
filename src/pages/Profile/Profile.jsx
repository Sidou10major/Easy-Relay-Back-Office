import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import PuffLoader from "react-spinners/PuffLoader";
import Button from "@mui/material/Button";
import Logout from "../../svgs/Logout";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import { useMediaQuery } from "react-responsive";
import "./style.css";
import FormInput from "../../components/inputs/FormInput";
import FormSelect from "../../components/inputs/FormSelect";
import axios from "axios";
import { formatWilayasCommunes } from "../../helpers/HelperFunctions";
import Deconnexion from "../../components/profile/Deconnexion";
import { useSelector } from "react-redux";
function Profile() {
  const large = useMediaQuery({
    query: "(min-width : 1281px)",
  });
  const desktop = useMediaQuery({
    query: "(max-width : 1280px) && (min-width : 1081px)",
  });
  const medium = useMediaQuery({
    query: "(max-width : 840px) && (min-width : 641px)",
  });
  const small = useMediaQuery({
    query: "(max-width : 640px)  && (min-width : 481px)",
  });
  const mobile = useMediaQuery({
    query: "(max-width : 480px)",
  });

  const infos_vendeur = useSelector((state) => state.vendeur);
  const initial_vendeur = {
    // normalemnt on le récupère depuis le la cookie (token) qui sera créée aprés
    // le login mais on utilisera des données statiques pour le moment
    id_vendeur: infos_vendeur.id_vendeur,
    nom_boutique: infos_vendeur.nom_boutique,
    nom_vendeur: infos_vendeur.nom,
    prenom_vendeur: infos_vendeur.prenom,
    telephone:
      infos_vendeur.tel_1 !== null ? infos_vendeur.tel_1 : infos_vendeur.tel_2,
    email: infos_vendeur.email,
    adresse: infos_vendeur.adresse,
    wilaya_vendeur: infos_vendeur.wilaya,
    commune_vendeur: infos_vendeur.commune,
    colis_par_semaine: 20, // pas d'infos sur ca au niveau de l'api
    commission_livre: 50, // pas d'infos sur ca au niveau de l'api
    commission_retour: 30, // pas d'infos sur ca au niveau de l'api
    pourcentage_retour: 10, // pas d'infos sur ca au niveau de l'api
    heurs_jours_passage: [
      // pas d'infos sur ca au niveau de l'api
      {
        id: 0,
        jour: "Dimanche",
        heure: "12:00",
        checked: true,
      },
      {
        id: 1,
        jour: "Lundi",
        heure: "12:00",
        checked: false,
      },
      {
        id: 2,
        jour: "Mardi",
        heure: "12:00",
        checked: true,
      },
      {
        id: 3,
        jour: "Mercredi",
        heure: "12:00",
        checked: false,
      },
      {
        id: 4,
        jour: "Jeudi",
        heure: "12:00",
        checked: true,
      },
      {
        id: 5,
        jour: "Vandredi",
        heure: "12:00",
        checked: false,
      },
      {
        id: 6,
        jour: "Samedi",
        heure: "12:00",
        checked: false,
      },
    ],
    services_offers: [
      // pas d'infos sur ca au niveau de l'api
      { nom: "emballage", label: "Emballage", offere: true },
      { nom: "notifications", label: "Notifications SMS", offere: false },
      { nom: "stock", label: "Stock", offere: true },
      { nom: "display", label: "Display", offere: false },
    ],
    roles: [
      // pas d'infos sur ca au niveau de l'api
      {
        role: "Admin",
        nom_complet: "Abderazzak Kafi",
        telephone: "0573957834",
        email: "vendeur@gmail.com",
        password: "12345",
      },
      {
        role: "Financier",
        nom_complet: "Abderazzak Kafi",
        telephone: "0573957834",
        email: "vendeur@gmail.com",
        password: "12345",
      }, // on doit encrypter lemot de pass depuis le bakcend
    ],
  };

  const [vendeur, setVendeur] = useState(initial_vendeur);
  const {
    id_vendeur,
    nom_boutique,
    nom_vendeur,
    prenom_vendeur,
    telephone,
    email,
    adresse,
    wilaya_vendeur,
    commune_vendeur,
    colis_par_semaine,
    commission_livre,
    commission_retour,
    pourcentage_retour,
    services_offers,
    heurs_jours_passage,
  } = vendeur;
  const handleVendeurChange = (e) => {
    const { name, value } = e.target;
    setVendeur({ ...vendeur, [name]: value });
  };
  const handleServicesChange = (e) => {
    const newServices = services_offers.map((service) => {
      if (e.target.id === service.nom) {
        return { ...service, offere: e.target.checked };
      }
      return service;
    });
    setVendeur({
      ...vendeur,
      services_offers: newServices,
    });
  };
  const handleHeureChange = (e) => {
    const array = heurs_jours_passage.map((element) => {
      if (e.target.id === element.id) {
        return { ...element, heure: e.target.value };
      }
      return element;
    });
    setVendeur({ ...vendeur, heurs_jours_passage: array });
  };
  const handleSwitchChange = (e) => {
    const array = heurs_jours_passage.map((element) => {
      if (e.target.id === element.jour) {
        return { ...element, checked: e.target.checked };
      }
      return element;
    });
    setVendeur({ ...vendeur, heurs_jours_passage: array });
  };

  const [loading, setLoading] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [wilaya, setWilaya] = useState(wilaya_vendeur);
  const [commune, setCommune] = useState(commune_vendeur);
  const [wilayaOptions, setWilayaOptions] = useState([]);
  const [communeOptions, setCommuneOptions] = useState([]);
  const [wilayaID, setWilayaID] = useState(0);
  const fetchWilayas = async () => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=get_wilayas&id_vendeur=${id_vendeur}`
      )
      .catch((error) => console.log(error));
    if (response.data.response) {
      const wilayas = formatWilayasCommunes(response.data.content);
      setWilayaOptions(wilayas);
      const wilaya = wilayas.filter(
        (wilaya) => wilaya.value === wilaya_vendeur
      );
      setWilayaID(wilaya[0].id);
    }
  };
  const fetchCommunes = async () => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=get_communes&id_vendeur=${id_vendeur}&id_wilaya=${wilayaID}`
      )
      .catch((error) => console.log(error));
    if (response.data.response) {
      const communes = formatWilayasCommunes(response.data.content);
      setCommuneOptions(communes);
      setLoading(false);
    }
  };

  useEffect(() => {
    setVendeur({ ...vendeur, wilaya_vendeur: wilaya });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wilaya]);
  useEffect(() => {
    setVendeur({ ...vendeur, commune_vendeur: commune });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commune]);
  useEffect(() => {
    if (wilayaID !== 0) {
      fetchCommunes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wilayaID]);

  useEffect(() => {
    fetchWilayas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const buttonWidth = mobile ? 140 : 192;
  return (
    <>
      {loading && (
        <div className="loader">
          <PuffLoader color="#3F0291" loading={loading} size={70} />
          Easy relay
        </div>
      )}
      {!loading && (
        <div className="profile_wrapper">
          <div className="header_wrapper">
            <span className="font-bold text-xl"> Profile : {nom_boutique}</span>
            <span className="log_out_button">
              <Button
                className="profile_btn !rounded-full !text-[#3F0291]"
                onClick={() => {
                  setShowLogout(true);
                }}
              >
                <div>
                  <Logout />
                </div>
              </Button>
            </span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              nom_boutique,
              nom_vendeur,
              prenom_vendeur,
              telephone,
              email,
              adresse,
              wilaya_vendeur,
              commune_vendeur,
              colis_par_semaine,
              commission_livre,
              commission_retour,
              pourcentage_retour,
            }}
          >
            {(formikProps) => (
              <Form className="Form_wrap">
                <div className="col">
                  <FormInput
                    type="text"
                    name="nom_boutique"
                    placeholder="Nom de la boutique"
                    size={mobile ? "" : "large"}
                    onChange={handleVendeurChange}
                  />
                  <div className="flex flex-row justify-start gap-4 mobile:grid grid-cols-1 mobile:gap-2">
                    <FormInput
                      type="text"
                      name="nom_vendeur"
                      placeholder="Nom de vendeur"
                      size={mobile ? "" : "medium"}
                      onChange={handleVendeurChange}
                    />
                    <FormInput
                      type="text"
                      name="prenom_vendeur"
                      placeholder="Prenom de vendeur"
                      size={mobile ? "" : "medium"}
                      onChange={handleVendeurChange}
                    />
                  </div>
                  <FormInput
                    type="phone"
                    name="telephone"
                    placeholder="Numéro de téléphone"
                    size={mobile ? "" : "large"}
                    onChange={handleVendeurChange}
                  />
                  <FormInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    size={mobile ? "" : "large"}
                    onChange={handleVendeurChange}
                  />
                  <FormInput
                    type="text"
                    name="adresse"
                    placeholder="Adresse"
                    size={mobile ? "" : "large"}
                    onChange={handleVendeurChange}
                  />
                  <FormSelect
                    placeholder={wilaya_vendeur}
                    title="wilaya"
                    name="wilaya"
                    formik={formikProps}
                    setValue={setWilaya}
                    width={
                      large
                        ? 400
                        : desktop
                        ? 400
                        : medium
                        ? 400
                        : small
                        ? 300
                        : mobile
                        ? 300
                        : 400
                    }
                    options={wilayaOptions}
                    wilaya
                    setWilayaID={setWilayaID}
                  />
                  <FormSelect
                    placeholder={commune_vendeur}
                    title="Commune"
                    name="commune"
                    formik={formikProps}
                    setValue={setCommune}
                    width={
                      large
                        ? 400
                        : desktop
                        ? 400
                        : medium
                        ? 400
                        : small
                        ? 300
                        : mobile
                        ? 300
                        : 400
                    }
                    options={communeOptions}
                  />
                </div>
                <div className="col2">
                  <div className="col">
                    <FormInput
                      type="number"
                      name="colis_par_semaine"
                      placeholder="Colis par semaine (%)"
                      size={mobile ? "" : "full"}
                      onChange={handleVendeurChange}
                      disabled
                    />
                    <FormInput
                      type="number"
                      name="commission_livre"
                      placeholder="Commission livré (%)"
                      size={mobile ? "" : "full"}
                      onChange={handleVendeurChange}
                      disabled
                    />
                  </div>
                  Heures et jours de passage
                  <div className="date_passage">
                    {heurs_jours_passage.map((element, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            element.checked
                              ? "heure_passage font-semibold"
                              : "heure_passage text-[#707070]"
                          }
                        >
                          <div className="w-1/3">{element.jour}</div>
                          <div className="flex flex-row justify-center items-center w-1/3">
                            <div className="bg-[#F2F2F2] p-[2px] w-fit h-7 rounded-md text-center">
                              <input
                                id={element.id}
                                type="time"
                                name="heure_passage"
                                value={element.heure}
                                onChange={handleHeureChange}
                              />
                            </div>
                          </div>
                          <div className="w-1/3 text-right">
                            <Switch
                              id={element.jour}
                              size="small"
                              checked={element.checked}
                              onChange={handleSwitchChange}
                              sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": {
                                  color: "#3F0291",
                                },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                  {
                                    backgroundColor: "#3F0291",
                                  },
                                "&.Mui-checked": {
                                  color: "#3F0291",
                                },
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="col">
                  <FormInput
                    type="number"
                    name="commission_retour"
                    placeholder="Commission retour (%)"
                    size={mobile ? "" : "full"}
                    onChange={handleVendeurChange}
                    disabled
                  />
                  <FormInput
                    type="number"
                    name="pourcentage_retour"
                    placeholder="Pourcentage retours (%)"
                    size={mobile ? "" : "full"}
                    onChange={handleVendeurChange}
                    disabled
                  />
                  Services Offers
                  <div>
                    {services_offers.map((service, index) => {
                      return (
                        <div key={index} className="checkbox">
                          <Checkbox
                            id={service.nom}
                            checked={service.offere}
                            sx={{
                              color: "#000000",
                              "&.Mui-checked": {
                                color: "#3F0291",
                              },
                            }}
                            onChange={handleServicesChange}
                            size="small"
                          />
                          <label htmlFor={service.nom}>{service.label}</label>
                        </div>
                      );
                    })}
                  </div>
                  Convention de travail
                  <div className="convention_buttons">
                    <Button
                      variant="outlined"
                      onClick={() => {}}
                      sx={{
                        width: buttonWidth,
                        height: 48,
                        color: "#3F0291",
                        border: "1px solid #3F0291",
                        borderRadius: "6px",
                      }}
                    >
                      Télécharger
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {}}
                      sx={{
                        width: buttonWidth,
                        height: 48,
                        color: "#3F0291",
                        border: "1px solid #3F0291",
                        borderRadius: "6px",
                      }}
                    >
                      Modifier
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          {/* code des roles
          <Formik enableReinitialize initialValues={roles}>
            {(formikProps) => (
              <Form className="roles_wprapper">
                <span className="font-bold text-xl">
                  {" "}
                  Roles de vendeur : {nom_boutique}
                </span>
                {roles.map((role, ind) => {
                  return (
                    <div key={ind}>
                      <div className="font-bold text-sm px-1">
                        Role {ind + 1}
                      </div>
                      <div className="role_wrap">
                        {Object.keys(role).map((key, index) => {
                          return (
                            <div key={`${ind} + ${index}`}>
                              <FormInput
                                type={
                                  key === "password"
                                    ? "password"
                                    : key === "email"
                                    ? "email"
                                    : key === "telephone"
                                    ? "phone"
                                    : "text"
                                }
                                name={key}
                                placeholder={formatHeader(key)}
                                value={role[key]}
                                size={mobile ? "" : "medium"}
                                disabled
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
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
              </Form>
            )}
          </Formik> */}
        </div>
      )}
      {!loading && showLogout && <Deconnexion setShowLogout={setShowLogout} />}
    </>
  );
}

export default Profile;
