import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../actions/userActions';

const QuestionItem = ({ question }) => {
    const dispatch = useDispatch();
    const userFetch = useSelector((state) => state.userFetch);
    const { loading, error, users } = userFetch;

    useEffect(() => {
        if (!users[question.user]) {
            dispatch(fetchUser(question.user));
        }
    }, [dispatch, question.user, users]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const username = users[question.user] || '';

    return (
        <div className='question-item' id='questionitem-container'>
            <Link to={`/questions/${question.id}`} className="question-link">
                {/* <h3>{question.title}</h3> */}
                <h3>{question.content}</h3>
                {question.attachment && ( // Render thumbnail if question has an attachment
                    <div className='thumbnail-container'>
                        <img src={question.attachment} alt='Thumbnail' className='thumbnail' />
                    </div>
                )}
                <p><strong>Posted By: </strong>{username}</p>
                <p><strong>Created At: </strong>{new Date(question.created_at).toLocaleString()}</p>
            </Link>
        </div>
    );
};

export default QuestionItem;
