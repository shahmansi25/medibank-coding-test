// src/App.tsx
import { useState } from "react";
import "./App.css";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import useFetchAPI from "./hooks/useFetchAPI";
import CatList from "./components/CatList";
import LoadingSpinner from "./helpers/LoadingSpinner";
import { API_URL } from "./index";

interface Pet {
  name: string;
  type: string;
}

interface Person {
  name: string;
  gender: string;
  age: number;
  pets: Pet[];
}

interface CatsByGender {
  [key: string]: {
    catDetails: {
      catName: string;
      ownerName: string;
      ownerAge: number;
      otherPets: { name: string; type: string }[];
    }[];
  };
}

const App = () => {
  const { data, loading, error } = useFetchAPI<Person[]>({
    url: API_URL,
    initialData: []
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getCatsByGender = () => {
    const cats: CatsByGender = {};

    data.forEach((person) => {
      if (person.pets) {
        person.pets.forEach((pet) => {
          const gender = person.gender.toLowerCase();
          if (
            pet.type === "Cat" &&
            pet.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            if (!cats[gender]) {
              cats[gender] = {
                catDetails: []
              };
            }

            const catDetails = {
              catName: pet.name,
              ownerName: person.name,
              ownerAge: person.age,
              otherPets: person.pets
                .filter((otherPet) => otherPet.type !== "Cat")
                .map((otherPet) => ({
                  name: otherPet.name,
                  type: otherPet.type
                }))
            };

            cats[gender].catDetails.push(catDetails);
          }
        });
      }
    });
    Object.keys(cats).forEach((gender) => {
      cats[gender].catDetails.sort((a: any, b: any) =>
        a.catName.localeCompare(b.catName)
      );
    });

    return cats;
  };

  return (
    <Container className="App">
      <h1 className="mt-4 mb-4">Cats List</h1>
      {loading && <LoadingSpinner />}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && Object.keys(data).length > 0 && (
        <>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search for a cat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          {Object.entries(getCatsByGender()).map(([gender, { catDetails }]) => (
            <CatList key={gender} gender={gender} catDetails={catDetails} />
          ))}
        </>
      )}
    </Container>
  );
};

export default App;
