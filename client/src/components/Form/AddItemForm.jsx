import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddItemForm({ show, handleClose, handlerMap }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const formData = new FormData(e.target);
          const newItem = {
            name: formData.get("name"),
            resolved: false,
          };

          console.log(newItem);
          handlerMap.addItem(newItem);
          handleClose();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Item name"
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddItemForm;
