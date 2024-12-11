import { useEffect, useState } from 'react';
import facade from '../util/apiFacade';

function LoggedIn(loggedIn) {
    const [dataFromServer, setDataFromServer] = useState([])
    const [error, setError] = useState('All is good')
    useEffect(() => { 
        facade
        .fetchData()
        .then(data=> setDataFromServer(data))
        .catch((error) => {
            console.log(JSON.stringify(error))
            setError(error.status)
        })
    }, [])
 
    return (
      <div>
        <h2>Data Received from server</h2>
        
        {
            facade.hasUserAccess("admin",LoggedIn ) || facade.hasUserAccess('user',LoggedIn) ? (
                <ul>
                {dataFromServer.map(hotel => <li key={hotel.id}> {hotel.hotelName}</li>)}
            </ul>
            ) : (
                <h3> your role is not fit for this, dude!</h3>
            )
        }


        <p>{error}</p>
      </div>
    )
  }
export default LoggedIn 