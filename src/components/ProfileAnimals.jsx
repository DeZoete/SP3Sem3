
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import facade from '../util/apiFacade';

const AnimalTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const AnimalRow = styled.tr`
  border-bottom: 1px solid #ccc;
`;

const AnimalCell = styled.td`
  padding: 10px;
`;

export default function ProfileAnimals() {
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({
    animalName: '',
    animalAge: '',
    speciesId: '',
  });
  const { setErrorMessage } = useOutletContext();
  const isUserAdmin = facade.hasUserAccess('user', true);
  //   const isUserAdmin = true

  useEffect(() => {
    facade
      .getData('animals')
      .then((data) => setAnimals(data))
      .catch((err) => setErrorMessage(err.message));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnimal({ ...newAnimal, [name]: value });
  };

  const handleAddAnimal = (id) => {
    facade
      .postData(`animals/zoo/${id}`, newAnimal)
      .then((animal) => {
        setAnimals([...animals, animal]);
        setNewAnimal({ animalName: '', animalAge: '', speciesId: '' });
      })
      .catch((err) => setErrorMessage(err.message));
  };

  const handleEditAnimal = (id, updatedAnimal) => {
    facade
      .putData(`animals/${id}`, updatedAnimal)
      .then((animal) =>
        setAnimals(animals.map((a) => (a.animalId === id ? animal : a)))
      )
      .catch((err) => setErrorMessage(err.message));
  };

  const handleDeleteAnimal = (id) => {
    facade
      .deleteData(`animals/${id}`)
      .then(() => setAnimals(animals.filter((a) => a.animalId !== id)))
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <div>
      <h2>Animal Administration</h2>
      <AnimalTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            {isUserAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <AnimalRow key={animal.animalId}>
              <AnimalCell>{animal.animalName}</AnimalCell>
              <AnimalCell>{animal.animalAge}</AnimalCell>
              {isUserAdmin && (
                <AnimalCell>
                  {/*
                  <button
                    onClick={() =>
                      handleEditAnimal(animal.animalId, {
                        animalName: 'New Name',
                        animalAge: animal.animalAge,
                        speciesId: animal.speciesId,
                      })
                    }
                  >
                    Edit
                  </button>
                  */}
                  <button onClick={() => handleDeleteAnimal(animal.animalId)}>
                    Delete
                  </button>
                </AnimalCell>
              )}
            </AnimalRow>
          ))}
        </tbody>
      </AnimalTable>
      {isUserAdmin && (
        <>
          <h3>Add New Animal</h3>
          <input
            type="text"
            name="animalName"
            placeholder="Name"
            value={newAnimal.animalName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="animalAge"
            placeholder="Age"
            value={newAnimal.animalAge}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="speciesId"
            placeholder="Species ID"
            value={newAnimal.speciesId}
            onChange={handleInputChange}
          />
          <button onClick={handleAddAnimal}>Add Animal</button>
        </>
      )}
    </div>
  );
}
