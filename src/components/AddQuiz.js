import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function AddQuiz() {
    const [title, setTitle] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/quizzes/', { title })
            .then(() => {
                history.push('/');
            })
            .catch(error => {
                console.error('Error adding quiz:', error);
            });
    };

    return (
        <div>
            <h1>Add Quiz</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button type="submit">Add Quiz</button>
            </form>
        </div>
    );
}

export default AddQuiz;
