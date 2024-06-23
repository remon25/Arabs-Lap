import CreateLabReportForm from "./CreateOperationReportForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

export default function AddReport() {
  return (
    <div>
      <Modal>
      <Modal.Open opens="report-form">
        <Button>اضف تقرير</Button>
      </Modal.Open>
      <Modal.Window name="report-form">
        <CreateLabReportForm />
      </Modal.Window>
    </Modal>
    </div>
    
  );
}
