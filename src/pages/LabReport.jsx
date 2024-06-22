import Heading from "../ui/Heading";
import Row from "../ui/Row";
import ReportTable from "../features/lab-report/ReportTable";
import AddReport from "../features/lab-report/AddReport";

function LabReport() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">اضف إلى تقرير المختبر</Heading>
        <AddReport />
      </Row>
      <Row>
        <ReportTable />
      </Row>
    </>
  );
}

export default LabReport;
