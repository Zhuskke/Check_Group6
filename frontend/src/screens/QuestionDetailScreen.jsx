import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  fetchQuestionDetail,
  deleteQuestion,
} from "../actions/questionActions";
import { fetchUser } from "../actions/userActions";
import { createComment } from "../actions/commentActions"; // Import the createComment action
import HeaderUser from "../components/HeaderUser";
import Footer from "../components/Footer";
import "../designs/QuestionDetail.css";

const QuestionDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(fetchQuestionDetail(id));
  }, [dispatch, id]);

  const questionDetails = useSelector((state) => state.questionDetail);
  const {
    loading: questionLoading,
    error: questionError,
    question,
  } = questionDetails;

  const userFetch = useSelector((state) => state.userFetch);
  const { loading: userLoading, error: userError, users } = userFetch;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [points_spent, setPointsSpent] = useState(0)

  const profPic = useSelector((state) => state.getProfileImage.profileImageUrl);
  const profilePic = useSelector((state) => state.questionDetail.question);
  console.log('profilepic', profilePic.user_profile_picture_url)

  useEffect(() => {
    if (question && question.user && !users[question.user]) {
      dispatch(fetchUser(question.user));
    }
  }, [dispatch, question, users]);

  const deleteHandler = (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      dispatch(deleteQuestion(questionId))
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting question:", error);
        });
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("question_id", question.id);
    formData.append("content", content);
    dispatch(createComment(formData, question.id)); // Pass question.id as the second argument
    setContent("");
  };

  if (questionLoading || userLoading) {
    return <Loader />;
  }

  if (questionError) {
    return <Message variant="danger">{questionError}</Message>;
  }

  if (!question || !question.id) {
    return <Message variant="danger">Question not found</Message>;
  }

  const username = users[question.user] || "";
  const showDeleteButton = userInfo && question.user === userInfo.id;

  return (
    <>
      <HeaderUser />
      <div id="questiondetailbg">
        <div id="questiondetail-container">
          {userInfo && userInfo.id === question.user ? (
            <Link to={`/profile`}>
              <div className="profile-picture-container">
                <label htmlFor="profile-image-input">
                  <img
                    src={

                     profPic || "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
                    }
                    alt="Profile"
                    className="questiondetail-profile-picture"
                  />
                </label>
                <div>
                  <p id="questiondetail-info">
                    <strong>Posted By:</strong> {username}
                  </p>
                </div>
              </div>
            </Link>
          ) : (
            <Link to={`/profile/${question.user}`}>
              <div className="profile-picture-container">
                <label htmlFor="profile-image-input">
                  <img
                    src={
                      profilePic.user_profile_picture_url ||
                      "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
                    }
                    alt="Profile"
                    className="questiondetail-profile-picture"
                  />
                </label>
                <div>
                  <p id="questiondetail-info">
                    <strong>Posted By:</strong> {username}
                  </p>
                </div>
              </div>
            </Link>
          )}
          {/* Moved the closing tag here */}
          <p id="questiondetail-info">
            <strong>Created At: </strong>
            {new Date(question.created_at).toLocaleString()}
          </p>
          <div className="line"></div>
          <h2>{question.title}</h2>
          <h3 id="questiondetail-content">
            <strong>
              <p>{question.content}</p>
            </strong>
          </h3>
          {question.attachment && (
            <div className="attachment-container">
              <img
                src={question.attachment}
                alt="Attachment"
                className="questiondetail-attachment"
              />
            </div>
          )}
          <p><strong>Points Spent:</strong> {question.points_spent}</p>

          <div className="line"></div>
          <form onSubmit={handleSubmitComment}>
            <input
              id="answer-area"
              placeholder="Answer Question?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></input>
            <button type="submit">Submit Comment</button>
          </form>
        </div>
      </div>
      {showDeleteButton && (
        <button onClick={() => deleteHandler(question.id)}>Delete</button>
      )}
      <Footer />
    </>
  );
};

export default QuestionDetail;