import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import facade from '../util/apiFacade';

function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState([]);
  const { errorMessage, setErrorMessage } = useOutletContext();

  useEffect(() => {
    facade
      .fetchData()
      .then((data) => setDataFromServer(data))
      .catch((error) => {
        console.log(JSON.stringify(error));
        setErrorMessage(error.status);
      });
  }, []);

  return (
    <div>
      <h2>Data Received from server</h2>
      {facade.hasUserAccess('admin', true) ||
      facade.hasUserAccess('user', true) ? (
        <ul>
          {dataFromServer.map((hotel) => (
            <li key={hotel.id}> {hotel.hotelName}</li>
          ))}
        </ul>
      ) : (
        <h3>Your role is not fit for this, dude!</h3>
      )}
      <p>{errorMessage}</p>
    </div>
  );
}

export default LoggedIn;
