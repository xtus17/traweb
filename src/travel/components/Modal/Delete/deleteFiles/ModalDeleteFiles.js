import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteFiles } from "../deleteFiles/deleteFiles";
import "../../../../../../src/index.css";

export const ModalDeleteFiles = ({
  isModalDeleteFiles,
  setIsModalDeleteFiles,
  dataFilesDelete,
}) => {
  const [imagenes, setImagenes] = useState("");
  function deleteDataModal() {
    const images = imagenes;

    const infoData = {
      images,
    };

    setIsModalDeleteFiles(false);
    const id = dataFilesDelete.id;

    deleteFiles({ id, infoData });
  }

  return (
    <Modal
      className="modal"
      animation={true}
      show={isModalDeleteFiles}
      onHide={() => setIsModalDeleteFiles(false)}
    >
      <Modal.Header>
        <Modal.Title>Eliminar</Modal.Title>
      </Modal.Header>
      <Modal.Body>Estás seguro de eliminar las imágenes?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setIsModalDeleteFiles(false)}
        >
          Cancelar
        </Button>
        <Button variant="danger" onClick={deleteDataModal}>
          Borrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
