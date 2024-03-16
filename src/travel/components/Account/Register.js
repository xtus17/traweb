import React, { useState } from "react";
import {
  Button,
  Stack,
  Image,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useAutenticado } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import logoEs from "../../../Assets/logoWeb.png";

export function Register() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signup } = useAutenticado();
  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/travel/home");
    } catch (error) {
      setError("Upss! Sucedió un error");
      onOpen();
    }
  };

  return (
    <>
      <Stack py={12} px={20} minH="100vh" justifyContent={"center"}>
        <Flex p={8} flex={1} justify="center">
          <VStack
            spacing={8}
            boxSize={{ base: "xs", sm: "sm", md: "md" }}
            h="max-content !important"
            bg={useColorModeValue("white", "gray.700")}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
          >
            <Image
              src={logoEs}
              objectFit="cover"
              maxH={"70px"}
              alt="Logo easySOS"
            />

            <form onSubmit={handleSubmit}>
              <FormControl mb={3} isRequired>
                <FormLabel>Correo</FormLabel>
                <Input
                  type="email"
                  name="email"
                  autoFocus
                  placeholder="Tu correo"
                  onChange={handleChange}
                />
              </FormControl>

              <br />
              <FormControl mb={3} isRequired>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Tu contraseña"
                  minLength={6}
                  onChange={handleChange}
                  autocomplete="off"
                />
              </FormControl>
              <br />
              <Button
                fontSize={"sm"}
                fontWeight={600}
                colorScheme="teal"
                variant="solid"
                w="100%"
                type="submit"
              >
                Registrar Usuario
              </Button>
              <br />
              <br />
            </form>
          </VStack>

          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay
              bg="blackAlpha.300"
              backdropFilter="blur(10px) hue-rotate(90deg)"
            />
            <ModalContent>
              <ModalHeader>Atención</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>{error}</Text>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Cerrar</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </Stack>
    </>
  );
}
