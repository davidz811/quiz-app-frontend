import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const TakeQuiz = ({ subjects }) => {
    console.log(subjects);
    const [selectedSubject, setSelectedSubject] = useState('defaultSubject');
    const naviagte = useNavigate();

    // console.log(subjects);

    const handleSubjectChange = (e) => {
        //console.log(e.target.value);
        setSelectedSubject(e.target.value);
    }

    function handleNextClick() {
        if (selectedSubject !== 'defaultSubject') {
            naviagte(`/numberOfQuestions/${selectedSubject}`)
        }
    }

    return (
        <div className='max-w-[1150px] mx-auto'>
            <h1 className='text-2xl font-semibold py-10'>Welcome To Online Quiz</h1>
            <h1 className='text-xl font-serif text-blue-400'>I want to take quiz on :</h1>
            <div className='flex flex-col'>
                <select className='border rounded-md p-2 my-8' value={selectedSubject} onChange={handleSubjectChange}>
                    <option value="defaultSubject" disabled>Select a subject</option>
                    {
                        subjects.map((subject, index) => (
                            <option key={index} value={subject}>
                                {subject}
                            </option>
                        ))
                    }
                </select>
                <button onClick={handleNextClick} className={`w-24 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${selectedSubject === 'defaultSubject' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={selectedSubject === 'defaultSubject'}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default TakeQuiz