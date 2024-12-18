import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import facade from '../util/apiFacade';

const ZooTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const ZooRow = styled.tr`
  border-bottom: 1px solid #ccc;
`;

const ZooCell = styled.td`
  padding: 10px;
`;

const AnimalList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const AnimalItem = styled.li`
  margin: 5px 0;
`;

export default function ProfileZoos() {
  const [zoos, setZoos] = useState([]);
  const [newZoo, setNewZoo] = useState({ zooName: '', zooLocation: '' });
  const { setErrorMessage } = useOutletContext();
  const isUserAdmin = facade.hasUserAccess('admin', true);

  useEffect(() => {
    facade
      .getData('zoos')
      .then((data) => setZoos(data))
      .catch((err) => setErrorMessage(err.message));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewZoo({ ...newZoo, [name]: value });
  };

  const handleAddZoo = () => {
    facade
      .postData('zoos', newZoo)
      .then((zoo) => setZoos([...zoos, zoo]))
      .catch((err) => setErrorMessage(err.message));
  };

  const handleEditZoo = (id, updatedZoo) => {
    facade
      .putData(`zoos/${id}`, updatedZoo)
      .then((zoo) => setZoos(zoos.map((z) => (z.zooId === id ? zoo : z))))
      .catch((err) => setErrorMessage(err.message));
  };

  const handleDeleteZoo = (id) => {
    facade
      .deleteData(`zoos/${id}`)
      .then(() => setZoos(zoos.filter((z) => z.zooId !== id)))
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <div>
      <h2>Zoo Administration</h2>
      <ZooTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Animals</th>
            {isUserAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {zoos.map((zoo) => (
            <ZooRow key={zoo.zooId}>
              <ZooCell>{zoo.zooName}</ZooCell>
              <ZooCell>{zoo.zooLocation}</ZooCell>
              <ZooCell>
                <AnimalList>
                  {zoo.animals.map((animal) => (
                    <AnimalItem key={animal.animalId}>
                      {animal.animalName} (Age: {animal.animalAge})
                    </AnimalItem>
                  ))}
                </AnimalList>
              </ZooCell>
              {isUserAdmin && (
                <ZooCell>
                  <button
                    onClick={() =>
                      handleEditZoo(zoo.zooId, {
                        zooName: 'New Name',
                        zooLocation: 'New Location',
                      })
                    }
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteZoo(zoo.zooId)}>
                    Delete
                  </button>
                </ZooCell>
              )}
            </ZooRow>
          ))}
        </tbody>
      </ZooTable>
      {isUserAdmin && (
        <>
          <h3>Add New Zoo</h3>
          <input
            type="text"
            name="zooName"
            placeholder="Name"
            value={newZoo.zooName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="zooLocation"
            placeholder="Location"
            value={newZoo.zooLocation}
            onChange={handleInputChange}
          />
          <button onClick={handleAddZoo}>Add Zoo</button>
        </>
      )}
    </div>
  );
}
