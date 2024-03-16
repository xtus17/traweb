import React, { useEffect, useState } from "react";
import { Modal, Stack, Button, Form, Row } from "react-bootstrap";
import { editData } from "./editData";

export const ModalEdit = ({ isModalEditar, setIsModalEditar, editar }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dias = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];

    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const descripcion = document.getElementById("descripcion").value;
    const delito = document.getElementById("delito").value;
    const fecha = document.getElementById("fecha").value;
    const response = document.getElementById("response").value;
    const unidad = document.getElementById("unidad").value;
    const nombres = document.getElementById("nombres").value;
    const date = new Date(fecha);
    const daynumber = date.getDate();
    const day = dias[date.getDay()];
    const monthname = meses[date.getMonth()];
    const month = date.getMonth() + 1;
    const year = date.getUTCFullYear();
    const hour = date.toLocaleTimeString();
    const hourexacly = date.toLocaleTimeString().slice(0, 2);

    const infoData = {
      descripcion,
      delito,
      fecha,
      unidad,
      response,
      nombres,
      date,
      daynumber,
      monthname,
      month,
      year,
      hour,
      day,
      hourexacly,
    };

    setIsModalEditar(false);
    const id = editar.id;
    editData({ infoData, id });
  };

  const [getData, setGetData] = useState([]);

  const getDataEdit = (editar) => {
    setGetData(editar);
  };

  useEffect(() => {
    getDataEdit(editar);
  }, [editar]);

  return (
    <div>
      <Modal show={isModalEditar} onHide={() => setIsModalEditar(false)}>
        <Modal.Header>
          <Modal.Title>Editar Emergencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Row />
                <Form.Control
                  id="fecha"
                  required
                  type="datetime-local"
                  className="mb-2"
                  value={getData.fecha}
                  onChange={(e) =>
                    setGetData({
                      ...getData,
                      fecha: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Row />
                <Form.Select
                  id="delito"
                  aria-label="select"
                  required="aria-required"
                  className="mb-2"
                  value={getData.delito}
                  onChange={(e) =>
                    setGetData({
                      ...getData,
                      delito: e.target.value,
                    })
                  }
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Vandalismo">Vandalismo</option>
                  <option value="Violencia Familiar">Violencia Familiar</option>
                  <option value="Asesinato">Asesinato</option>
                  <option value="Robo">Robo</option>
                  <option value="Agresión Sexual">Agresión Sexual</option>
                  <option value="Persona Desaparecida">
                    Persona Desaparecida
                  </option>
                  <option value="Otro">Otro</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Row />
                <Form.Control
                  required
                  id="descripcion"
                  placeholder="Descripción"
                  type="text"
                  className="mb-2"
                  value={getData.descripcion}
                  onChange={(e) =>
                    setGetData({
                      ...getData,
                      descripcion: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Row />
                <Form.Control
                  id="nombres"
                  placeholder="Nombres denunciante"
                  type="text"
                  className="mb-2"
                  value={getData.nombres}
                  onChange={(e) =>
                    setGetData({
                      ...getData,
                      nombres: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Row />
                <Form.Control
                  id="unidad"
                  placeholder="Unidad que brinda apoyo"
                  type="text"
                  className="mb-2"
                  value={getData.unidad}
                  onChange={(e) =>
                    setGetData({
                      ...getData,
                      unidad: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Row />
                <Form.Control
                  id="response"
                  placeholder="Respuesta"
                  type="text"
                  className="mb-2"
                  value={getData.response}
                  onChange={(e) =>
                    setGetData({
                      ...getData,
                      response: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Modal.Footer>
                <Button
                  className="md-3"
                  variant="secondary"
                  onClick={() => setIsModalEditar(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="text-center mt-4 mb-4"
                  variant="primary"
                  type="submit"
                >
                  Editar
                </Button>
              </Modal.Footer>
            </Form>
          </Stack>
        </Modal.Body>
      </Modal>
    </div>
  );
};
