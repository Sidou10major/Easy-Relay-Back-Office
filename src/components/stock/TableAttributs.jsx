import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { useMemo } from "react";
import PlusStroke from "../../svgs/PlusStroke";
import Delete from "../../svgs/Delete";
import Button from "@mui/material/Button";
import { generateSortingIndicator } from "../../helpers/TableHooks";
import { useState, useEffect } from "react";
import EditableCell from "../inputs/EditableCell";
import { formatHeader } from "../../helpers/HelperFunctions";
function TableAttributs({ attributs, setAttributs, selectedAttributes }) {
  // we use this data to send it to backend on submison
  const [skipPageReset, setSkipPageReset] = useState(false);
  const alwaysThereAttributs = { quantite: "", prix: "" };
  const [attributesToRender, setAttributesTorender] =
    useState(alwaysThereAttributs);

  const AjouterInstance = () => {
    // pour ajouter une nouvelle ligne
    // on peut générer ça automatiquement depuis les attributs selectionnées
    setAttributs(attributs.concat(attributesToRender));
  };
  useEffect(() => {
    selectedAttributes.forEach((attribut) => {
      if (!Object.keys(attributesToRender).includes(attribut)) {
        const obj = { [attribut]: "" };
        setAttributesTorender({ ...obj, ...attributesToRender });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAttributes]);
  // function to update data when we edit a cell

  const updateData = (rowIndex, columnId, value) => {
    setSkipPageReset(true);
    setAttributs((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };
  // we can only show the table when the attributes are selected
  const alwaysThereColumns = [
    {
      id: "quantite",
      Header: "Quantité",
      accessor: "quantite",
      Cell: EditableCell,
    },
    {
      id: "prix",
      Header: "Prix",
      accessor: "prix",
      Cell: EditableCell,
    },
    {
      // new delete column
      id: "supprimer",
      Header: "Supprimer",
      accessor: (str) => "supprimer",
      Cell: ({ row }) => {
        return (
          <Button
            className="small_btn !text-[#D50000]"
            onClick={() => {
              const copy = [...attributs];
              copy.splice(row.index, 1);
              setAttributs(copy);
            }}
          >
            <Delete />
          </Button>
        );
      },
    },
  ];
  const columns = useMemo(
    () =>
      selectedAttributes
        ? selectedAttributes
            .map((attribut) => {
              return {
                id: attribut,
                Header: formatHeader(attribut),
                accessor: attribut,
                Cell: EditableCell,
              };
            })
            .concat(alwaysThereColumns)
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedAttributes]
  );
  useEffect(() => {
    setSkipPageReset(false);
  }, [attributs]);

  // table props extraction

  const table = useTable(
    {
      columns: columns,
      data: attributs,
      updateData,
      autoResetPage: !skipPageReset,
      initialState: { pageIndex: 0, pageSize: 100 }, // when we get the real data we fix the height of th rows
      // and the page size
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );
  // destructuring needed props and variables to controle the table
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    table;
  return (
    <>
      <div className="attributs_table_wrapper">
        <table {...getTableProps()}>
          <thead className="attributs_table_head">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    key={index}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <div className="flex flex-row items-center">
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr key={index} {...row.getRowProps()}>
                  {row.cells.map((cell, index) => (
                    <td key={index} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          title="clique ici pour ajouter une ligne"
          className="plus_buttons_container"
        >
          <Button
            className="attribut_plus_btn"
            onClick={() => {
              AjouterInstance();
            }}
          >
            <PlusStroke />
          </Button>
        </div>
      </div>
    </>
  );
}

export default TableAttributs;
