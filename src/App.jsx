import axios from 'axios';
import { useState, useEffect } from 'react'
import ResidentsInfo from './components/ResidentsInfo';
import Footer from './components/Footer';
import './App.css'

function App() {

  const [data, setData] = useState({})
  const [locationId, setLocationId] = useState(Math.ceil(Math.random()*126));
  // const [locationId, setLocationId] = useState(13);
  const [idValue, setIdValue] = useState();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [dimension, setDimension] = useState('');
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/location/${locationId}`)
        .then((response) => setData(response.data))
        // .then(console.log('data', data))
        .catch((error) => console.log('error', error));

  },[locationId]);

  useEffect(() => {
    if (data) {
      console.log(data)
      setName(data.name);
      setType(data.type);
      setDimension(data.dimension);
      setResidents(data.residents);
    }
  }, [data]);

  const searchId = () => {
    if(Number(idValue) > 126) {
      alert('The maximum number of locations are 126');
      setIdValue('');
    } else {
      setLocationId(idValue)
      setIdValue('');
    }
  }

  return (
    <div className="App">
      <div className='container'>
        <div className="header__img"></div>
        {/* <div>
          <h3 className="title">Rick and Morty Wiki</h3>
        </div> */}

          <div className="search__container">
            <div className="search">
              <input type="text" value={idValue} onChange={e => setIdValue(e.target.value)} placeholder='Type a location Id' />
              <button onClick={searchId}>Search</button>
            </div>
          </div>
          
          <div className="location">
            {/* <h2>{name}</h2> */}
            <div className="location__info">
            <div>
                <h5>Nombre: </h5>
                <p>{name} </p>
              </div>
              <div className='population'>
                <h5 className='type'>Type: </h5>
                <p>{type} </p>
              </div>
              <div>
                <h5>Dimension:</h5>
                <p>{dimension}</p>
              </div>
              <div className='population'>
                <h5>Population:</h5>
                <p>{residents?.length}</p>
              </div>
            </div>
          </div>
          {/* {(residents?.length > 0) && <div className='residents__title'>Residents</div>} */}
          <div className="residents__container">
            {residents?.map(resident => (
              <ResidentsInfo resident={resident} key={resident} />
            ))}
          </div>
      </div>
      <Footer />
    </div>
  )
}

export default App