import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='max-w-[1150px] mx-auto flex justify-between items-center bg-slate-300 py-4 rounded-lg'>
            <div>
                <Link to={"/"} className='text-xl ml-3'>
                    Online Quiz App
                </Link>
                <Link to={"/admin"} className='px-8'>
                    Admin
                </Link>
                <Link to={"/takequiz"}>
                    Take Quiz
                </Link>
            </div>
        </div>

    )
}

export default Navbar