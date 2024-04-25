import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function EditQuiz() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:8000/quizzes/${id}/`)
            .then(response => {
                setTitle(response.data.title);
            })
            .catch(error => {
                console.error('Error fetching quiz:', error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/quizzes/${id}/`, { title })
            .then(() => {
                history.push(`/quizzes/${id}`);
            })
            .catch(error => {
                console.error('Error updating quiz:', error);
            });
    };

    return (
        <div>
            <h1>Edit Quiz</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditQuiz;
