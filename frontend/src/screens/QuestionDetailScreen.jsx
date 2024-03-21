import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchQuestionDetail, deleteQuestion  } from '../actions/questionActions';
import { fetchUser } from '../actions/userActions';
import HeaderUser from '../components/HeaderUser';
import Footer from '../components/Footer'
import '../designs/QuestionDetail.css'


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
<<<<<<< Updated upstream
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
=======
    <><HeaderUser/>
    <div id='questiondetailbg'>
    <div id='questiondetail-container'>
      <div className="profile-picture-container">

          <label htmlFor="profile-image-input">
            <img
              src={'https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg'}
              alt="Profile"
              className="questiondetail-profile-picture"
            />
          </label>

          <div>
          <p id='questiondetail-info'><strong>Posted By:</strong> {username}</p>
          <p id='questiondetail-info'><strong>Created At: </strong>{new Date(question.created_at).toLocaleString()}</p>
          </div>

      </div>
      <div className='line'></div>

      <h2>{question.title}</h2>
      <h3 id='questiondetail-content'><strong><p>{question.content}</p></strong></h3>
      {/* Display other details of the question */}
      <div className='line'></div>

      <div>
        <input id='answer-area' placeholder='Answer Question?'></input>
      </div>
    </div>
    </div>
>>>>>>> Stashed changes
    </>
  );
};

export default QuestionDetail;
