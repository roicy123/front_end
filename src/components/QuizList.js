import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function QuizList() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = () => {
        axios.get('http://localhost:8000/quizzes/')
            .then(response => {
                setQuizzes(response.data);
            })
            .catch(error => {
                console.error('Error fetching quizzes:', error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/quizzes/${id}/`)
            .then(() => {
                fetchQuizzes();
            })
            .catch(error => {
                console.error('Error deleting quiz:', error);
            });
    };

    return (
        <div>
            <h1>Quiz List</h1>
            <ul>
                {quizzes.map(quiz => (
                    <li key={quiz.id}>
                        <Link to={`/quizzes/${quiz.id}`}>{quiz.title}</Link>
                        <button onClick={() => handleDelete(quiz.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <Link to="/add-quiz">Add Quiz</Link>
        </div>
    );
}

export default QuizList;
