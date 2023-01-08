import axios from 'axios';
import { useState, useEffect } from 'react'
import ResidentsInfo from './components/ResidentsInfo';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
// import LiveSearch from './components/LiveSearch';
import LocationInfo from './components/LocationInfo';
import './App.css'
import Search from 'antd/es/transfer/search';
import SearchBar from './components/SearchBar';
import names from './assets/data/names';

function App() {

  const [data, setData] = useState({})
  const [locationId, setLocationId] = useState(Math.ceil(Math.random()*126));
  // const [idValue, setIdValue] = useState();
   //* ----------------------------------------------------------------------
  //? LOCATION INFORMATION
  const [locationName, setLocationName] = useState('');
  const [locationType, setLocationType] = useState('');
  const [locationDimension, setLocationDimension] = useState('');
   //* ----------------------------------------------------------------------
//? Residents cards
  const [residents, setResidents] = useState([]);
  // const [placeholderText, setPlaceholderText] = useState('Type a location Id')
   //* ----------------------------------------------------------------------
  //? PAGINATION
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  //* ----------------------------------------------------------------------
  //? LIVE SEARCH
  const [locations, setLocations] = useState([]);
  const [locationMatch, setLocationMatch] = useState([]);
  // const [data, setData] = useState({})
  // const [selection, setSelection] = useState('Enter location name');
  const [enteredWord, setEnteredWord] = useState('');
   //* ----------------------------------------------------------------------

  useEffect(() => {
    // setLoading(true);
    axios.get(`https://rickandmortyapi.com/api/location/${locationId}`)
        .then((response) => setData(response.data))
        // .then(console.log('data', data))
        .catch((error) => console.log('error', error));
        setEnteredWord('');
  },[locationId]);  

  useEffect(() => {
    if (data) {
      // console.log(data)
      setLocationName(data.name);
      setLocationType(data.type);
      setLocationDimension(data.dimension);
      setResidents(data.residents);
      // setLoading(false);
    }
  }, [data]);

  //* ----------------------------------------------------------------------

  //! LIVE SEARCH
  useEffect(() => {
    const loadLocations = async () => {
        const response = await axios.get('https://rickandmortyapi.com/api/location');
        setLocations(response.data.results);
    };
    loadLocations();
  }, []);

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
  //* ----------------------------------------------------------------------


  //* ----------------------------------------------------------------------
  //? PAGINATION
  //! Get current posts
  const indexLastPost = currentPage * postsPerPage;
  const indexFirstPost = indexLastPost - postsPerPage;
  const currentPosts = residents?.slice(indexFirstPost, indexLastPost);
  //! Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //* ----------------------------------------------------------------------


  return (
    <div className="App">
      <div className='container'>
        <div className="header__img"></div>

        {/* <SearchBar placeHolder={'Type a location name'} data={names}/> */}
        {/* LIVESEARCH */}
        {/* <LiveSearch /> */}
        <div className="results">
            {/* ++++++++++++++++++ */}
            <div className="search__container">
                <div className="search">
                <input type="text" value={enteredWord} onChange={(e) => {searchLocations(e.target.value); setEnteredWord(e.target.value)}} placeholder= 'Enter location name' />
                {/* <button onClick={searchId}>Search</button> */}
                </div>
            </div>
            <div className='results__container'>
                <ul>
                {locationMatch && locationMatch.map((item, index) => (
                    <div className='location__option' key={index}>
                        <p style={{marginLeft: '1rem', padding: '7px'}} onClick={() => { setLocationId(item.id); setLocationMatch([]); setEnteredWord(item.name)}}>{item.name} {item.id}</p>    
                    </div>
                    ))}
                </ul>
            </div>
        </div>

          {/* Location information */}
          <LocationInfo name={locationName} type={locationType} dimension={locationDimension} residents={residents?.length} />
          {/* Residents cards  */}
          <div className="residents__container">
            {currentPosts?.map(resident => (
              <ResidentsInfo resident={resident} key={resident} />
            ))}
          </div>
      </div>
      <Pagination postsPerPage={postsPerPage} totalPosts={residents?.length} paginate={paginate} />
      <Footer />
      
    </div>
  )
}

export default App
