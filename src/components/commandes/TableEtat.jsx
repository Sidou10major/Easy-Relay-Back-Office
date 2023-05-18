import React from "react";
import Pagination from "../table/Pagination";
import EtatFilter from "../table/EtatFilter";
import GlobalFilter from "../table/GlobalFilter";
import Button from "@mui/material/Button";
import Plus from "../../svgs/Plus";
import Upload from "../../svgs/Upload";
import Download from "../../svgs/Download";
import Table from "../table/Table";
import { CSVLink } from "react-csv";
import { useMediaQuery } from "react-responsive";
import { formatHeader, typeReplacement } from "../../helpers/HelperFunctions";
import { columnsParEtat } from "../../helpers/LivraisonData";
import { useMemo, useRef } from "react";
import {
  useSelectionHook,
  generateSortingIndicator,
} from "../../helpers/TableHooks";
import ViewEye from "../../svgs/ViewEye";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";

import Edit from "../../svgs/Edit";
import RedCross from "../../svgs/RedCross";
function TableEtat({
  livraisons,
  setShowAjoutForm,
  currentEtat,
  setEtatLivraison,
  setShowConfirmDelition,
  setShowConfirmValidation,
  setLivraisonID,
  setLivraisonToModify,
  setShowModificationForm,
  setShowAjoutEnMasse,
  setShowDetails,
  spreadedStates,
}) {
  // composant que affiche les commandes
  // ici on recupère les commnades depuis le backend et on filtre par l'etat pending
  // aussi on filtre les attributes qu'on veut afficher
  let downloadRef = useRef(null);
  const handleDownload = () => {
    downloadRef.current.link.click();
  };
  const LivraisonData = useMemo(
    () =>
      typeReplacement(
        livraisons.filter((livraison) =>
          spreadedStates.includes(livraison.last_etat_liv)
        )
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [livraisons, currentEtat, spreadedStates]
  );

  const displayColumns = useMemo(() => {
    if (currentEtat === "1" || currentEtat === "2") {
      return columnsParEtat[0];
    } else if (currentEtat === "3") {
      return columnsParEtat[1];
    } else if (
      currentEtat === "4" ||
      currentEtat === "5" ||
      currentEtat === "6"
    )
      return columnsParEtat[2];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEtat]);
  // defining data and columns dynamicly from data brought in through the API
  const livraisonColumns = useMemo(
    () =>
      livraisons[0]
        ? Object.keys(livraisons[0])
            .filter(
              // pour filtrer les attributs qu'on veut afficher
              (key) => displayColumns.includes(key)
            )
            .map((key) => {
              if (key === "livraison_id") {
                return {
                  Header: "Id",
                  accessor: key,
                };
              }
              if (key === "last_etat_liv_date") {
                return {
                  Header: "Dernière opération",
                  accessor: key,
                };
              }
              if (key === "last_etat_liv") {
                return {
                  Header: "Etat de livraison",
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
    [livraisons, currentEtat]
  );
  // table hooks
  const useButtonsHook = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "buttons",
        Header: "",
        Cell: ({ row }) => (
          <div className="flex flex-row justify-center gap-2">
            <Button
              className="small_btn !text-black"
              onClick={() => {
                const livraison = livraisons.find(
                  (livraison) =>
                    livraison.livraison_id === row.values.livraison_id
                );
                setLivraisonToModify(livraison); // here to show not to modify but no need to add another function
                setShowDetails(true);
              }}
            >
              <div>
                <ViewEye />
              </div>
            </Button>
            <Button
              className="small_btn !text-black"
              onClick={() => {
                const livraison = livraisons.find(
                  (livraison) =>
                    livraison.livraison_id === row.values.livraison_id
                );
                setLivraisonToModify(livraison);
                setShowModificationForm(true);
              }}
            >
              <div>
                <Edit />
              </div>
            </Button>
            <Button
              className="small_btn !text-[#D50000]"
              onClick={() => {
                setShowConfirmDelition(true);
                setLivraisonID(row.values.livraison_id);
              }}
            >
              <div>
                <RedCross />
              </div>
            </Button>
          </div>
        ),
      },
    ]);
  };
  const useViewHook = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "buttons",
        Header: "",
        Cell: ({ row }) => (
          <div className="flex flex-row justify-center gap-2">
            <Button
              className="small_btn !text-black"
              onClick={() => {
                const livraison = livraisons.find(
                  (livraison) =>
                    livraison.livraison_id === row.values.livraison_id
                );
                setLivraisonToModify(livraison); // here to show not to modify but no need to add another function
                setShowDetails(true);
              }}
            >
              <div>
                <ViewEye />
              </div>
            </Button>
          </div>
        ),
      },
    ]);
  };
  const tableHooks =
    currentEtat === "4" || currentEtat === "5" ? useViewHook : useButtonsHook;
  // implemetation of the pending state table using useTable hook
  const table = useTable(
    {
      columns: livraisonColumns,
      data: LivraisonData,
      initialState: { pageIndex: 0, pageSize: 9 }, // when we get the real data we fix the height of th rows
      // and the page size
    },
    useGlobalFilter,
    useFilters,
    tableHooks,
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
    state, // will be used later to controle selected rows dynamicly
  } = table;
  const { pageIndex } = state;
  const pages = Array.from(new Array(pageCount), (val, index) => 1 + index);
  // const [DateFilterValues, setDateaFilterValues] = useState([]);

  const showAjoutForm = () => {
    setShowAjoutForm(true);
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
            placeholder="Trouver une commande"
          />
          <EtatFilter
            currentEtat={currentEtat}
            setEtatLivraison={setEtatLivraison}
            length={LivraisonData.length}
          />
          {/*<DatePicker setFilter={setFilter} />*/}
        </div>
        <div className="buttons_container">
          {/* <Button className="round_btn">
            {small && <span>ajouter offre</span>}
            <PageIcon />
          </Button> */}
          <Button className="round_btn" onClick={showAjoutForm}>
            {small && <span>Ajouter Livraison</span>}
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
          {/* <Button className="round_btn" onClick={() => alert("attachement")}>
            <Attachement />
          </Button> */}
          <Button
            className="round_btn"
            onClick={() => {
              setShowAjoutEnMasse(true);
            }}
          >
            {small && <span>ajouter en masse</span>}
            <Upload />
          </Button>
          <CSVLink
            className="hidden"
            filename={`livraisons_etat_${currentEtat}.csv`}
            data={LivraisonData}
            ref={downloadRef}
          ></CSVLink>
          <Button className="round_btn" onClick={handleDownload}>
            {small && <span>Télécharger</span>}
            <Download />
          </Button>
        </div>
      </div>
    </>
  );
}

export default TableEtat;
