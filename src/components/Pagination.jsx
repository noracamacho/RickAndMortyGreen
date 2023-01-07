import React from 'react'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li className='page__item' key={number}>
            <a onClick={() => paginate(number)} href="!#" className='page__link'>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination