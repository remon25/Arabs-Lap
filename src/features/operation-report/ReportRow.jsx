import styled from "styled-components";
import CreateLabReportForm from "./CreateLabReportForm";
import { useDeleteLabReport } from "./useDeleteLabReport";
import { HiPencil } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";



const Report = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;



export default function ReportRow({ labReport }) {
  const { isDeleting, mutate } = useDeleteLabReport();
  const {
    id: labReportId,
    turbidity_inlet,
    turbidity_outlet,
    free_chlorine_inlet,
    free_chlorine_outlet,
    TDS_inlet,
    TDS_outlet,
    temp_inlet,
    temp_outlet,
    conductivity_inlet,
    conductivity_outlet,
    iron_inlet,
    iron_outlet,
    PH_inlet,
    PH_outlet,
    sample_date,
    sample_writer,
    notes,
  } = labReport;

  console.log(labReport);

  
  return (
    <Table.Row>
      <Report>{turbidity_inlet} - {turbidity_outlet}</Report>
      <Report>{TDS_inlet} - {TDS_outlet}</Report>
      <Report>{temp_inlet} - {temp_outlet}</Report>
      <Report>{conductivity_inlet} - {conductivity_outlet}</Report>
      <Report>{PH_inlet} - {PH_outlet}</Report>
      <Report>{iron_inlet} - {iron_outlet}</Report>
      <Report>{sample_date}</Report>
      <Report>{free_chlorine_inlet} - {free_chlorine_outlet}</Report>
      <Report>{notes ? notes : "-"}</Report>
      <Report>writer</Report>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={labReportId} />
            <Menus.List id={labReportId}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiOutlineTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
          <Modal.Window name="edit">
            <CreateLabReportForm labReportToEdit={labReport} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={"Lap Report"}
              disabled={isDeleting}
              onConfirm={() => mutate(labReportId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}
