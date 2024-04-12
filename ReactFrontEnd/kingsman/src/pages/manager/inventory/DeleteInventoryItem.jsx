
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function DeleteInventoryItem({ itemName, onConfirm, onCancel }) {
  const [openModal, setOpenModal] = useState(true);

  const confirmDelete = () => {
    onConfirm();
    setOpenModal(false);
  };
  const cancelDelete = () => {
    onCancel();
    setOpenModal(false);
  };
    

  return (
    <>
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete {'"'+itemName+'"'}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={confirmDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={cancelDelete}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default DeleteInventoryItem;
