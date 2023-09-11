/* eslint-disable react/prop-types */
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
import axios from "axios";
import { useState } from "react";
import up from "../assets/up.png";
import down from "../assets/down.png";
import defaultIcon from "../assets/defaultArrow.png";
import { useNavigate } from "react-router-dom";

const GameDevTable = ({ data, columns, updateData }) => {
  console.log("🚀 ~ file: Table.jsx:12 ~ Table ~ data:", data);

  const navigate = useNavigate();

  const [sorting, setSorting] = useState([]);
  const [clickCount, setClickCount] = useState({});

  const handleRowClick = (developerId) => {
    navigate(`/gamedevelopers/${developerId}`);
  };

  const handleHeaderClick = async (columnName) => {
    let newSorting = [];

    if (!clickCount[columnName]) {
      newSorting = [{ id: columnName, desc: false }];
      setClickCount({ ...clickCount, [columnName]: 1 });
    } else if (clickCount[columnName] === 1) {
      newSorting = [{ id: columnName, desc: true }];
      setClickCount({ ...clickCount, [columnName]: 2 });
    } else {
      newSorting = [];
      setClickCount({ ...clickCount, [columnName]: 0 });
    }

    try {
      const sortOrder =
        newSorting.length > 0 ? (newSorting[0].desc ? "desc" : "asc") : "";
      const sortedDataUrl = `http://localhost:4000/gameDev?_sort=${columnName}&_order=${sortOrder}`;

      const response = await axios.get(sortedDataUrl);
      setSorting(newSorting);
      updateData(response.data);
    } catch (error) {
      console.error("Error fetching sorted data:", error);
    }
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },

    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <>
      <div className="h-2" />

      <table className="tables">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortInfo = header.column.getIsSorted();
                  const sortOrder = sortInfo ? sortInfo : "none";
                  const columnName = header.column.columnDef.accessorKey;

                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: () => handleHeaderClick(columnName),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <img className="sort-img" src={up} alt="up" />,
                            desc: (
                              <img className="sort-img" src={down} alt="down" />
                            ),
                            none: (
                              <img
                                className="sort-img"
                                src={defaultIcon}
                                alt="default"
                              />
                            ),
                          }[sortOrder] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              className="table-row "
              key={row.id}
              onClick={() => handleRowClick(row.original.id)}
            >
              {row.getVisibleCells()?.map((cell) => (
                <td key={cell.id}>
                  {cell.column.columnDef.accessorKey === "status" ? (
                    <button
                      className={`status-button ${
                        row.original.status === "ACTIVE"
                          ? "active-status"
                          : row.original.status === "INACTIVE"
                          ? "inactive-status"
                          : row.original.status === "IN DRAFT"
                          ? "indraft-status"
                          : ""
                      }`}
                    >
                      {row.original.status}
                    </button>
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>
    </>
  );
};
export default GameDevTable;
