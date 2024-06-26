import styled from "styled-components";
import Spinner from "../../ui/Spinner.jsx";
import Stats from "./Stats.jsx";
import { useGetLabReport } from "../lab-report/useGetLabReport.js";
import { fetchAllUsers } from "../../services/apiAuth.js";
import { useQuery } from "@tanstack/react-query";
import { useGetOperationReport } from "../operation-report/useGetOperationReport.js";
import LabReportsActivity from "./LapReportsActivity.jsx";
import OperationReportActivity from "./OperationReportActivity.jsx";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2.4rem;
  @media screen and (max-width: 1290px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
const StyledDashboardLayoutTwo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
  @media screen and (max-width: 1290px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }
  @media screen and (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export default function DashboardLayout() {
  const { isLoading, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });

  const { isLoading: isLoadingReports, labReports } = useGetLabReport();

  const { isLoading: isLoadingOperationReports, operationReports } =
    useGetOperationReport();
  const totalReports = labReports?.length + operationReports?.length;
  if (isLoading || isLoadingReports || isLoadingOperationReports)
    return <Spinner />;

  return (
    <>
      <StyledDashboardLayout>
        <Stats
          users={users}
          totalReports={totalReports}
          labReports={labReports}
          operationReports={operationReports}
        />
      </StyledDashboardLayout>
      <StyledDashboardLayoutTwo>
        <LabReportsActivity />
        <OperationReportActivity />
      </StyledDashboardLayoutTwo>
    </>
  );
}
