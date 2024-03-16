import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { db } from "../firebase";
import { FaPen, FaGlobe, FaTrash, FaPaperclip } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import {
  useColorModeValue,
  Tooltip,
  SimpleGrid,
  Button,
  Input,
  HStack,
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Flex,
} from "@chakra-ui/react";
import { ModalDelete } from "./Modal/Delete/delete/ModalDelete";
import { ModalEditLocation } from "./Modal/Edit/EditLocation/ModalEditLocation";
import { ModalDeleteFiles } from "./Modal/Delete/deleteFiles/ModalDeleteFiles";
import { ModalEdit } from "./Modal/Edit/Edit/ModalEdit";
import { Link } from "@chakra-ui/react";

function searchingTerm(term) {
  return function (x) {
    return x.category.toLowerCase().includes(term) || !term;
  };
}

export const Home = () => {
  const [data, setData] = useState([]);
  const [searchs, setSearchs] = useState([]);
  const [term, setTerm] = useState([]);
  const [editar, setEditar] = useState([]);
  const [eliminar, setEliminar] = useState([]);
  const [editarLocation, setEditarLocation] = useState([]);
  const [isModalEditar, setIsModalEditar] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalDeleteLocation, setIsModalDeleteLocation] = useState(false);
  const [isModalDeleteFiles, setIsModalDeleteFiles] = useState(false);
  const [dataFilesDelete, setDataFilesDelete] = useState([]);

  useEffect(() => {
    setSearchs(data);
  }, [data]);

  const getData = () => {
    db.collection("tangamandapio")
      .orderBy("category", "desc")
      .onSnapshot((querySnapshot) => {
        const array = [];
        querySnapshot.forEach((doc) => {
          array.push({ ...doc.data(), id: doc.id });
        });
        setData(array);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Header />

      <ModalDelete
        isModalDelete={isModalDelete}
        setIsModalDelete={setIsModalDelete}
        eliminar={eliminar}
      />

      <ModalEditLocation
        setIsModalDeleteLocation={setIsModalDeleteLocation}
        isModalDeleteLocation={isModalDeleteLocation}
        editarLocation={editarLocation}
      />

      {editar && (
        <ModalEdit
          isModalEditar={isModalEditar}
          setIsModalEditar={setIsModalEditar}
          editar={editar}
        />
      )}

      <ModalDeleteFiles
        isModalDeleteFiles={isModalDeleteFiles}
        setIsModalDeleteFiles={setIsModalDeleteFiles}
        dataFilesDelete={dataFilesDelete}
      />

      <form>
        <HStack pt={12} px={10}>
          <Flex pt={8} flex={1} justify="center">
            <Input
              type="text"
              name="term"
              autoFocus
              placeholder="Buscar por Categoría"
              onChange={(e) => setTerm(e.target.value)}
            />
          </Flex>
        </HStack>
      </form>

      <HStack pt={7} pb={6} px={10}>
        <Button
          leftIcon={<IoIosAddCircle />}
          fontSize={"sm"}
          fontWeight={600}
          colorScheme="teal"
          variant="solid"
          w={180}
        >
          <Link
            _hover={{
              textDecoration: "none",
            }}
            href="/travel/formadd"
          >
            Nuevo Lugar Turístico
          </Link>
        </Button>
      </HStack>

      <HStack pt={5} pb={2} px={2}>
        <Table bg={useColorModeValue("#CED8E2", "#22394A")}>
          <thead>
            <tr>
              <th>#</th>
              <th>Categoría</th>
              <th>Título</th>
              <th>Descripcion</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <Tbody>
            {data.filter(searchingTerm(term)).map((datas, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{datas.category}</Td>
                <Td>{datas.place}</Td>
                <Td>{datas.descripcion}</Td>
                <Td>{datas.direccion}</Td>

                <Td>
                  <SimpleGrid
                    columns={{ sm: 2, md: 4 }}
                    spacingX={{ sm: 7, md: 5 }}
                  >
                    <Tooltip label="Editar" placement="left">
                      <Box position={"relative"} color={"white"}>
                        <Button
                          size="sm"
                          bg="white"
                          color="black"
                          onClick={() => {
                            setIsModalEditar(true);
                            setEditar({ ...datas });
                          }}
                        >
                          <FaPen />
                        </Button>
                      </Box>
                    </Tooltip>

                    <Tooltip
                      label="Eliminar imágenes adjuntos"
                      placement="top-start"
                    >
                      <Box position={"relative"}>
                        <Button
                          size="sm"
                          color="white"
                          bg="black"
                          onClick={() => {
                            setIsModalDeleteFiles(true);
                            setDataFilesDelete(datas);
                          }}
                        >
                          <FaPaperclip color="white" />
                        </Button>
                      </Box>
                    </Tooltip>

                    <Tooltip label="Editar dirección" placement="bottom">
                      <Box position={"relative"}>
                        <Button
                          size="sm"
                          color="red"
                          bg="yellow"
                          onClick={() => {
                            setIsModalDeleteLocation(true);
                            setEditarLocation(datas);
                          }}
                        >
                          <FaGlobe />
                        </Button>
                      </Box>
                    </Tooltip>

                    <Tooltip label="Eliminar" placement="top">
                      <Box position={"relative"}>
                        <Button
                          size="sm"
                          color="white"
                          bg="red"
                          onClick={() => {
                            setIsModalDelete(true);
                            setEliminar(datas);
                          }}
                        >
                          <FaTrash />
                        </Button>
                      </Box>
                    </Tooltip>
                  </SimpleGrid>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </HStack>
    </Box>
  );
};
