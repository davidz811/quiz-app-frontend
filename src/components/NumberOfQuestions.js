import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const NumberOfQuestions = () => {
    const [number, setNumber] = useState('');
    const { subject } = useParams();
    const navigate = useNavigate();


    // console.log(questions);
    // console.log(number);

    function handlePrevious() {
        navigate("/takequiz");
    }

    function handleNext() {
        navigate(`/confirmquiz/${subject}/${number}`)
    }

    return (
        <div className='max-w-[1150px] mx-auto'>
            <div>
                <h1 className='text-2xl font-semibold py-10'>Welcome To Online Quiz</h1>
                <p>How many questions would you like to attempt ?</p>
                <input
                    type='number'
                    placeholder='Number of questions'
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className='border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500'
                />
                <div className='flex justify-between mt-4'>
                    <button onClick={handlePrevious} className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded'>
                        Previous
                    </button>
                    <button onClick={handleNext} className={`w-24 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${number === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={number === ''}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NumberOfQuestions;