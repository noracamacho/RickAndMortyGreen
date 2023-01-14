import React, { useState, useEffect } from 'react';
import axios from 'axios';


function LiveSearch() {
    const [locations, setLocations] = useState([]);
    const [locationMatch, setLocationMatch] = useState([]);
    const [locationId, setLocationId] = useState([]);
    // const [data, setData] = useState({})
    // const [selection, setSelection] = useState('Enter location name');
    const [enteredWord, setEnteredWord] = useState('');
     //* ----------------------------------------------------------------------
    useEffect(() => {
        const loadLocations = async () => {
            const response = await axios.get('https://rickandmortyapi.com/api/location');
            setLocations(response.data.results);
        };
        loadLocations();
    }, []);

    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/location/${locationId}`)
            .then((response) => setData(response.data))
            // .then(console.log('data', data))
            .catch((error) => console.log('error', error));
      },[locationId]);  

    // console.log(locations);

    const searchLocations = (text) => {
        if (!text) {
            setLocationMatch([]);
        } else {
            let matches = locations.filter((location) => {
                const regex = new RegExp(`${text}`, 'gi');
                console.log('1', location.name);
                return location.name.match(regex);
            });
            setLocationMatch(matches);
        }
    };

  return (
    <>
        <div className="results">
            {/* ++++++++++++++++++ */}
            <div className="search__container">
                <div className="search">
                <input type="text" value={enteredWord} onChange={(e) => {searchLocations(e.target.value); setEnteredWord(e.target.value)}} placeholder= 'Enter location name' />
                {/* <button onClick={searchId}>Search</button> */}
                </div>
            </div>
            <div className='results__container'>
                <ul className='result__window'>
                {locationMatch && locationMatch.map((item, index) => (
                    <div className='location__option' key={index}>
                        <p style={{marginLeft: '1rem', padding: '7px'}} onClick={() => { setLocationId(item.id); setLocationMatch([]); setEnteredWord(item.name)}}>{item.name} {item.id}</p>    
                    </div>
                    ))}
                </ul>
            </div>
        </div>
    </>
  )
  
}

export default LiveSearch