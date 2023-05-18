import { useState, useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import "./style.css";
import TableProduits from "../../components/stock/TableProduits";
import AjoutProduit from "../../components/stock/AjoutProduit";
import axios from "axios";
import { useSelector } from "react-redux";
import DeleteProduit from "../../components/stock/DeleteProduit";
function Stock() {
  const { id_vendeur } = useSelector((state) => state.vendeur);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAjoutProduit, setShowAjoutProduit] = useState(false);
  const [showConfirmDeletion, setshowConfirmDeletion] = useState(false);
  const [produitId, setProduitId] = useState();
  const [refresh, setRefresh] = useState(false);
  const fetchProductsData = async () => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=produits_vendeur&id_vendeur=${id_vendeur}`
      )
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    if (response) {
      if (response.data.response) {
        const products = response.data.content;
        setProducts(products);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchProductsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchProductsData();
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
        <TableProduits
          products={products}
          setShowAjoutProduit={setShowAjoutProduit}
          setshowConfirmDeletion={setshowConfirmDeletion}
          setProduitId={setProduitId}
          setRefresh={setRefresh}
        />
      )}
      {!loading && showAjoutProduit && (
        <AjoutProduit
          setShowAjoutProduit={setShowAjoutProduit}
          setRefresh={setRefresh}
        />
      )}
      {!loading && showConfirmDeletion && (
        <DeleteProduit
          setshowConfirmDeletion={setshowConfirmDeletion}
          produitId={produitId}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
}

export default Stock;
