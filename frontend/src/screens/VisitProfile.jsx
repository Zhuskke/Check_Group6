import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import HeaderUser from "../components/HeaderUser";
import Footer from "../components/Footer";
import { Container  } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchUserQuestions } from "../actions/questionActions";
import { fetchUserProfile } from "../actions/userActions";
import "../designs/Profile.css";

const VisitProfile = () => {
  const defaultProfilePicture =
    "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg";
  const localStorageKey = "userProfilePicture";
  const localStorageDescriptionKey = "userDescription";

  const dispatch = useDispatch();
  const userQuestions = useSelector((state) => state.userQuestions);
  const { loading: questionsLoading, error: questionsError, userQuestions: questions } = userQuestions;
  
  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;
  
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchUserQuestions(id));
    dispatch(fetchUserProfile(id));
  }, [dispatch, id]);

  if (loading || questionsLoading) {
    return <p>Loading...</p>;
  }

  if (error || questionsError) {
    return <p>{error || questionsError}</p>;
  }

  return (
    <div>
      <HeaderUser />
      <Container className="container" id="profile-container">
        <div className="profile-picture-container">
          <label htmlFor="profile-image-input">
            <img
              src={user.profile_picture_url || defaultProfilePicture}
              alt="Profile"
              className="profile-picture"
            />
          </label>
          <p>Name: {user.username}</p>
          <p>Description: {user.description}</p>
        </div>
        <p>Questions:</p>
        {questions && questions.length > 0 ? (
          <ul>
            {questions.map((question) => (
              <li key={question.id}>
                <Link to={`/questions/${question.id}`}>{question.content}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions found.</p>
        )}
        <p>Answers:</p>
      </Container>
      <Footer />
    </div>
  );
}  

export default VisitProfile;
