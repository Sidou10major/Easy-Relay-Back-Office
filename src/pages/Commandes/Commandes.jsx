import axios from "axios";
import { useState, useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import "./style.css";
import TableEtat from "../../components/commandes/TableEtat";
import AjoutForm from "../../components/commandes/AjoutForm";
import ConfirmDeletion from "../../components/commandes/ConfirmDeletion";
import ConfirmValidation from "../../components/commandes/ConfirmValidation";
import ModificatoinForm from "../../components/commandes/ModificatoinForm";
import AjoutEnMasse from "../../components/commandes/AjoutEnMasse";
import Details from "../../components/commandes/Details";
import { useSelector } from "react-redux";
import { getStates } from "../../helpers/HelperFunctions";

function Commandes() {
  const [livraisons, setLivraisons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAjoutForm, setShowAjoutForm] = useState(false);
  // new state for showing the dialogue to confirm deletion
  const [showConfirmDeletion, setShowConfirmDeletion] = useState(false);
  const [showConfirmValidation, setShowConfirmValidation] = useState(false);
  const [showModificationForm, setShowModificationForm] = useState(false);
  const [etatLivraisons, setEtatLivraisons] = useState("1");
  const [spreadedStates, setSpreadedStates] = useState(["1"]);
  // new state for the id of the livraison to be deleted
  const [livraisonID, setLivraisonID] = useState(0);
  // new state for the livraison to be modified
  const [livraisonToModify, setLivraisonToModify] = useState({});

  const [showAjoutEnMasse, setShowAjoutEnMasse] = useState(false);

  const [showDetails, setShowDetails] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const { id_vendeur } = useSelector((state) => state.vendeur);
  const fetchLivraison = async () => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=get_livraisons_vendeur&id_vendeur=${id_vendeur}`
      )
      .catch((error) => console.log(error));
    if (response) {
      const livraisons = response.data.content;
      setLivraisons(livraisons);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLivraison();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);
  // listen to livraison ID changes (selected livraison in the table and change the state of the livraison to modify)
  // activate data fetch on component load
  useEffect(() => {
    const states = getStates(etatLivraisons);
    setSpreadedStates(states);
  }, [etatLivraisons]);

  useEffect(() => {
    fetchLivraison();
    console.log(spreadedStates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // lestening to currentEtat changes to update the table that contains
  // the spreded states included in that livraison state

  return (
    <>
      {loading && (
        <div className="loader">
          <PuffLoader color="#3F0291" loading={loading} size={70} />
          Easy relay
        </div>
      )}
      {!loading && (
        <TableEtat
          livraisons={livraisons}
          setShowAjoutForm={setShowAjoutForm}
          currentEtat={etatLivraisons}
          setEtatLivraison={setEtatLivraisons}
          setShowConfirmDelition={setShowConfirmDeletion}
          setShowConfirmValidation={setShowConfirmValidation}
          setShowModificationForm={setShowModificationForm}
          setLivraisonID={setLivraisonID}
          setLivraisonToModify={setLivraisonToModify}
          setShowAjoutEnMasse={setShowAjoutEnMasse}
          setShowDetails={setShowDetails}
          spreadedStates={spreadedStates}
        />
      )}
      {!loading && showAjoutForm && (
        <AjoutForm
          setShowAjoutForm={setShowAjoutForm}
          setRefresh={setRefresh}
        />
      )}
      {!loading && showConfirmDeletion && (
        <ConfirmDeletion
          setShowConfirmDeletion={setShowConfirmDeletion}
          livraisonID={livraisonID}
          setRefresh={setRefresh}
        />
      )}
      {!loading && showConfirmValidation && (
        <ConfirmValidation
          setShowConfirmValidation={setShowConfirmValidation}
          livraisonID={livraisonID}
        />
      )}
      {!loading && showModificationForm && (
        <ModificatoinForm
          setShowModificationForm={setShowModificationForm}
          livraisonData={livraisonToModify}
          setRefresh={setRefresh}
        />
      )}
      {!loading && showAjoutEnMasse && (
        <AjoutEnMasse setShowAjoutEnMasse={setShowAjoutEnMasse} />
      )}
      {!loading && showDetails && (
        <Details
          setShowDetails={setShowDetails}
          livraison={livraisonToModify}
        />
      )}
    </>
  );
}

export default Commandes;
