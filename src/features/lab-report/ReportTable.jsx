import React, { useMemo } from 'react';
import Spinner from "../../ui/Spinner.jsx";
import { useGetLabReport } from "./useGetLabReport.js";
import { useTable } from "react-table";
import Menus from "../../ui/Menus.jsx";
import Empty from "../../ui/Empty.jsx";
import styled from 'styled-components';

// Styled component to handle overflow
const StyledTable = styled.div`
  overflow-x: auto;
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 8px;
    border: 1px solid #ddd;
    white-space: nowrap; // Prevent wrapping
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
  const { isLoading, labReports } = useGetLabReport();

  // Add a debug log to check the value of labReports
  console.log('labReports:', labReports);

  const columns = useMemo(() => [
    { Header: 'Turbidity Inlet', accessor: 'turbidity_inlet' },
    { Header: 'Turbidity Outlet', accessor: 'turbidity_outlet' },
    { Header: 'TDS Inlet', accessor: 'TDS_inlet' },
    { Header: 'TDS Outlet', accessor: 'TDS_outlet' },
    { Header: 'Temp Inlet', accessor: 'temp_inlet' },
    { Header: 'Temp Outlet', accessor: 'temp_outlet' },
    { Header: 'Conductivity Inlet', accessor: 'conductivity_inlet' },
    { Header: 'Conductivity Outlet', accessor: 'conductivity_outlet' },
    { Header: 'PH Inlet', accessor: 'PH_inlet' },
    { Header: 'PH Outlet', accessor: 'PH_outlet' },
    { Header: 'Iron Inlet', accessor: 'iron_inlet' },
    { Header: 'Iron Outlet', accessor: 'iron_outlet' },
    { Header: 'Sample Date', accessor: 'sample_date' },
    { Header: 'Notes', accessor: 'notes' },
    { Header: 'Writer', accessor: 'sample_writer' },
  ], []);

  const data = useMemo(() => {
    // Ensure labReports is an array before passing it to useTable
    return Array.isArray(labReports) ? labReports : [];
  }, [labReports]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  if (isLoading) return <Spinner />;
  if (!labReports || !labReports.length) return <Empty resourceName="تقارير مختبر" />;

  return (
    <Menus>
      <StyledTable>
        <table style={{direction: 'ltr'}} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, headerGroupIndex) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
                {headerGroup.headers.map((column, columnIndex) => (
                  <StyledHead {...column.getHeaderProps()} key={columnIndex}>{column.render('Header')}</StyledHead>
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
                    <td {...cell.getCellProps()} key={cellIndex}>{cell.render('Cell')}</td>
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
