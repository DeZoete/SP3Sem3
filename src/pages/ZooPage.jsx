import { useEffect, useState } from "react";
import facade from "../util/apiFacade";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.thead`
  background-color: #f2f2f2;
`;

const TableBody = styled.tbody`
  /* Add your styles here */
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const TableHeaderData = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

function ZooPage() {
  const [zoos, setZoos] = useState([]);
  const [species, setSpecies] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  // Fetch all data from api 
  useEffect(() => {
    // Fetch zoos data
    facade.fetchDataZoo("zoos")
      .then((data) => setZoos(data))
      .catch((error) => {
        console.error("Error fetching zoos:", error);
        setError(error);
      });

    // Fetch species data
    facade.fetchDataZoo("species")
      .then((data) => setSpecies(data))
      .catch((error) => {
        console.error("Error fetching species:", error);
        setError(error);
      });

    // Fetch animals data
    facade.fetchDataZoo("animals")
      .then((data) => setAnimals(data))
      .catch((error) => {
        console.error("Error fetching animals:", error);
        setError(error);
      });
  }, []);

  
  return (
    <div>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      
      <Button onClick={() => setSelectedCategory("zoos")}>Zoos</Button>
      <Button onClick={() => setSelectedCategory("species")}>Species</Button>
      <Button onClick={() => setSelectedCategory("animals")}>Animals</Button>

      {selectedCategory === "zoos" && (
        <>
          <h2>Zoos</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderData>Zoo Name</TableHeaderData>
                <TableHeaderData>Zoo Location</TableHeaderData>
              </TableRow>
            </TableHeader>
            <TableBody>
              {zoos.map((zoo) => (
                <TableRow key={zoo.zooId}>
                  <TableData>{zoo.zooName}</TableData>
                  <TableData>{zoo.zooLocation}</TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}

      {selectedCategory === "species" && (
        <>
          <h2>Species</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderData>Species Name</TableHeaderData>
                <TableHeaderData>Diet</TableHeaderData>
                <TableHeaderData>Habitat</TableHeaderData>
              </TableRow>
            </TableHeader>
            <TableBody>
              {species.map((specie) => (
                <TableRow key={specie.speciesId}>
                  <TableData>{specie.speciesName}</TableData>
                  <TableData>{specie.diet}</TableData>
                  <TableData>{specie.habitat}</TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}

      {selectedCategory === "animals" && (
        <>
          <h2>Animals</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderData>Animal Name</TableHeaderData>
                <TableHeaderData>Animal Age</TableHeaderData>
                <TableHeaderData>Species Id</TableHeaderData>
              </TableRow>
            </TableHeader>
            <TableBody>
              {animals.map((animal) => (
                <TableRow key={animal.animalId}>
                  <TableData>{animal.animalName}</TableData>
                  <TableData>{animal.animalAge}</TableData>
                  <TableData>{animal.speciesId}</TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}

export default ZooPage;