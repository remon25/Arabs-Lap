import { useMemo } from "react";
import Spinner from "../../ui/Spinner.jsx";
import { useGetOperationReport } from "./useGetOperationReport.js";
import { useRoles } from "../authentication/useGetRoles.js";
import { useTable, useSortBy } from "react-table";
import { useDeleteOperationReport } from "./useDeleteOperationReport.js";
import Menus from "../../ui/Menus.jsx";
import Empty from "../../ui/Empty.jsx";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import { HiPencil } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";
import CreateOperationReportForm from "./CreateOperationReportForm.jsx";
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
      text-align: left;
    }
    table td:last-child {
      text-align: right;
      direction: ltr;
    }
    table td:last-child::before {
      float: left;
    }

    table td::before {
      content: attr(data-label);
      float: right;
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

export default function ReportTable() {
  const { isAdmin } = useRoles();
  const { isLoading, operationReports } = useGetOperationReport();
  const { isDeleting, mutate } = useDeleteOperationReport();

  console.log("labReports:", operationReports);

  const columns = useMemo(() => {
    const baseColumns = [
      { Header: "التاريخ", accessor: "التاريخ" },
      { Header: "اسم القروب", accessor: "اسم القروب" },
      { Header: "وقت القروب", accessor: "وقت القروب" },
      { Header: "التشغيل", accessor: "التشغيل" },
      { Header: "المولدات", accessor: "المولدات" },
      { Header: "كمية المياه الخام", accessor: "كمية المياه الخام" },
      { Header: "كمية الانتاج الفعلي", accessor: "كمية الانتاج الفعلي" },
      { Header: "كمية التصدير خليص", accessor: "كمية التصدير خليص" },
      { Header: "كمية التصدير الكامل", accessor: "كمية التصدير الكامل" },
      { Header: "مدة التشغيل", accessor: "مدة التشغيل" },
      { Header: "من الساعة", accessor: "من الساعة" },
      { Header: "الى الساعة", accessor: "الى الساعة" },
      { Header: "ملاحظ", accessor: "ملاحظ" },
      { Header: "الكاتب", accessor: "writer" },
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
                  <CreateOperationReportForm operationReportToEdit={row.original} />
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
    return Array.isArray(operationReports) ? operationReports : [];
  }, [operationReports]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  if (isLoading) return <Spinner />;
  if (!operationReports || !operationReports.length)
    return <Empty resourceName="تقارير التشغيل" />;

  return (
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
        <table style={{ direction: "rtl" }} {...getTableProps()}>
          <caption className="table-caption">تقارير التشغيل</caption>
          <thead>
            {headerGroups.map((headerGroup, headerGroupIndex) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
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
            {rows.map((row, rowIndex) => {
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
  );
}
