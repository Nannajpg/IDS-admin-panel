import React from 'react'
import { useDispatch } from 'react-redux'

import './styles/Pagination.css'

const PaginationComponent = ({currentPage, totalPages, handleSetPage}) => {
    const dispatch = useDispatch()

    let pages = []

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }


    console.log(currentPage);
    console.log(totalPages);
    

    return (
        <div className='pagination'>
            {
                pages.map((page, index) => {
                    return <button
                        key={index}
                        onClick={() => {
                            handleSetPage(page)
                        }}
                        className={page === currentPage ? 'active' : ''}
                    >
                        {page}</button>
                })
            }
        </div>
    )
}

export default PaginationComponent