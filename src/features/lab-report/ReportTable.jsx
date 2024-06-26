import { useMemo, useState } from "react";
import Spinner from "../../ui/Spinner.jsx";
import { useGetLabReport } from "./useGetLabReport.js";
import { useNavigate } from "react-router-dom";
import { useTable, useSortBy, usePagination } from "react-table";
import Menus from "../../ui/Menus.jsx";
import Input from "../../ui/Input";
import Empty from "../../ui/Empty.jsx";
import styled from "styled-components";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";

import Button from "../../ui/Button.jsx";

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
    word-wrap: break-word;
    text-align: center;
  }

  th {
    background-color: #f4f4f4;
  }

  .mobile-sort {
    display: none;
  }
  .details {
    text-align: center;
  }

  @media screen and (max-width: 992px) {
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
      @media screen and (max-width: 992px) {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .details {
      text-align: right;
      direction: rtl;
    }
  }
`;

const StyledHead = styled.th`
  background-color: var(--color-grey-50) !important;
  border-bottom: 1px solid var(--color-grey-300) !important;
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
  const { isLoading, labReports } = useGetLabReport();

  const [dateFilter, setDateFilter] = useState("");
  const navigate = useNavigate();

  console.log("labReports:", labReports);

  const columns = useMemo(() => {
    const baseColumns = [
      { Header: "Sample ID", accessor: "id" },
      { Header: "Sample Date", accessor: "sample_date" },
      { Header: "Notes", accessor: "notes" },
      { Header: "Writer", accessor: "sample_writer" },
    ];
    baseColumns.push({
      Header: " Details",
      accessor: "details",
      Cell: ({ row }) => {
        return (
          <div className="details">
            <Button onClick={() => navigate(`/lab-report/${row.original.id}`)}>
              التفاصيل
            </Button>
          </div>
        );
      },
    });
    return baseColumns;
  }, [navigate]);

  const filteredData = useMemo(() => {
    if (!dateFilter) return labReports;
    return labReports.filter((report) => {
      const reportDate = new Date(report.sample_date).toLocaleDateString(
        "en-CA"
      );
      return reportDate.includes(dateFilter);
    });
  }, [labReports, dateFilter]);

  const data = useMemo(() => {
    // Ensure labReports is an array before passing it to useTable
    return Array.isArray(filteredData) ? filteredData : [];
  }, [filteredData]);

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
      <h4>البحث بالتاريخ </h4>

      <Input
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        placeholder="Filter by Date"
      />
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "1.3rem",
          }}
        >
          <span style={{ marginRight: "1rem" }}>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
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
