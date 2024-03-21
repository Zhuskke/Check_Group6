import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchQuestionDetail, deleteQuestion  } from '../actions/questionActions';
import { fetchUser } from '../actions/userActions';
import HeaderUser from '../components/HeaderUser';


const QuestionDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchQuestionDetail(id));
  }, [dispatch, id]);

  const questionDetails = useSelector((state) => state.questionDetail);
  const { loading: questionLoading, error: questionError, question } = questionDetails;

  // Retrieve user information from Redux store
  const userFetch = useSelector((state) => state.userFetch);
  const { loading: userLoading, error: userError, users } = userFetch;

  useEffect(() => {
    // Check if question is loaded and user data is not already fetched
    if (question && question.user && !users[question.user]) {
      console.log('Dispatching fetchUser with user ID:', question.user);
      dispatch(fetchUser(question.user));
    }
  }, [dispatch, question, users]);

  const deleteHandler = (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      dispatch(deleteQuestion(questionId))
        .then(() => {
          navigate('/'); // Redirect to home page after successful deletion
        })
        .catch((error) => {
          // Handle error if deletion fails
          console.error('Error deleting question:', error);
          // Optionally, display a message to the user about the error
          // For example: dispatch({ type: 'SHOW_DELETE_ERROR_MESSAGE', payload: error.message });
        });
    }
  };

  if (questionLoading || userLoading) {
    return <Loader />;
  }

  if (questionError) {
    return <Message variant='danger'>{questionError}</Message>;
  }

  // Handle 404 error
  if (!question || !question.id) {
    return <Message variant='danger'>Question not found</Message>;
  }

  const username = users[question.user] || '';

  return (
    <>
      <HeaderUser />
      <div>
        <h2>{question.title}</h2>
        <p>{question.content}</p>
        <p><strong>Created At: </strong>{new Date(question.created_at).toLocaleString()}</p>
        {/* Display other details of the question */}
        <p><strong>Posted By:</strong> {username}</p>
        {/* Show delete button only if the logged-in user is the author */}
       <button onClick={() => deleteHandler(question.id)}>Delete</button>
      </div>
    </>
  );
};

export default QuestionDetail;
