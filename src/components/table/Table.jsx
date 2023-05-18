function Table({
  getTableProps,
  headerGroups,
  generateSortingIndicator,
  getTableBodyProps,
  page,
  prepareRow,
}) {
  return (
    <div className="table_wrapper">
      <table {...getTableProps()}>
        <thead className="head">
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
    </div>
  );
}

export default Table;
