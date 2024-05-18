import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import TakeQuiz from "./components/TakeQuiz";
import NumberOfQuestions from "./components/NumberOfQuestions";
import axios from 'axios'
import { useState, useEffect } from "react";
import ConfirmQuiz from "./components/ConfirmQuiz";
import Questions from "./components/Questions";
import Admin from "./components/Admin";
import CreateQuiz from "./components/CreateQuiz";
import FinalScore from "./components/FinalScore";

function App() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    async function fetchSubjects() {
      const fetchAllSubjects = await axios.get('http://localhost:8080/api/quiz/subjects');
      const subjectsData = fetchAllSubjects.data;
      setSubjects(subjectsData);
    }
    fetchSubjects();
  }, [])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/takequiz" element={<TakeQuiz subjects={subjects} />} />
        <Route path="/numberOfQuestions/:subject" element={<NumberOfQuestions />} />
        <Route path="/confirmquiz/:subject/:number" element={<ConfirmQuiz />} />
        <Route path="/questions/:subject/:number" element={<Questions />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/createquiz" element={<CreateQuiz subjects={subjects} />} />
        <Route path="/finalscore/:finalPercentage" element={<FinalScore />} />
      </Routes>
    </div>
  );
}

export default App;
