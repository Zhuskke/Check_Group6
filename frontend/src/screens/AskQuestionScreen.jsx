import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { askQuestion } from '../actions/questionActions';

const AskQuestionScreen = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const questionAsk = useSelector((state) => state.questionAsk);
    const { loading, error, success } = questionAsk;

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(askQuestion(title, content));
        setTitle('');
        setContent('');
    };

    return (
        <div>
            <h2>Ask a Question</h2>
            {error && <p>Error: {error}</p>}
            {success && <p>Question posted successfully!</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                <button type="submit" disabled={loading}>Post Question</button>
            </form>
        </div>
    );
};

export default AskQuestionScreen;
