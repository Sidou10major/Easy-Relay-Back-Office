import { useState, useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import "./style.css";
import Tablepaiements from "../../components/Paiement/TablePaiement";
import Tableprix from "./../../components/Paiement/Tableprixlivraison";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AjoutForm from "../../components/Paiement/AjouterPrix";
import Detail from "../../components/Paiement/Detailsprix";
import DetailsPaiementsPrix from "../../components/Paiement/DetailspaiementsPrix";
import axios from "axios";
import { useSelector } from "react-redux";
import Validation from "../../components/Paiement/Validation";
import { formatWilayas } from "../../helpers/HelperFunctions";
import ModificationForm from '../../components/Paiement/ModificationForm';
function Paiement() {
  const [paiements, setPaiements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prix, setPrix] = useState([]);
  const [showAjoutForm, setShowAjoutForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [ShowDetailPaie, setShowDetailPaie] = useState(false);
  const [paiementtoread, setPaiementToRead] = useState({});
  const [prixtoread, setPrixToRead] = useState({});
  const [prixtomodify, setPrixToModify] = useState({});
  const [showModificationForm, setShowModificationForm] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [paiementToValidateID, setPaiementToValidateID] = useState();
  const [refresh, setRefresh] = useState(false);

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { id_vendeur } = useSelector((state) => state.vendeur);
  const fetchpaie = async () => {
    const answer = await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=paiement_vendeur&id_vendeur=${id_vendeur}`
      )
      .catch((error) => console.log(error));
    if (answer) {
      const Paiements = answer.data.content;
      setPaiements(Paiements);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchpaie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchpaie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);
  const fetchprix = async () => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=tarif_livraison_vendeur&id_vendeur=${id_vendeur}`
      )
      .catch((error) => console.log(error));
    if (response) {
      const res = await axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=get_wilayas&id_vendeur=${id_vendeur}`
        )
        .catch((error) => console.log(error));
      if (res.data.response) {
        const wilayas = res.data.content;
        const Prix = formatWilayas(wilayas, response.data.content);
        setPrix(Prix);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchprix();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchprix();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);
  return (
    <>
      {loading && (
        <div className="loader">
          <PuffLoader color="#3F0291" loading={loading} size={70} />
          Easy relay
        </div>
      )}
      {!loading && (
        <>
          <Tabs
            className="mobile:mb-2"
            value={value}
            onChange={handleChange}
            centered
            sx={{
              "& button.Mui-selected": { color: "#3F0291" },
            }}
            TabIndicatorProps={{
              sx: { backgroundColor: "#3F0291" },
            }}
          >
            <Tab value="1" label="Paiements" />
            <Tab value="2" label="Prix livraisons" />
          </Tabs>

          {value === "1" && (
            <Tablepaiements
              paiements={paiements}
              setShowDetailPaie={setShowDetailPaie}
              setPaiementToRead={setPaiementToRead}
              setShowValidation={setShowValidation}
              setPaiementToValidateID={setPaiementToValidateID}
            />
          )}
          {value === "1" && ShowDetailPaie && (
            <DetailsPaiementsPrix
              setShowDetailPaie={setShowDetailPaie}
              paiementToRead={paiementtoread}
            />
          )}
          {value === "1" && showValidation && (
            <Validation
              setShowValidation={setShowValidation}
              paiementID={paiementToValidateID}
              setRefresh={setRefresh}
            />
          )}
          {value === "2" && (
            <Tableprix
              prix={prix}
              setShowAjoutForm={setShowAjoutForm}
              setShowDetail={setShowDetail}
              setPrixToRead={setPrixToRead}
              setPrixToModify ={setPrixToModify}
              setShowModificationForm = {setShowModificationForm}
            />
          )}
          {value === "2" && showAjoutForm && (
            <AjoutForm
              setShowAjoutForm={setShowAjoutForm}
              setRefresh={setRefresh}
            />
          )}
          {value === "2" && showDetail && (
            <Detail setShowDetail={setShowDetail} prix={prixtoread} />
          )}
          {value === "2" && showModificationForm && (
            <ModificationForm 
            setShowModificationForm = {setShowModificationForm} 
            Prixdata = {prixtomodify} 
            setRefresh = {setRefresh} 
            />
          )

          }
        </>
      )}
    </>
  );
}

export default Paiement;