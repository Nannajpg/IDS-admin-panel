import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPage } from '../../features/stickers/stickerSlice'

import './Pagination.css'

const Pagination = ({ postsPerPage }) => {
    
    const totalPosts = useSelector(state => state.stickers.amount)
    const currentPage = (useSelector(state => state.stickers.page)+1)
    const totalPages = useSelector(state => state.stickers.totalPages)
    const dispatch = useDispatch()

    console.log(totalPages)
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
                            dispatch(setPage(page-1))
                        }}
                        className={page == currentPage ? 'active' : ''}
                    >
                        {page}</button>
                })
            }
        </div>
    )
}

export default Pagination
