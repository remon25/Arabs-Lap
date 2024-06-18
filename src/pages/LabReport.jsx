import Heading from "../ui/Heading";
import Row from "../ui/Row";
import ReportTable from "../features/lab-report/ReportTable";
import AddReport from "../features/lab-report/AddReport";

function LabReport() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">اضف إلى تقرير المختبر</Heading>
      </Row>
      <Row>
        <ReportTable />
        <AddReport />
      </Row>
    </>
  );
}

export default LabReport;
