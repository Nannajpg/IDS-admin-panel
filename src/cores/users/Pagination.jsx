import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPage } from '../../features/users/userSlice'

import './Pagination.css'

const Pagination = ({ postsPerPage }) => {
    
    const totalPosts = useSelector(state => state.users.amount)
    const currentPage = (useSelector(state => state.users.page)+1)
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
