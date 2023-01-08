import React from 'react'

function LocationInfo({name, type, dimension, residents}) {
  return (
    <div>
        <div className="location">
            <div className="location__info">
            <div className='location__name'>
                <h5>Name: </h5>
                <p>{name} </p>
              </div>
              <div className='location__type'>
                <h5>Type: </h5>
                <p>{type} </p>
              </div>
              <div>
                <h5>Dimension:</h5>
                <p>{dimension}</p>
              </div>
              <div className='population'>
                <h5>Population:</h5>
                {/* <p>{residents?.length}</p> */}
                <p>{residents}</p>

              </div>
            </div>
          </div>
    </div>
  )
}

export default LocationInfo