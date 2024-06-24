import { useMemo } from "react";
import Spinner from "../../ui/Spinner.jsx";
import { useGetLabReport } from "./useGetLabReport.js";
import { useRoles } from "../authentication/useGetRoles.js";
import { useTable, useSortBy, usePagination } from "react-table";
import { useDeleteLabReport } from "./useDeleteLabReport.js";
import Menus from "../../ui/Menus.jsx";
import Input from "../../ui/Input";
import Empty from "../../ui/Empty.jsx";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
  HiPencil,
} from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";
import CreateLabReportForm from "./CreateLabReportForm.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete";

// Styled component to handle overflow
const StyledTable = styled.div`
  overflow-x: auto;
  .table-caption {
    margin-bottom: 10px;
    display: none;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 8px;
    border: 1px solid #ddd;
    word-wrap: break-word; /* Handle long content */
  }

  th {
    background-color: #f4f4f4;
  }

  .mobile-sort {
    display: none;
  }

  @media screen and (max-width: 1556px) {
    .table-caption {
      display: block;
    }
    table {
      border: 0;
    }
    .sort-wrapper {
      display: none !important;
    }

    .mobile-sort,
    .sort-wrapper {
      display: flex;
      gap: 20px;
    }

    table caption {
      font-size: 1.3em;
    }

    table thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    table tr {
      border-bottom: 3px solid #ddd;
      display: block;
      margin-bottom: 1.625em;
    }

    table td {
      border-bottom: 1px solid #ddd;
      display: block;
      font-size: 0.8em;
      text-align: right;
    }

    table td::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }

    table td:last-child {
      border-bottom: 0;
    }
  }
`;

const StyledHead = styled.th`
  background-color: var(--color-grey-50) !important;
  border-bottom: 1px solid var(--color-grey-100) !important;
`;

const StyledPagination = styled.div`
  direction: ltr;
  display: flex;
  align-items: center;
  gap: 1rem;
  @media screen and (max-width: 992px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

export default function ReportTable() {
  const { isAdmin } = useRoles();
  const { isLoading, labReports } = useGetLabReport();
  const { isDeleting, mutate } = useDeleteLabReport();

  console.log("labReports:", labReports);

  const columns = useMemo(() => {
    const baseColumns = [
      { Header: "Turbidity Inlet", accessor: "turbidity_inlet" },
      { Header: "Turbidity Outlet", accessor: "turbidity_outlet" },
      { Header: "TDS Inlet", accessor: "TDS_inlet" },
      { Header: "TDS Outlet", accessor: "TDS_outlet" },
      { Header: "Temp Inlet", accessor: "temp_inlet" },
      { Header: "Temp Outlet", accessor: "temp_outlet" },
      { Header: "Conductivity Inlet", accessor: "conductivity_inlet" },
      { Header: "Conductivity Outlet", accessor: "conductivity_outlet" },
      { Header: "PH Inlet", accessor: "PH_inlet" },
      { Header: "PH Outlet", accessor: "PH_outlet" },
      { Header: "Iron Inlet", accessor: "iron_inlet" },
      { Header: "Iron Outlet", accessor: "iron_outlet" },
      { Header: "Sample Date", accessor: "sample_date" },
      { Header: "Notes", accessor: "notes" },
      { Header: "Writer", accessor: "sample_writer" },
    ];

    if (isAdmin) {
      baseColumns.push({
        Header: "تعديل / حذف",
        accessor: "edit_delete",
        Cell: ({ row }) => {
          return (
            <div className="edit-delete_operations">
              <Modal>
                <Menus.Menu>
                  <Menus.Toggle id={row.original.id} />
                  <Menus.List id={row.original.id}>
                    <Modal.Open opens="edit">
                      <Menus.Button icon={<HiPencil />}>تعديل</Menus.Button>
                    </Modal.Open>

                    <Modal.Open opens="delete">
                      <Menus.Button icon={<HiOutlineTrash />}>حذف</Menus.Button>
                    </Modal.Open>
                  </Menus.List>
                </Menus.Menu>
                <Modal.Window name="edit">
                  <CreateLabReportForm labReportToEdit={row.original} />
                </Modal.Window>
                <Modal.Window name="delete">
                  <ConfirmDelete
                    resourceName={"التقرير"}
                    disabled={isDeleting}
                    onConfirm={() => mutate(row.original.id)}
                  />
                </Modal.Window>
              </Modal>
            </div>
          );
        },
      });
    }

    return baseColumns;
  }, [isAdmin, isDeleting, mutate]);

  const data = useMemo(() => {
    // Ensure labReports is an array before passing it to useTable
    return Array.isArray(labReports) ? labReports : [];
  }, [labReports]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Instead of rows, use page which has only the rows for the active page
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our initial table state
    },
    useSortBy,
    usePagination
  );

  if (isLoading) return <Spinner />;
  if (!labReports || !labReports.length)
    return <Empty resourceName="تقارير مختبر" />;

  return (
    <>
      <Menus>
        <StyledTable>
          <div className="mobile-sort">
            {headerGroups.map((headerGroup) => (
              <div
                key={headerGroup.id}
                className="sort-wrapper"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <div
                    key={column.id}
                    scope="col"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <table style={{ direction: "ltr" }} {...getTableProps()}>
            <caption className="table-caption">تقارير المختبر</caption>
            <thead>
              {headerGroups.map((headerGroup, headerGroupIndex) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  key={headerGroupIndex}
                >
                  {headerGroup.headers.map((column, columnIndex) => (
                    <StyledHead
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={columnIndex}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </StyledHead>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={rowIndex}>
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        {...cell.getCellProps()}
                        key={cellIndex}
                        data-label={cell.column.Header}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </StyledTable>
      </Menus>
      {/* Pagination Controls */}
      <StyledPagination>
        <div style={{ display: "flex",alignItems: "center",justifyContent: "center" }}>
          <PaginationButton
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            active={canPreviousPage}
          >
            <HiChevronDoubleLeft />
          </PaginationButton>{" "}
          <PaginationButton
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            active={canPreviousPage}
          >
            <HiChevronLeft />
          </PaginationButton>{" "}
          <PaginationButton
            onClick={() => nextPage()}
            disabled={!canNextPage}
            active={canNextPage}
          >
            <HiChevronRight />
          </PaginationButton>{" "}
          <PaginationButton
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            active={canNextPage}
          >
            <HiChevronDoubleRight />
          </PaginationButton>{" "}
        </div>
        <div style={{ display: "flex", alignItems: "center",justifyContent: "space-between",fontSize: "1.3rem" }}>
          <span style={{ marginRight: "1rem" }}>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
           |  Go to page:{" "}
            <Input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "50px" }}
            />
          </span>{" "}
        </div>

        <StyledSelect
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </StyledSelect>
      </StyledPagination>
    </>
  );
}
