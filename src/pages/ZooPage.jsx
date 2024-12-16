import { useEffect, useState } from "react";
import facade from "../util/apiFacade";


function ZooPage() {
    
    const [selectedCategory, setSelectedCategory] = useState("");
    
    // Fetch all trips data from api 
    useEffect(() => {
      const value = facade.fetchData("https://codupont.dk/api/v1/zoos")
     // const value = facade.fetchData("https://codupont.dk/api/v1/species")
      // const value = facade.fetchData("https://codupont.dk/api/v1/animals")
      console.log('value: ', value)

      value.then((data) => {
        setSelectedCategory(data);
      })
       // .then((response) => response.json())
        //.then((data) => {
        //  setSelectedTrip(data);
        //})
        //.catch((error) => console.error("Error fetching trips:", error));
}, []);
  
   
  
    return (
      <div>
        {selectedCategory && (
          <div>
            <h2>Trip Details</h2>
            <ul>
              <li>Name: {selectedCategory.name}</li>
              <li>Price: {selectedCategory.price}</li>
              <li>Guide: {selectedCategory.guide ? selectedCategory.guide.name : "No Category available"}</li> {/* Assuming guide is an object */}
              <li>Category: {selectedCategory.category ? selectedCategory.category.name : "No category available"}</li> {/* Assuming category is an object */}
              <li>Date: {new Date(selectedCategory.starttime).toLocaleDateString()} - {new Date(selectedCategory.endtime).toLocaleDateString()}</li>
            </ul>
          </div>
        )}
      </div>
    );
}

export default ZooPage;