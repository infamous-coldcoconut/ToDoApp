import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function RemoveForm({ show, handleClose, userList, handlerMap }) {
  console.log(userList);
  return (
    <Modal show={show} onHide={handleClose}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData);
          handlerMap.removeMember({ memberId: values.memberId });
          handleClose();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Member</Form.Label>
          <Form.Select type="select" name="memberId" required>
            {userList.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </Form.Select>
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

export default RemoveForm;
