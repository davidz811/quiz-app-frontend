import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Questions = () => {
    const navigate = useNavigate();
    const { subject } = useParams();
    const { number } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [isCorrect, setIsCorrect] = useState([]);
    const [finalResult, setFinalResult] = useState('')

    useEffect(() => {
        const updatedIsCorrect = userAnswers.map((answer, index) => {
            return answer && correctAnswers[index] && JSON.stringify(answer.sort()) === JSON.stringify(correctAnswers[index].sort());
        });
        setIsCorrect(updatedIsCorrect);
    }, [userAnswers, correctAnswers]);

    // console.log(subject);
    // console.log(number);
    // console.log(isCorrect);
    function calculateFinalScore() {
        const unansweredQuestions = userAnswers.filter(answer => !answer || answer.length === 0);
        if (unansweredQuestions.length > 0) {
            toast.error('Please complete all questions to finish the quiz');
            return;
        }

        //returns new array where function returns true (creates new array with true values)
        const countCorrectAnswers = isCorrect.filter(isCorrect => isCorrect).length;
        const totalQuestions = questions.length;
        const percentage = (countCorrectAnswers / totalQuestions) * 100;
        const finalPercentage = percentage.toFixed(2);
        setFinalResult(finalPercentage)
        navigate(`/finalscore/${finalPercentage}`);
    }

    // console.log(finalResult);

    function handleNextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setUserAnswers(prevAnswers => {
                const updatedAnswers = [...prevAnswers];
                updatedAnswers[currentQuestionIndex] = userAnswers[currentQuestionIndex];
                return updatedAnswers;
            });
        }
    }

    function handlePreviousQuestion() {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setUserAnswers(prevAnswers => {
                const updatedAnswers = [...prevAnswers];
                updatedAnswers[currentQuestionIndex] = userAnswers[currentQuestionIndex];
                return updatedAnswers;
            });
        }
    }

    function handleCheckboxChange(e, choice) {
        const isChecked = e.target.checked;
        setUserAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            const currentAnswers = updatedAnswers[currentQuestionIndex];
            if (!currentAnswers) {
                updatedAnswers[currentQuestionIndex] = [];
            }
            const newAnswers = updatedAnswers[currentQuestionIndex];
            if (isChecked) {
                newAnswers.push(choice);
            } else {
                const indexToRemove = newAnswers.indexOf(choice);
                if (indexToRemove !== -1) {
                    newAnswers.splice(indexToRemove, 1);
                }
            }
            return updatedAnswers;
        });
    }

    useEffect(() => {
        async function fetchQuestionsBySubjectNumberOfQuestions() {
            try {
                if (number && !isNaN(number)) {
                    const response = await axios.get(`http://localhost:8080/api/quiz/questions/subject`, {
                        params: {
                            numberOfQuestions: number,
                            subject: subject
                        }
                    });
                    setQuestions(response.data);
                    setUserAnswers(Array(1).fill(null));

                    const correctAnswersData = response.data.map(question => question.correctAnswers);
                    setCorrectAnswers(correctAnswersData);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchQuestionsBySubjectNumberOfQuestions();
    }, [subject, number]);

    // console.log(questions)
    // console.log(userAnswers);
    // console.log(correctAnswers);
    // console.log(questions);

    const choicesLabels = ['A', 'B', 'C', 'D'];

    return (
        <div className='max-w-[1150px] mx-auto'>
            {questions.length > 0 && (
                <div className="bg-white shadow-md rounded-md p-6">
                    <p className="text-xl font-semibold">Question: {currentQuestionIndex + 1}</p>
                    <p className="mt-2 mb-4">{questions[currentQuestionIndex].questionText}</p>
                    <ul className="space-y-2">
                        {questions[currentQuestionIndex].choices.map((choice, index) => (
                            <li key={index} className="flex items-center">
                                <input
                                    type='checkbox'
                                    className="mr-2"
                                    checked={Array.isArray(userAnswers[currentQuestionIndex]) && userAnswers[currentQuestionIndex].includes(choice)}
                                    onChange={(e) => handleCheckboxChange(e, choice)}
                                />
                                <span className="font-semibold">{choicesLabels[index]}. </span>
                                <span>{choice}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handlePreviousQuestion}
                            disabled={currentQuestionIndex === 0}
                            className={`px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300 ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Previous
                        </button>
                        {currentQuestionIndex === questions.length - 1 ? (
                            <div className='flex justify-center'>
                                <button type='submit' onClick={calculateFinalScore} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                                    Submit Quiz
                                </button>
                            </div>
                        ) : (<button
                            onClick={handleNextQuestion}
                            disabled={currentQuestionIndex === questions.length - 1}
                            className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${currentQuestionIndex === questions.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            Next
                        </button>)}

                    </div>
                </div>
            )}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    )
}

export default Questions