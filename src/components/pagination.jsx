import React from 'react'
import './styles/Pagination.css'

const PaginationComponent = ({currentPage, totalPages, handleSetPage}) => {

    let pages = []

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

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