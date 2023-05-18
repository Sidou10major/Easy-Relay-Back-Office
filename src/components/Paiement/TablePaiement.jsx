import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";
import { CSVLink } from "react-csv";
import { useMemo, useRef } from "react";
import Download from "../../svgs/Download";
import Pagination from "../table/Pagination";
import Table from "../table/Table";
import GlobalFilter from "../table/GlobalFilter";
import Button from "@mui/material/Button";
import {
  generateSortingIndicator,
  useSelectionHook,
} from "../../helpers/TableHooks";
import {
  formatHeader,
  formatEtatPaiement,
} from "../../helpers/HelperFunctions";
import ViewEye from "./../../svgs/ViewEye";
import "../../pages/Paiements/style.css";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { etatOptions } from "../../helpers/Paiementsdata";
import Validate from "../../svgs/Validate";
function Tablepaiements({
  paiements,
  setShowDetailPaie,
  setPaiementToRead,
  setShowValidation,
  setPaiementToValidateID,
}) {
  const { id_vendeur } = useSelector((state) => state.vendeur);

  const mobile = useMediaQuery({
    query: "(max-width : 480px)",
  });
  const PaiementsData = useMemo(
    () => formatEtatPaiement(etatOptions, paiements),
    [paiements]
  );
  const PaiementsColumns = useMemo(
    () =>
      paiements[0]
        ? Object.keys(paiements[0]).map((key) => {
            if (key === "paiement_id") {
              return {
                Header: "Id",
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
    [paiements]
  );

  let downloadRef = useRef(null);
  const handleDownload = () => {
    downloadRef.current.link.click();
  };
  const useViewButtonHook = (hooks) => {
    hooks.visibleColumns.push((columns) => {
      return [
        // rest of columns
        ...columns,
        {
          // new column which comes first
          // selection props dont work
          id: "view",
          Header: "",
          Cell: ({ row }) => (
            <div className="flex flex-row justify-center gap-2">
              <Button
                className="small_btn !text-black"
                onClick={() => {
                  const paiement = PaiementsData.find(
                    (Paiement) => Paiement.id === row.values.id
                  );
                  setShowDetailPaie(true);
                  setPaiementToRead(paiement);
                }}
              >
                <div>
                  <ViewEye />
                </div>
              </Button>
              {/* {row.values.etat_paiement === "1" && (  */}
              <Button
                className="small_btn !text-[#54BA5B]"
                onClick={() => {
                  setPaiementToValidateID(row.values.id);
                  setShowValidation(true);
                }}
              >
                <div>
                  <Validate />
                </div>
              </Button>
              {/* )} */}
            </div>
          ),
        },
      ];
    });
  };

  // table props extraction
  const table = useTable(
    {
      columns: PaiementsColumns,
      data: PaiementsData,
      initialState: { pageIndex: 0, pageSize: 8 }, // when we get the real data we fix the height of th rows
      // and the page size
    },
    useGlobalFilter,
    useFilters,
    useViewButtonHook,
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

  return (
    <>
      <div className="header_container">
        <div className="filters_container">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            placeholder="Trouver un paiement"
          />
          {/*<DatePicker setFilter={setFilter} />*/}
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
          <CSVLink
            className="hidden"
            filename={`paiemnets_vendeur_${id_vendeur}.csv`}
            data={PaiementsData}
            ref={downloadRef}
          ></CSVLink>
          <Button className="round_btn" onClick={handleDownload}>
            {mobile && <span>Télécharger</span>}
            <Download />
          </Button>
        </div>
      </div>
    </>
  );
}

export default Tablepaiements;
