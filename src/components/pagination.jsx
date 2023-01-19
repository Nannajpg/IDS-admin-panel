import React from 'react'
import "@fontsource/inter"
import './styles/Pagination.css'

const OFFSET_HORIZONTAL_PAGES = 5;

const PaginationComponent = ({currentPage, totalPages, handleSetPage}) => {

    let pages = []

    for (let i = currentPage - OFFSET_HORIZONTAL_PAGES ; i <= currentPage + OFFSET_HORIZONTAL_PAGES; i++) {
        if (i <= totalPages && i > 0)
            pages.push(i)
    }

    console.log(currentPage, totalPages, handleSetPage )
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