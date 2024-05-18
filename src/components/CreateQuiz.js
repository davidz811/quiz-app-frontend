import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateQuiz = () => {
    const [isSingle, setIsSingle] = useState('');
    const [quizDetails, setQuizDetails] = useState({
        questionText: '',
        subject: '',
        questionType: '',
        choices: [],
        correctAnswers: []
    });

    async function handleSubmit(e) {
        e.preventDefault();

        if (!quizDetails.subject || !quizDetails.questionText || !quizDetails.questionType || quizDetails.choices.length === 0 || quizDetails.correctAnswers.length === 0) {
            toast.error('Error creating question');
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/quiz", quizDetails);
            if (response.status === 201) {
                toast.success("Question created successfully")
                const quizData = response.data;
                setQuizDetails({ // Resetting to an empty object
                    subject: '',
                    questionText: '',
                    questionType: '',
                    choices: [],
                    correctAnswers: []
                })
            } else {
                console.log("Quiz not created successfully");
            }
        } catch (error) {
            console.log("Error creating quiz", error);
        }
    }

    function handleInputChange(e) {
        e.preventDefault();

        const { name, value } = e.target;
        setQuizDetails(prevQuizDetails => ({
            ...prevQuizDetails,
            [name]: value
        }))

        { e.target.value === 'Single Choice' ? setIsSingle(true) : setIsSingle(false) }
    }

    function handleAddChoice() {
        // const nextLetter = String.fromCharCode(65 + quizDetails.choices.length);
        setQuizDetails(prevQuizDetails => ({
            ...prevQuizDetails,
            choices: [...prevQuizDetails.choices, '']
        }))
    }

    function handleRemove(indexToRemove) {
        setQuizDetails(prevQuizDetails => {
            const updatedChoices = [...prevQuizDetails.choices]
            updatedChoices.splice(indexToRemove, 1); // Remove the choice at the specified index
            return {
                ...prevQuizDetails,
                choices: updatedChoices
            };
        })
    }

    function handleRemoveCorrect(indexToRemove) {
        setQuizDetails(prevQuizDetails => {
            const updatedChoices = [...prevQuizDetails.correctAnswers]
            updatedChoices.splice(indexToRemove, 1); // Remove the choice at the specified index
            return {
                ...prevQuizDetails,
                correctAnswers: updatedChoices
            };
        })
    }

    function handleAddCorrectAnswer() {
        //const nextLetter = String.fromCharCode(65 + quizDetails.correctAnswers.length);
        setQuizDetails(prevQuizDetails => ({
            ...prevQuizDetails,
            correctAnswers: [...prevQuizDetails.correctAnswers, '']
        }));

    }

    console.log(quizDetails);

    return (
        <div className='max-w-[600px] mx-auto'>
            <p className='text-xl bg-slate-500 py-3 text-white font-bold mb-4'>Add New Questions</p>
            <div className='max-w-[400px] mx-auto'>
                <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
                    <label htmlFor="options" className='text-blue-300'>Select a Subject</label>
                    <input
                        type='text'
                        name='subject'
                        value={quizDetails.subject}
                        placeholder='Subject Name'
                        onChange={handleInputChange}
                        className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
                    />
                    <label className='text-blue-300'>Question</label>
                    <input
                        type='text'
                        name='questionText'
                        value={quizDetails.questionText}
                        placeholder='Question'
                        onChange={handleInputChange}
                        className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
                    />
                    <label className='text-blue-300'>Question Type</label>
                    <select name='questionType' onChange={handleInputChange} defaultValue="" className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'>
                        <option disabled value="">Choose a Type of Answer</option>
                        <option value='Single Choice'>Single Choice</option>
                        <option value='Multiple Choice'>Multiple choice</option>
                    </select>
                    <label className='text-blue-300'>Choices</label>
                    <div className='flex flex-col space-y-2'>
                        {quizDetails.choices.map((choice, index) => (
                            <div className='flex items-center mb-2'>
                                <input
                                    key={index}
                                    type='text'
                                    value={choice}
                                    onChange={e => {
                                        const newAnswers = [...quizDetails.choices];
                                        newAnswers[index] = e.target.value;
                                        setQuizDetails(prev => ({ ...prev, choices: newAnswers }));
                                    }}
                                    className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 flex-grow mr-2'
                                />
                                <button className='bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 focus:outline-none' onClick={() => handleRemove(index)}>Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddChoice} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none'>Add New Choice</button>
                    </div>
                    <label className='text-blue-300'>Correct Answer(s)</label>
                    {isSingle ? (
                        <input
                            type='text'
                            value={quizDetails.correctAnswers}
                            onChange={(e) => setQuizDetails(prev => ({ ...prev, correctAnswers: [e.target.value] }))}
                            className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 flex-grow mr-2'
                        />
                    ) : (
                        <div className="flex flex-col space-y-2">
                            {quizDetails.correctAnswers.map((answer, index) => (
                                <div className='flex items-center mb-2' key={index}>
                                    <input
                                        type='text'
                                        key={index}
                                        value={answer}
                                        onChange={e => {
                                            const newAnswers = [...quizDetails.correctAnswers];
                                            newAnswers[index] = e.target.value;
                                            setQuizDetails(prev => ({ ...prev, correctAnswers: newAnswers }));
                                        }}
                                        className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 flex-grow mr-2'
                                    />
                                    <button className='bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 focus:outline-none' onClick={() => handleRemoveCorrect(index)}>Remove</button>
                                </div>
                            ))}
                            <button type="button" onClick={handleAddCorrectAnswer} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none'>Add Correct Answer</button>
                        </div>
                    )}
                    <button type="submit" className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none'>Submit</button>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div >
    )
}

export default CreateQuiz;