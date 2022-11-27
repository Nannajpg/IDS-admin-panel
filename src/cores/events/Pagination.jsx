import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPage } from '../../features/events/eventSlice'

import './Pagination.css'

const Pagination = ({ postsPerPage }) => {
    
    const totalPosts = useSelector(state => state.events.amount)
    const currentPage = (useSelector(state => state.events.page)+1)
    const dispatch = useDispatch()

    let pages = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
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
