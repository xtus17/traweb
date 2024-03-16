import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import logoEs from "../../Assets/logoEs.png";

const SocialButton = (props) => {
  const { label, href, children } = props;
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "teal"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = (props) => {
  const { children } = props;
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export function Footer() {
  let now = new Date();
  let year = now.getFullYear();

  return (
    <Box
      bg={useColorModeValue("blackAlpha.200", "whiteAlpha.200")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 2fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Image objectFit="cover" maxW={"200px"} src={logoEs} />
            </Box>

            <Text fontSize={"sm"}>© {year} Todos los Derechos Reservados</Text>
            <Stack direction={"row"} spacing={6}>
              <SocialButton
                label={"Facebook"}
                href={"https://www.facebook.com/EasySosSeguridad/"}
              >
                <FaFacebookF />
              </SocialButton>
              <SocialButton label={"Instagram"} href={"#"}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader fontWeight={800}></ListHeader>
            <Link href={"#"}>Preguntas Frecuentes</Link>
            <Link href={"#"}>Blog</Link>
            <Link href={"/form"}>Contáctame</Link>
            <Link href={"/term"}>Términos y Condiciones</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Lima, Perú</ListHeader>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
