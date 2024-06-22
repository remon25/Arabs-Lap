import { useMemo } from "react";
import Spinner from "../../ui/Spinner.jsx";
import { useGetLabReport } from "./useGetLabReport.js";
import { useRoles } from "../authentication/useGetRoles.js";
import { useTable } from "react-table";
import { useDeleteLabReport } from "./useDeleteLabReport.js";
import Menus from "../../ui/Menus.jsx";
import Empty from "../../ui/Empty.jsx";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import { HiPencil } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";
import CreateLabReportForm from "./CreateLabReportForm.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete";

// Styled component to handle overflow
const StyledTable = styled.div`
  overflow-x: auto;
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
`;
const StyledHead = styled.th`
  background-color: var(--color-grey-50) !important;
  border-bottom: 1px solid var(--color-grey-100) !important;
`;

export default function ReportTable() {
  const { isAdmin } = useRoles();
  const { isLoading, labReports } = useGetLabReport();
  const { isDeleting, mutate } = useDeleteLabReport();

  console.log("labReports:", labReports);

  const columns = useMemo(
    () => {
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
                        <Menus.Button icon={<HiOutlineTrash />}>
                          حذف
                        </Menus.Button>
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
    },
    [isAdmin, isDeleting, mutate]
  );

  const data = useMemo(() => {
    // Ensure labReports is an array before passing it to useTable
    return Array.isArray(labReports) ? labReports : [];
  }, [labReports]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  if (isLoading) return <Spinner />;
  if (!labReports || !labReports.length)
    return <Empty resourceName="تقارير مختبر" />;

  return (
    <Menus>
      <StyledTable>
        <table style={{ direction: "ltr" }} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, headerGroupIndex) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
                {headerGroup.headers.map((column, columnIndex) => (
                  <StyledHead {...column.getHeaderProps()} key={columnIndex}>
                    {column.render("Header")}
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
                    <td {...cell.getCellProps()} key={cellIndex}>
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
