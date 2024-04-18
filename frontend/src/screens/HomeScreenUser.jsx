import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import QuestionItem from '../components/QuestionItem';
import SubjectBar from '../components/SubjectBar';
import HeaderUser from '../components/HeaderUser';
import Footer from '../components/Footer';
import { listQuestions } from '../actions/questionActions';
import { fetchUser } from '../actions/userActions';
import '../designs/HomescreenUser.css';
import { Link } from 'react-router-dom';

function HomeScreenUser() {
  const dispatch = useDispatch();
  const [displayedQuestions, setDisplayedQuestions] = useState(5);

  useEffect(() => {
    dispatch(listQuestions());
  }, [dispatch]);

  const userFetch = useSelector((state) => state.userFetch);
  const { users } = userFetch;

  const questionList = useSelector((state) => state.questionList);
  const { loading, error, questions } = questionList;

  useEffect(() => {
    // Fetch user for each question
    questions.slice(0, displayedQuestions).forEach((question) => {
      if (!users[question.user]) {
        dispatch(fetchUser(question.user));
      }
    });
  }, [dispatch, displayedQuestions, questions, users]);

  const handleSeeMore = () => {
    setDisplayedQuestions((prevCount) => prevCount + 5);
  };

  return (
    <>
      <HeaderUser />
      <div id='homeusersection'>
        <h1 id='homeusertitle'>Latest Questions</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <div id='question-list'>
            {/* Reverse the questions array and map through it */}
            {[...questions].reverse().map((question, index) => (
              // Wrap each question item with a div container
              index < displayedQuestions && (
                <div key={question.id} className='questionlist-container'>
                  <Link to={`/questions/${question.id}`} className="question-link">
                  {/* <h3>{question.content}</h3> */}
                  <div className='d-flex'>
                  {question.attachment && ( // Render thumbnail if question has an attachment
                    <div className='thumbnail-container'>
                      <img src={question.attachment} alt='Thumbnail' className='thumbnail' />
                    </div>
                  )}
                  <div>
                  <h3 id='hsq'>{question.content}</h3> 
                  </div>
                  </div>
                  <p id='hsuserinfo'>
                    <strong>Posted By: </strong>
                    {users[question.user] || ''}
                  </p>  
                  <p id='hsuserinfo'>
                    {new Date(question.created_at).toLocaleString()}
                  </p>
                  </Link>
                </div>
              )
            ))}
          </div>
        )}
        {questions.length > displayedQuestions && (
          <div className="center">
          <button id='loadmorebtn' onClick={handleSeeMore}>
            Load More
          </button>
          </div>
        )}
        <SubjectBar />
      </div>
      <Footer />
    </>
  );
}

export default HomeScreenUser;
