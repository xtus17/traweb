import React, { useState } from "react";
import { Header } from "./../../Header";
import { Stack, Center, Box, Button } from "@chakra-ui/react";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa";

import { Link, Icon } from "@chakra-ui/react";

export function Compress() {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "wvdro59z");
    data.append("cloud_name", "dn2vjqp97");

    fetch("https://api.cloudinary.com/v1_1/dn2vjqp97/image/upload", {
      method: "post",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        // Ajusta la calidad a 80 en la URL generada
        const imageUrl = `${data.url.replace("/upload/", "/upload/q_80/")}`;
        setUrl(imageUrl);
      })
      .catch((e) => console.log(e));
  };

  console.log(url);

  return (
    <>
      <Header />

      <Center>
        <Stack pt={20}>
          <Center pb={5} fontSize={20} fontWeight={"bold"}>
            <FaCompressArrowsAlt />
            <Box mx={4}>Comprimir Imágenes</Box>
          </Center>

          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <br />

          <Button
            fontSize={"sm"}
            fontWeight={600}
            colorScheme="teal"
            variant="solid"
            w="100%"
            onClick={uploadImage}
          >
            Comprimir
          </Button>

          <br />
          <br />

          {url && (
            <Center>
              <Link href={url} isExternal>
                <Icon as={FaImage} boxSize={6} />
              </Link>
            </Center>
          )}
        </Stack>
      </Center>
    </>
  );
}
