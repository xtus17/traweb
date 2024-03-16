import { Box, Heading, Text, Button, Link } from "@chakra-ui/react";

export function NotFound() {
  return (
    <Box textAlign="center" py={200} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="25px" mt={3} mb={2}>
        La página no existe
      </Text>
      <Text color={"gray.500"} mb={6}>
        Por favor regresa a Inicio
      </Text>

      <Button
        fontSize={"sm"}
        fontWeight={600}
        colorScheme="teal"
        variant="solid"
      >
        <Link
          fontSize={{ base: "md", sm: "md" }}
          _hover={{
            textDecoration: "none",
          }}
          href="/"
        >
          Regresa a Inicio
        </Link>
      </Button>
    </Box>
  );
}
