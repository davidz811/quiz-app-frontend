import React from 'react'
import { useParams } from 'react-router-dom'

const FinalScore = () => {
    const { finalPercentage } = useParams();
    console.log(finalPercentage);

    return (
        <div className='max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md my-10 h-96'>
            <div className='flex flex-col items-center justify-center h-full'>
                <h1 className='text-3xl font-semibold mb-4'>Your Quiz Results</h1>
                <p className="text-lg mb-2">Congratulations on completing the quiz!</p>
                <p className="text-lg">Your total score for this quiz is: <span className="font-bold">{finalPercentage}%</span></p>
            </div>
        </div>
    )
}

export default FinalScore