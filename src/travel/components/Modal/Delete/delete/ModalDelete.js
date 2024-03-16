import React from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteData } from "./deleteData";
import "../../../../../../src/index.css";

export const ModalDelete = ({ isModalDelete, setIsModalDelete, eliminar }) => {
  function deleteDataModal() {
    setIsModalDelete(false);
    const id = eliminar.id;
    deleteData({ id });
  }

  return (
    <Modal
      className="modal"
      animation={true}
      show={isModalDelete}
      onHide={() => setIsModalDelete(false)}
    >
      <Modal.Header>
        <Modal.Title>Eliminar</Modal.Title>
      </Modal.Header>
      <Modal.Body>Estás seguro de eliminar?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsModalDelete(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={deleteDataModal}>
          Borrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
