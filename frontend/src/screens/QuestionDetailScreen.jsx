import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchQuestionDetail } from '../actions/questionActions';

const QuestionDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestionDetail(id));
  }, [dispatch, id]);

  const questionDetails = useSelector((state) => state.questionDetail);
  const { loading, error, question } = questionDetails;

  // Retrieve user information from Redux store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <h2>{question.title}</h2>
          <p>{question.content}</p>
          <p><strong>Created At: </strong>{new Date(question.created_at).toLocaleString()}</p>
          {/* Display other details of the question */}
          {userInfo && (
            <p><strong>Posted By:</strong> {userInfo.username}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionDetail;
