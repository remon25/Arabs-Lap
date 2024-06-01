import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

export default function AddCabin() {
  return (
    <div>
      <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
    </div>
    
  );
}

// export default function AddCabin() {
//   const [showForm, setshowForm] = useState(false);

//   const onClose = () => setshowForm(false);
//   return (
//     <>
//       <div>
//         <Button onClick={() => setshowForm((show) => !show)}>
//           Add new cabin
//         </Button>
//       </div>
//       {showForm && (
//         <Modal onClose={onClose}>
//           <CreateCabinForm onClose={onClose} />
//         </Modal>
//       )}
//     </>
//   );
// }
