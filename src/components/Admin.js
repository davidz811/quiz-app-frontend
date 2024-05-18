import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
    return (
        <div className='max-w-[1150px] mx-auto'>
            <h1 className='text-4xl font-semibold py-4 my-6 border-b-2 border-gray-300'>Welcome to Admin Home Page</h1>
            <Link to="/createquiz">
                <p className='text-blue-400 text-lg border-b-2 w-44 border-gray-300 my-7 pb-2'>Create a New Quiz</p>
            </Link>
        </div>
    )
}

export default Admin