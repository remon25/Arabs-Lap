import { useRef } from "react";
import { useGetOperationSingleReport } from "../features/operation-report/useGetOperationSingleReport";
import { useMoveBack } from "../hooks/useMoveBack";
import { useDeleteOperationReport } from "../features/operation-report/useDeleteOperationReport";
import { useNavigate } from "react-router-dom";
import { useRoles } from "../features/authentication/useGetRoles";
import CreateOperationReportForm from "../features/operation-report/CreateOperationReportForm";
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


const SingleOperationReport = () => {
  const { isLoading, operationReport } = useGetOperationSingleReport();
  const moveBack = useMoveBack();
  const { isDeleting, mutate } = useDeleteOperationReport();
  const navigate = useNavigate();
  const componentRef = useRef();
  const { isAdmin } = useRoles();

  if (isLoading) return <Spinner />;
  if (!operationReport) return <Empty resourceName="تقرير التشغيل" />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">تقرير تشغيل رقم {operationReport?.id}</Heading>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; رجوع</ButtonText>
      </Row>

      <div style={{padding:"1rem"}} ref={componentRef}>
        <Row
          type="horizontal"
          style={{
            marginBottom: "20px",
            padding: "1rem",
            border: "2px solid #ddd",
          }}
        >
          <h3>اسم القروب: {operationReport?.["اسم القروب"]}</h3>
          <h3>وقت القروب: {operationReport?.["وقت القروب"]}</h3>
        </Row>
        <Row type="vertical" style={{ marginBottom: "20px" }}>
          <h3>التشغيل</h3>
          <p style={{ border: "1px solid #ddd", padding: "1.5rem" }}>
            {operationReport?.["التشغيل"]}
          </p>
        </Row>
        <Row type="vertical" style={{ marginBottom: "20px" }}>
          <h3>المولدات</h3>
          <p style={{ border: "1px solid #ddd", padding: "1.5rem" }}>
            {operationReport?.["المولدات"]}
          </p>
        </Row>

        <Row type="vertical">
          <h3 style={{ width: "100%" }}>الانتاج</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
              border: "1px solid #ddd",
              padding: "1rem",
            }}
          >
            <Row type="horizontal">
              <div>
                كمية المياه الخام : {operationReport?.["كمية المياه الخام"]}
              </div>
              <div>
                كمية الانتاج الفعلي : {operationReport?.["كمية الانتاج الفعلي"]}
              </div>
            </Row>

            <Row type="horizontal">
              <div>
                كمية التصدير خليص : {operationReport?.["كمية التصدير خليص"]}
              </div>
              <div>
                {" "}
                كمية التصدير الكامل : {operationReport?.["كمية التصدير الكامل"]}
              </div>
            </Row>

            <Row type="horizontal">
              <div>مدة التشغيل : {operationReport?.["مدة التشغيل"]} </div>
              <div>من الساعة : {operationReport?.["من الساعة"]}</div>
              <div>الى الساعة : {operationReport?.["الى الساعة"]}</div>
            </Row>
          </div>
        </Row>

        <Row type="horizontal"></Row>

        <Row type="horizontal">
          <StyledInfo className="additional-info">
            <div className="date">
              <h4> Date & Time : {operationReport?.التاريخ}</h4>
            </div>

            <div className="writer">
              <h4> Writer : {operationReport?.writer}</h4>
            </div>
            <div className="sample_id">
              <h4> ID : {operationReport?.id}</h4>
            </div>
          </StyledInfo>
        </Row>
        <Row type="horizontal">
          <p style={{ marginTop: "20px" }} className="sample_notes">
            ملاحظات : {operationReport?.ملاحظ || "لا ملاحظات"}
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
                    mutate(operationReport.id, {
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
                <CreateOperationReportForm operationReportToEdit={operationReport} />
              </Modal.Window>
            </Modal>
          </>
        )}
      </ButtonGroup>
    </>
  );
};

export default SingleOperationReport;
