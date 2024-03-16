import React, { useState } from "react";
import { Modal, Stack, Button, Form, Dropdown } from "react-bootstrap";
import editLocation from "./editLocation";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "../../../../../../src/index.css";

export const ModalEditLocation = ({
  setIsModalDeleteLocation,
  isModalDeleteLocation,
  editarLocation,
}) => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({});
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [departamento, setDepartamento] = useState("");

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

  function editLocationModal() {
    const direccion = address;
    const location = coordinates;
    const city = ciudad;
    const province = provincia;
    const state = departamento;

    setAddress("");

    const infoData = {
      city,
      province,
      state,
      location,
      direccion,
    };

    setIsModalDeleteLocation(false);
    const id = editarLocation.id;
    editLocation({ infoData, id });
  }

  return (
    <Modal
      className="modal"
      animation={true}
      show={isModalDeleteLocation}
      onHide={() => setIsModalDeleteLocation(false)}
    >
      <Modal.Header>
        <Modal.Title>Editar Ubicación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack>
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
                      className: "mb-2",
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
                          ? { backgroundColor: "#0FA9FF", cursor: "pointer" }
                          : { backgroundColor: "white", cursor: "pointer" };
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
          </Stack>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setIsModalDeleteLocation(false)}
        >
          Cancelar
        </Button>
        <Button variant="primary" onClick={editLocationModal}>
          Editar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
