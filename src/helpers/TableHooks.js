// here are the custom hooks we created to be used by the tables
// the purpos is to add custom buttons or selectors to the rows of the table

import Button from "@mui/material/Button";
import Edit from "../svgs/Edit";
import Validate from "../svgs/Validate";
import ArrowDown from "../svgs/ArrowDown";
import ArrowUp from "../svgs/ArrowUp";
import RedCross from "../svgs/RedCross";
import { Checkbox } from "@mui/material";

export const useButtonsHook = (hooks) => {
  hooks.visibleColumns.push((columns) => [
    ...columns,
    {
      id: "buttons",
      Header: "",
      Cell: ({ row }) => (
        <div className="flex flex-row justify-center gap-2">
          <Button className="small_btn !text-[#D50000]" onClick={() => {}}>
            <div>
              <RedCross />
            </div>
          </Button>
          <Button
            className="small_btn !text-black"
            onClick={() => {
              alert("editing product with price :" + row.values.price);
            }}
          >
            <div>
              <Edit />
            </div>
          </Button>
          <Button
            className="small_btn !text-[#54BA5B]"
            onClick={() => {
              alert("editing product with id :", row.values.id);
            }}
          >
            <div>
              <Validate />
            </div>
          </Button>
        </div>
      ),
    },
  ]);
};
// row selection hook for the table
export const useSelectionHook = (hooks) => {
  hooks.visibleColumns.push((columns) => {
    return [
      {
        // new column which comes first
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div className="rounded-lg flex justify-center items-center drop-shadow-[0px_1px_3px_rgba(0,0,0,0.161)]">
            <Checkbox
              className={" !text-black "}
              size="small"
              {...getToggleAllRowsSelectedProps()}
            />
          </div>
        ),
        Cell: ({ row }) => (
          <Checkbox
            className={" !text-black"}
            size="small"
            {...row.getToggleRowSelectedProps()}
          />
        ),
      },
      // rest of columns
      ...columns,
    ];
  });
};

export const generateSortingIndicator = (column) =>
  column.id !== "buttons" &&
  column.id !== "selection" &&
  column.id !== "view" &&
  column.id !== "edit" &&
  column.id !== "supprimer" ? (
    column.isSorted ? (
      column.isSortedDesc ? (
        <ArrowDown />
      ) : (
        <ArrowUp />
      )
    ) : (
      <ArrowDown />
    )
  ) : (
    ""
  );
