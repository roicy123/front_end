import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quiz.css';  // Import the CSS file

function Quiz() {
    const [quizzes, setQuizzes] = useState([]);
    const [answers, setAnswers] = useState({});
    

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/quizzes/')
            .then(response => {
                setQuizzes(response.data.results);
            })
            .catch(error => {
                console.error('Error fetching quiz data:', error);
            });
    }, []);

    const handleAnswerChange = (questionId, answerId) => {
        setAnswers({
            ...answers,
            [questionId]: answerId,
        });
    };

    const handleSubmit = (quizId) => {
        let correctAnswers = 0;
        const quiz = quizzes.find(quiz => quiz.id === quizId);
        quiz.questions.forEach(question => {
            const selectedAnswer = question.answers.find(answer => answers[question.id] === answer.id);
            if (selectedAnswer && selectedAnswer.is_correct) {
                correctAnswers++;
            }
        });

        const score = (correctAnswers / quiz.questions.length) * 100;
        alert(`Quiz submitted successfully. Your score is ${score}%.`);
    };

    

    if (!quizzes.length) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {quizzes.map((quiz) => (
                <div key={quiz.id} className="quiz-container">
                    <h1 className="quiz-title">{quiz.title}</h1>
                    {quiz.questions.map(question => (
                        <div key={question.id} className="question-container">
                            <h2 className="question-content">{question.content}</h2>
                            {question.answers.map(answer => (
                                <div key={answer.id} className="answer-container">
                                    <label className="answer-label">
                                        <input
                                            type="radio"
                                            name={question.id}
                                            value={answer.id}
                                            checked={answers[question.id] === answer.id}
                                            onChange={() => handleAnswerChange(question.id, answer.id)}
                                        />
                                        {answer.content}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button className="submit-button" onClick={() => handleSubmit(quiz.id)}>Submit Quiz</button>
                </div>
            ))}
        </div>
    );
}

export default Quiz; 