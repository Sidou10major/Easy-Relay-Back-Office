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
import Edit from "../../svgs/Edit";
import {
  generateSortingIndicator,
  useSelectionHook,
} from "../../helpers/TableHooks";
import { formatHeader } from "../../helpers/HelperFunctions";
import ViewEye from "../../svgs/ViewEye";
import Plus from "./../../svgs/Plus";
import "../../pages/Paiements/style.css";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
function Tableprix({ prix, setShowAjoutForm, setShowDetail, setPrixToRead , setPrixToModify, setShowModificationForm}) {
  const { id_vendeur } = useSelector((state) => state.vendeur);

  const mobile = useMediaQuery({
    query: "(max-width : 480px)",
  });
  const PrixData = useMemo(() => prix, [prix]);
  const Prixcolumns = useMemo(
    () =>
      prix[0]
        ? Object.keys(prix[0]).map((key) => {
            if (key === "prix_id") {
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
    [prix]
  );

  // table hooks

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
                  const Prix = prix.find((Prix) => Prix.id === row.values.id);
                  setShowDetail(true);
                  setPrixToRead(Prix);
                }}
              >
                <div>
                  <ViewEye />
                </div>
              </Button>
              <Button
                className="small_btn !text-black"
                onClick={() => {
                  const Prix = prix.find((Prix) => Prix.id === row.values.id);
                  setPrixToModify(Prix);
                  setShowModificationForm(true);
                }}
                >  
                <div>
                  <Edit/>
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
      columns: Prixcolumns,
      data: PrixData,
      initialState: { pageIndex: 0, pageSize: 9 }, // when we get the real data we fix the height of th rows
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
    state,  // will be used later to controle selected rows dynamicly
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
            placeholder="Trouver un prix de livraison"
          />
          {/*<DatePicker setFilter={setFilter} />*/}
        </div>
        <div className="buttons_container">
          <Button
            className="round_btn"
            onClick={() => {
              setShowAjoutForm(true);
            }}
          >
            {mobile && <span>Ajouter prix de livraison</span>}
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
          { <CSVLink
            className="hidden"
            filename={`prix_livraison_vendeur_${id_vendeur}.csv`}
            data={PrixData}
            ref={downloadRef}
          ></CSVLink> }
          <Button className="round_btn" onClick={handleDownload}>
            {mobile && <span>Télécharger</span>}
            <Download />
          </Button>
        </div>
      </div>
    </>
  );
}

export default Tableprix;
