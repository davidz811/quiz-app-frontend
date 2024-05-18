import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ConfirmQuiz = () => {
    const navigate = useNavigate();
    const { subject } = useParams();
    const { number } = useParams();

    function handlePrevious() {
        navigate(`/numberOfQuestions/${subject}`);
    }

    function handleNext() {
        navigate(`/questions/${subject}/${number}`);
    }

    return (
        <div className='max-w-[1150px] mx-auto'>
            <h1 className='text-2xl font-semibold py-10'>Welcome To Online Quiz</h1>
            <div class="bg-white p-6 rounded-lg shadow-md">
                <p class="text-2xl font-semibold mb-4">Confirmation</p>
                <p class="mb-2">Subject: <span class="font-semibold">{subject}</span></p>
                <p class="mb-2">Number of Questions: <span class="font-semibold">{number}</span></p>
                <div class="flex justify-between mt-6">
                    <button onClick={handlePrevious} class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 hover:text-gray-800 focus:outline-none focus:bg-gray-400 focus:text-gray-800">Previous</button>
                    <button onClick={handleNext} class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Next</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmQuiz