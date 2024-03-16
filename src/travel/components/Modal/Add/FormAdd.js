import React, { useState } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import "./Styles.css";
import { Stack, Center, Box, chakra, Image } from "@chakra-ui/react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { v4 as uuid } from "uuid";
import avatar from "./../../../../Assets/avatarImage.png";
import avatarVideo from "./../../../../Assets/avatarVideo.png";
import addData from "./addData";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { ThreeBody } from "@uiball/loaders";
import { MdPlace } from "react-icons/md";
import { Header } from "./../../Header";
import upload from "./../../../../Assets/upload.png";
import uploadVideo from "./../../../../Assets/uploadVideo.png";
import { FaWindowClose } from "react-icons/fa";

export function FormAdd() {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({});
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [arrayImage, setArrayImage] = useState([]);
  const [arrayVideo, setArrayVideo] = useState([]);
  const [loader, setLoader] = useState(false);

  const center = { lat: -11.1043861, lng: -77.6069797 };
  const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  };

  const searchOptions = {
    bounds: defaultBounds,
    componentRestrictions: { country: "PE" },
  };

  const getAddressObject = (address_components) => {
    const ShouldBeComponent = {
      state: ["administrative_area_level_1"],
      province: ["administrative_area_level_2"],
      city: ["locality"],
      country: ["country"],
    };

    let address = {
      province: "",
      city: "",
      country: "",
      state: "",
    };

    address_components.forEach((result) => {
      for (var shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].indexOf(result.types[0]) !== -1) {
          if (shouldBe === "country") {
            address[shouldBe] = result.short_name;
          } else {
            address[shouldBe] = result.long_name;
          }
        }
      }
    });

    let addressCity = address.city;
    let prevProvince = address.province;
    let addressProvince = prevProvince.split(" ").splice(-1)[0];
    let prevState = address.state;
    let addressState = prevState.split(" ").splice(-1)[0];

    const object = addressCity + ", " + addressProvince + ", " + addressState;
    return object;
  };

  const handleSelect = async (value) => {
    const res = await geocodeByAddress(value);

    const result = res[0].address_components;

    const geo = getAddressObject(result);

    let coor = await getLatLng(res[0]);

    const location = {
      latitude: coor.lat,
      longitude: coor.lng,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    };

    const dir = value + "; " + geo;
    const geoCity = geo.split(",")[0];
    const geoProvince = geo.split(",")[1];
    const geoState = geo.split(",")[2];

    setAddress(dir);
    setCoordinates(location);

    setCiudad(geoCity);
    setProvincia(geoProvince);
    setDepartamento(geoState);
  };

  const uploadImage = async (imagenes) => {
    try {
      const imageBlob = [];
      await Promise.all(
        imagenes.map(async (image) => {
          const storage = getStorage();
          const archivoRef = ref(storage, `report/${uuid()}`);
          const uploadTask = await uploadBytes(archivoRef, image);
          const snap = uploadTask.metadata.fullPath;
          const imageRef = ref(storage, snap);
          const imageUrl = await getDownloadURL(imageRef);
          imageBlob.push(imageUrl);
        })
      );

      return imageBlob;
    } catch (error) {}
  };

  const uploadVid = async (videos) => {
    try {
      const videoBlob = [];
      await Promise.all(
        videos.map(async (video) => {
          const storage = getStorage();
          const archivoRef = ref(storage, `report/${uuid()}`);
          const uploadTask = await uploadBytes(archivoRef, video);
          const snap = uploadTask.metadata.fullPath;
          const videoRef = ref(storage, snap);
          const videoUrl = await getDownloadURL(videoRef);
          videoBlob.push(videoUrl);
        })
      );

      return videoBlob;
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const responseImage = await uploadImage(arrayImage);
      const responseVideo = await uploadVid(arrayVideo);

      const id = uuid();
      const category = document.getElementById("categoria").value;
      const descripcion = document.getElementById("descripcionPlace").value;
      const place = document.getElementById("placeName").value;
      const image = responseImage;
      const video = responseVideo;
      const direccion = address;
      const location = coordinates;
      const city = ciudad;
      const province = provincia.slice(1);
      const state = departamento.slice(1);

      const infoData = {
        id,
        descripcion,
        place,
        video,
        category,
        image,
        direccion,
        city,
        province,
        state,
        location,
      };

      setAddress("");
      setLoader(false);
      addData(infoData);

      navigate("/travel/home");
    } catch (error) {}
  };

  const fileDropImage = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...arrayImage, newFile];
      setArrayImage(updatedList);
    }
  };

  const fileRemoveImage = (file) => {
    const updatedList = [...arrayImage];
    updatedList.splice(arrayImage.indexOf(file), 1);
    setArrayImage(updatedList);
  };

  const fileDropVideo = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...arrayVideo, newFile];
      setArrayVideo(updatedList);
    }
  };

  const fileRemoveVideo = (file) => {
    const updatedList = [...arrayVideo];
    updatedList.splice(arrayVideo.indexOf(file), 1);
    setArrayVideo(updatedList);
  };

  return (
    <>
      <Header />
      <Center>
        <Stack pt={20}>
          <Center pb={5} fontSize={20} fontWeight={"bold"}>
            <MdPlace /> Agregar Nuevo Lugar Turístico
          </Center>
          <form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Select
                id="categoria"
                aria-label="select"
                required="aria-required"
                className="mb-3"
              >
                <option value="">Selecciona la categoría</option>
                <option value="Sitios Naturales">Sitios Naturales</option>{" "}
                {/*montañas, valles, lagos, rios, pantanos, grutas, areas protegidas */}
                <option value="Manifestaciones Culturales">
                  Manifestaciones Culturales
                </option>{" "}
                {/* museos, lugares historicos, lugares arqueologicos */}
                <option value="Folklore">Folklore</option>{" "}
                {/* manifestaciones religiosas, ferias, mercados, musica, danza, artes, gastronomia*/}
                <option value="Servicios">Servicios</option>{" "}
                {/*  alojamiento, restaurant, hoteles, bares, comida rapida*/}
                <option value="Medio de Transporte">
                  Medio de Transporte
                </option>{" "}
                {/*  terrestre, pie, bus publico, */}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Control
                id="placeName"
                placeholder="Lugar Nombre"
                type="text"
                className="mb-3"
                required
                autocomplete="off"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                id="descripcionPlace"
                placeholder="Descripción"
                type="text"
                className="mb-3"
                required
                as="textarea"
                rows={3}
                autocomplete="off"
              />
            </Form.Group>

            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
              searchOptions={searchOptions}
              shouldFetchSuggestions={address.length > 8}
              debounce={2500}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <Form.Control
                    {...getInputProps({
                      placeholder:
                        "Ingresa una dirección válida y espera 2 seg",
                      className: "mb-3",
                      required: "aria-required",
                    })}
                  ></Form.Control>

                  <>
                    {loading && (
                      <div className="relative inline-block">Cargando...</div>
                    )}
                    <Dropdown>
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        const style = suggestion.active
                          ? {
                              backgroundColor: "#CFE2FF",
                              cursor: "pointer",
                            }
                          : { backgroundColor: "black", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </Dropdown>
                  </>
                </div>
              )}
            </PlacesAutocomplete>

            <Stack direction="row" spacing={1}>
              <div className="drop-file-input">
                <div className="drop-file-input__label">
                  <img src={upload} alt="" />
                  <p>Carga tus imágenes</p>
                </div>
                <Form.Control
                  id="files"
                  type="file"
                  className="mb-3"
                  accept="image/png, image/jpeg"
                  onChange={fileDropImage}
                />
              </div>

              <div className="drop-file-input">
                <div className="drop-file-input__label">
                  <img src={uploadVideo} alt="" />
                  <p>Carga tus videos</p>
                </div>
                <Form.Control
                  id="filesVideo"
                  type="file"
                  className="mb-3"
                  accept="video/mp4"
                  onChange={fileDropVideo}
                />
              </div>
            </Stack>

            <Button
              className="text-center mt-4 mb-4"
              variant="primary"
              type="submit"
            >
              Guardar
            </Button>
          </form>

          {loader ? (
            <div className="loaderStyle">
              <ThreeBody size={200} speed={1.1} color="black" />
            </div>
          ) : (
            <>
              {arrayImage.length > 0 ? (
                <Box>
                  <chakra.span fontWeight={500}>Imágenes cargadas</chakra.span>
                  {arrayImage.map((item, index) => (
                    <Stack direction="row" boxSize={50} mt={5} key={index}>
                      <Image src={avatar} alt="" />
                      <Stack direction="column">
                        <chakra.span>{item.name}</chakra.span>
                        <chakra.span>{item.size}Bytes</chakra.span>
                      </Stack>
                      <chakra.span onClick={() => fileRemoveImage(item)}>
                        <Box cursor="pointer">
                          <FaWindowClose />
                        </Box>
                      </chakra.span>
                    </Stack>
                  ))}
                </Box>
              ) : null}

              {arrayVideo.length > 0 ? (
                <Box pt={10}>
                  <chakra.span fontWeight={500}>Videos cargados</chakra.span>
                  {arrayVideo.map((item, index) => (
                    <Stack direction="row" boxSize={50} mt={5} key={index}>
                      <Image src={avatarVideo} alt="" />
                      <Stack direction="column">
                        <chakra.span>{item.name}</chakra.span>
                        <chakra.span>{item.size}Bytes</chakra.span>
                      </Stack>
                      <chakra.span onClick={() => fileRemoveVideo(item)}>
                        <Box cursor="pointer">
                          <FaWindowClose />
                        </Box>
                      </chakra.span>
                    </Stack>
                  ))}
                </Box>
              ) : null}
            </>
          )}
        </Stack>
      </Center>
    </>
  );
}
