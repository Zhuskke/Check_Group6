import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import HeaderUser from "../components/HeaderUser";
import Footer from "../components/Footer";
import FooterProfile from "../components/FooterProfile";
import { Container  } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchUserQuestions } from "../actions/questionActions";
import { fetchUserProfile } from "../actions/userActions";
import "../designs/Profile.css";
import { updatePoints } from "../actions/commentActions";


const CommentProfile = () => {
  const defaultProfilePicture =
    "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg";
  const localStorageKey = "userProfilePicture";
  const localStorageDescriptionKey = "userDescription";

  const dispatch = useDispatch();
  const userQuestions = useSelector((state) => state.userQuestions);
  const { loading: questionsLoading, error: questionsError, userQuestions: questions } = userQuestions;
  
  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;

  const { comments, message } = useSelector((state) => state.updatePoints);
  
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchUserQuestions(id));
    dispatch(fetchUserProfile(id));
    dispatch(updatePoints(id));
  }, [dispatch, id]);

  if (loading || questionsLoading) {
    return <p>Loading...</p>;
  }

  if (error || questionsError) {
    return <p>{error || questionsError}</p>;
  }

  return (
    <>
    <HeaderUser />
    <div id="profilesection">

      <div id='profileimg'>
      </div>

      <div id='profileimg2'>
      </div>

        <div className="profile-picture-container">
          <label htmlFor="profile-image-input">
            <img
              src={user.profile_picture_url || defaultProfilePicture}
              alt="Profile"
              className="visit-profile-picture"
            />
          </label>
          </div>

        <div id="profile-container">
          <div>
            <p id="profileuser">{user.username}</p>
            <p id="profiledescription">Bio: {user.description}</p>
          </div>  

        <div id="profile-questions-answers-container">
          <div className="profile-section">
            <p id="profileq">Questions:</p>
            {questions && questions.length > 0 ? (
              <ul>
                {questions.map((question) => (
                  <li key={question.id} id="profile-question-item">
                    <Link to={`/questions/${question.id}`}>{question.content}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No questions found.</p>
            )}
          </div>

          <div className="divider"></div>

            <div className="profile-section">
              <p id="profilea">Answers: </p>
              {comments && comments.length > 0 ? (
                <ul>
                  {comments.map((comment) => (
                    <li key={comment.id} id="profile-question-item">
                      {comment.content} - Upvotes: {comment.upvotes} - Downvotes: {comment.downvotes}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No comments found.</p>
              )}
            </div>
            
        </div>
      </div>
    </div>
    <FooterProfile />
    </>
  );
}  

export default CommentProfile;