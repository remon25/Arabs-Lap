import Heading from "../ui/Heading";
import Row from "../ui/Row";
import ReportTable from "../features/operation-report/ReportTable";
import AddReport from "../features/operation-report/AddReport";

function OperationReport() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">اضف إلى تقرير التشغيل</Heading>
        <AddReport />
      </Row>
      <Row>
        <ReportTable />
      </Row>
    </>
  );
}

export default OperationReport;
