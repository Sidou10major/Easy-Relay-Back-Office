import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";
import Edit from "../../svgs/Edit";
import { useMemo } from "react";
import Plus from "../../svgs/Plus";
import Upload from "../../svgs/Upload";
import Download from "../../svgs/Download";
import Pagination from "../table/Pagination";
import Table from "../table/Table";
import GlobalFilter from "../table/GlobalFilter";
import Button from "@mui/material/Button";
import { CSVLink } from "react-csv";
import {
  generateSortingIndicator,
  useSelectionHook,
} from "../../helpers/TableHooks";
import { formatHeader } from "../../helpers/HelperFunctions";
import { useRef, useState } from "react";
import AjoutProduitsEnMasse from "./AjoutProduitsEnMasse";
import ModifierProduit from "./ModifierProduit";
import RedCross from "../../svgs/RedCross";
import { useMediaQuery } from "react-responsive";

function TableProduits({
  products,
  setShowAjoutProduit,
  setshowConfirmDeletion,
  setProduitId,
  setRefresh,
}) {
  const [showAjoutProduitsEnMasse, setshowAjoutProduitsEnMasse] =
    useState(false);
  const [showModifierProduit, setShowModifierProduit] = useState(false);
  const [produitAModifier, setProduitAModifier] = useState({
    produit_id: 12, // c'est la format de données que j'ai proposée qui corespond au design
    nom_produit: "produit 1",
    attributs: [{ couleur: "bleu", taille: "XL", quantite: 2, prix: 1000 }],
    description: "ceci est un produit 1",
  });
  const productsData = useMemo(() => products, [products]);
  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0]).map((key) => {
            if (key === "id") {
              return {
                Header: "Id",
                accessor: key,
              };
            }
            if (key === "label") {
              return {
                Header: "Description",
                accessor: key,
              };
            }
            if (key === "qty") {
              return {
                Header: "Quantité",
                accessor: key,
              };
            }
            return {
              Header: formatHeader(key),
              accessor: key,
            };
          })
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [products]
  );

  // table hooks

  // view button hook
  const useEditHook = (hooks) => {
    hooks.visibleColumns.push((columns) => {
      return [
        // rest of columns
        ...columns,
        {
          // new edit column
          id: "edit",
          Header: "",
          Cell: ({ row }) => (
            <div className="flex flex-row justify-center gap-2">
              <Button
                className="small_btn !text-black"
                onClick={() => {
                  const produit = products.find(
                    (product) => product.id === row.values.id
                  );
                  setProduitAModifier(produit);
                  setShowModifierProduit(true);
                }}
              >
                <div>
                  <Edit />
                </div>
              </Button>
              <Button
                className="small_btn !text-[#D50000]"
                onClick={() => {
                  setshowConfirmDeletion(true);
                  setProduitId(row.values.id);
                }}
              >
                <div>
                  <RedCross />
                </div>
              </Button>
            </div>
          ),
        },
      ];
    });
  };

  // table props extraction

  const table = useTable(
    {
      columns: productsColumns,
      data: productsData,
      initialState: { pageIndex: 0, pageSize: 9 }, // when we get the real data we fix the height of th rows
      // and the page size
    },
    useGlobalFilter,
    useFilters,
    useEditHook,
    useSortBy,
    usePagination,
    useRowSelect,
    useSelectionHook
  );
  // destructuring needed props and variables to controle the table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,  // will be used later to controle selected rows dynamicly
  } = table;
  const { pageIndex } = state;
  const pages = Array.from(new Array(pageCount), (val, index) => 1 + index);
  const downloadRef = useRef(null);
  const handleDownlaod = () => {
    downloadRef.current.link.click();
  };
  const small = useMediaQuery({
    query: "(max-width : 640px)",
  });
  return (
    <>
      <div className="header_container">
        <div className="filters_container">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            placeholder="Trouver un produit"
          />
          {/*<DatePicker setFilter={setFilter} />*/}
        </div>
        <div className="buttons_container">
          <Button
            className="round_btn"
            onClick={() => {
              setShowAjoutProduit(true);
            }}
          >
            {small && <span>ajouter produit</span>}
            <Plus />
          </Button>
        </div>
      </div>
      <Table
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        generateSortingIndicator={generateSortingIndicator}
        getTableBodyProps={getTableBodyProps}
        page={page}
        prepareRow={prepareRow}
      />
      <div className="footer_container">
        <Pagination
          previousPage={previousPage}
          nextPage={nextPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          gotoPage={gotoPage}
          pageIndex={pageIndex}
          pages={pages}
          pageCount={pageCount}
        />
        <div className="buttons_container">
          <Button
            className="round_btn"
            onClick={() => {
              setshowAjoutProduitsEnMasse(true);
            }}
          >
            {small && <span>Ajouter en masse</span>}
            <Upload />
          </Button>
          <CSVLink
            className="hidden"
            filename={`Produits_vendeur.csv`}
            data={productsData}
            ref={downloadRef}
          ></CSVLink>
          <Button className="round_btn" onClick={handleDownlaod}>
            {small && <span>Télécharger</span>}
            <Download />
          </Button>
        </div>
      </div>
      {showAjoutProduitsEnMasse && (
        <AjoutProduitsEnMasse
          setshowAjoutProduitsEnMasse={setshowAjoutProduitsEnMasse}
        />
      )}
      {showModifierProduit && (
        <ModifierProduit
          setShowModifierProduit={setShowModifierProduit}
          produitAmodifier={produitAModifier}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
}

export default TableProduits;
