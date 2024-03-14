// HomeScreenUser.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import QuestionItem from '../components/QuestionItem';
import SubjectBar from '../components/SubjectBar';
import HeaderUser from '../components/HeaderUser';
import Footer from '../components/Footer';
import { listQuestions } from '../actions/questionActions';

function HomeScreenUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listQuestions());
  }, [dispatch]);

  const questionList = useSelector((state) => state.questionList);
  const { loading, error, questions } = questionList;

  return (
    <>
      <HeaderUser />
      <div className='container'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <div id='question-list'>
            {questions.map((question) => (
              <QuestionItem key={question.id} question={question} />
            ))}
          </div>
        )}
        <SubjectBar />
      </div>
      <Footer />
    </>
  );
}

export default HomeScreenUser;
