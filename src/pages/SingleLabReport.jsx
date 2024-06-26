import { useRef } from "react";
import { useGetLabSingleReport } from "../features/lab-report/useGetLabSingleReport";
import { useMoveBack } from "../hooks/useMoveBack";
import { useDeleteLabReport } from "../features/lab-report/useDeleteLabReport";
import { useNavigate } from "react-router-dom";
import { useRoles } from "../features/authentication/useGetRoles";
import CreateLabReportForm from "../features/lab-report/CreateLabReportForm";
import styled from "styled-components";
import Empty from "../ui/Empty";
import Spinner from "../ui/Spinner";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import ButtonText from "../ui/ButtonText";
import ButtonGroup from "../ui/ButtonGroup";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import ConfirmDelete from "../ui/ConfirmDelete";
import ReactToPrint from "react-to-print";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Table = styled.table`
  direction: ltr;
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  thead {
    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
  }
  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
`;
const StyledInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  @media screen and (max-width: 576px) {
    flex-direction: column;
    align-items: flex-end;
    font-size: 1.4rem;
    h3 {
      text-align: end;
    }
  }
`;

const properties = [
  "PH",
  "TDS",
  "conductivity",
  "free_chlorine",
  "iron",
  "temp",
  "turbidity",
];

const SingleLabReport = () => {
  const { isLoading, labReport } = useGetLabSingleReport();
  const moveBack = useMoveBack();
  const { isDeleting, mutate } = useDeleteLabReport();
  const navigate = useNavigate();
  const componentRef = useRef();
  const { isAdmin } = useRoles();

  if (isLoading) return <Spinner />;
  if (!labReport) return <Empty resourceName="تقرير مختبر" />;

  const tableData = properties.map((prop) => ({
    property: prop,
    inlet: labReport[`${prop}_inlet`],
    outlet: labReport[`${prop}_outlet`],
  }));

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">تقرير مختبر رقم {labReport?.id}</Heading>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; رجوع</ButtonText>
      </Row>

      <div style={{padding:"1rem"}} ref={componentRef}>
        <Table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Inlet</th>
              <th>Outlet</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.property}</td>
                <td>{row.inlet}</td>
                <td>{row.outlet}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Row type="horizontal">
          <StyledInfo className="additional-info">
            <div className="date">
              <h4> Date & Time : {labReport?.sample_date}</h4>
            </div>

            <div className="writer">
              <h4> Writer : {labReport?.sample_writer}</h4>
            </div>
            <div className="sample_id">
              <h4> ID : {labReport?.id}</h4>
            </div>
          </StyledInfo>
        </Row>
        <Row type="horizontal">
          <p style={{ marginTop: "20px" }} className="sample_notes">
            ملاحظات : {labReport?.notes}
          </p>
        </Row>
      </div>

      <ButtonGroup>
        <ReactToPrint
          trigger={() => <Button variation="secondary">طباعة</Button>}
          content={() => componentRef.current}
        />

        {isAdmin && (
          <>
            <Modal>
              <Modal.Open opens="delete">
                <Button variation="danger">حذف التقرير</Button>
              </Modal.Open>
              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName={"التقرير"}
                  disabled={isDeleting}
                  onConfirm={() =>
                    mutate(labReport.id, {
                      onSettled: () => navigate(-1),
                    })
                  }
                />
              </Modal.Window>
            </Modal>
            <Modal>
              <Modal.Open opens="edit">
                <Button variation="primary">تعديل التقرير</Button>
              </Modal.Open>
              <Modal.Window name="edit">
                <CreateLabReportForm labReportToEdit={labReport} />
              </Modal.Window>
            </Modal>
          </>
        )}
      </ButtonGroup>
    </>
  );
};

export default SingleLabReport;
