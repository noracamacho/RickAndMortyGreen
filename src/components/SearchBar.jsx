import React, { useState, useEffect } from 'react'
import './searchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';


function SearchBar({placeHolder, data}) {
//   const [locationName, setLocationName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [enteredWord, setEnteredWord] = useState('');

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setEnteredWord(searchWord);
    const newFilter = data.filter((value) => {
        return value.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === '') {
        setFilteredData([]);
    } else {
        setFilteredData(newFilter)
    }
  }

  const clearInput = () => {
    setFilteredData([]);
    setEnteredWord('');
  }

  return (
    <div className='search__container'>
        <div className="searchInputs">
            <input type="text" placeholder={placeHolder} value={enteredWord} onChange={handleFilter}/>
            <div className="searchIcon">
                {filteredData.length == 0 ? <SearchIcon /> : <CloseIcon id='clearBtn' onClick={clearInput}/>}
            </div>
        </div>
        { filteredData.length != 0 && (
        <div className="dataResults">
            {filteredData.map((value, key) => {
                return ( <a className='dataItem'>
                    <p>{value}</p>
                    </a>
                )
            })}
            {/* {console.log(locationName)} */}
        </div>
        )}

    </div>
  )
}

export default SearchBar