import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'

const ResidentsInfo = ({ resident }) => {

    const [data, setData] = useState({});
    const [name, setName] = useState('');
    const [origin, setOrigin] = useState('');
    const [status, setStatus] = useState('');
    const [species, setSpecies] = useState('');
    const [image, setImage] = useState('');
    const [episodes, setEpisodes] = useState(0);

    useEffect(() => {
        axios.get(resident)
        .then((response) => setData(response.data))
        // .then(console.log('data', data))
        .catch((error) => console.log('error', error));
    }, []);

    useEffect(() => {
        if(data) {
            console.log(data)
            setName(data?.name);
            setStatus(data?.status);
            setSpecies(data?.species);
            setOrigin(data?.origin?.name);
            setImage(data?.image);
            // console.log(data?.episode?.length);
            setEpisodes(data?.episode?.length);
        }
    }, [data])

  return (
    <div className='card'>
        <img src={image} alt="Resident Image" />
        <div className="description">
            <ul>
                <li><h4>{name}</h4></li>
                <li className='status lg'>
                    <div className='dot' style={{ backgroundColor: status == 'Dead' ?  'red' : status == 'Alive' ? 'green' : 'grey'}}></div>
                    <p>{status} - {species}</p>
                </li>
                <li className='sm'>Origin</li>
                <li className='lg'>{origin}</li>
                <li className='sm'>Episodes</li>
                <li className='lg'>{episodes}</li>
            </ul>
        </div>
    </div>
  )
}

export default ResidentsInfo