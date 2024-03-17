import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchQuestionDetail } from '../actions/questionActions';
import { fetchUser } from '../actions/userActions';
import HeaderUser from '../components/HeaderUser';

const QuestionDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

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
    <><HeaderUser/>
    <div>
      <h2>{question.title}</h2>
      <p>{question.content}</p>
      <p><strong>Created At: </strong>{new Date(question.created_at).toLocaleString()}</p>
      {/* Display other details of the question */}
      <p><strong>Posted By:</strong> {username}</p>
    </div>
    </>
  );
};

export default QuestionDetail;
