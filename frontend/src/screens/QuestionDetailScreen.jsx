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
import { createComment, getCommentsForQuestion, createCommentVote } from "../actions/commentActions"; 
import HeaderUser from "../components/HeaderUser";
import Footer from "../components/Footer";
import FooterProfile from "../components/FooterProfile";
import { AiOutlineSend } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../designs/QuestionDetail.css";
import { BiUpvote, BiDownvote } from "react-icons/bi";

const QuestionDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [showAnswerArea, setShowAnswerArea] = useState(false);
  const { comments } = useSelector((state) => state.getComments);

  useEffect(() => {
    dispatch(getCommentsForQuestion(id));
    dispatch(fetchQuestionDetail(id));
  }, [dispatch, id]);

  const toggleAnswerArea = () => {
    setShowAnswerArea(!showAnswerArea);
  };

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

  const handleVote = async (commentId, voteType) => {
    // Check if the user has already voted on this comment
  
      // Otherwise, dispatch the createCommentVote action with the new voteType
      dispatch(createCommentVote(userInfo.id, commentId, voteType))
        .then(() => {
          // After voting, fetch updated vote counts
          
          window.location.reload(); // Consider refactoring this to avoid full page reload
        })
        .catch((error) => {
          console.error("Error voting:", error);
        });
    
  };

 const handleSubmitComment = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("question_id", question.id);
    formData.append("content", content);
    dispatch(createComment(formData, question.id));
    window.location.reload(); 
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
            <Link id="detaillink" to={`/profile`}>
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
                <div className="profile-info">
                  <p id="posted-by">
                  {username}
                  </p>
                  <p id="created-at">
                {new Date(question.created_at).toLocaleString()}
                </p>
                </div>
              </div>
            </Link>
          ) : (
            <Link id="detaillink" to={`/profile/${question.user}`}>
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
                <div className="profile-info">
                  <p id="posted-by">
                    {username}
                  </p>
                  <p id="created-at">
                {new Date(question.created_at).toLocaleString()}
              </p>
              
                </div>
              </div>
            </Link>
          )}
          {/* Moved the closing tag here */}
          {/* <div className="detailline"></div> */}
          <h2>{question.title}</h2>
          <h3 id="questiondetail-content">
            <strong>
              <p id="questiontext">{question.content}</p>
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
          <button id="toggleanswer" onClick={toggleAnswerArea}>Add answer to get + {question.points_spent} points</button>
          {showAnswerArea && (
              <form
                className={`answer-area-form ${
                  showAnswerArea ? "show" : ""
                }`}
                onSubmit={handleSubmitComment}
              >
          <div className="detailline"></div>
                <input
                  id="answer-area"
                  placeholder="Answer Question?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  autoComplete='off'
                ></input>
                <button id="submitanswerbtn" type="submit"><AiOutlineSend id="submitanswericon"/></button>
              </form>
            )}
            <div>
            <h3 id="questiondetailcomment">Answers: </h3>
            {comments.map((comment) => (

              <div key={comment.id} className="comment">
                
                <div className="vote-counts">
                  <p>{comment.upvotes}</p>
                  <p>{comment.downvotes}</p> 
                </div>
                
                <div className="comment-actions">
                  <button id="upvote" onClick={() => handleVote(comment.id, "upvote")}>
                    <BiUpvote id="upvoteicon"/>
                  </button>
                  <button id="downvote" onClick={() => handleVote(comment.id, "downvote")}>
                    <BiDownvote id="downvoteicon"/>
                  </button>
                </div>

                <div className="comment-main-content">
                  <p id="maincomment">{comment.content}</p>
                  <p id="commentinfo">Answered by:<Link to={`/comments/${comment.user_id}`}>{comment.user}</Link></p>
                  <p id="commentinfo">Total Votes: {comment.total_votes}</p>
                  {/* <p >Posted At: {new Date(comment.created_at).toLocaleString()}</p> */}
                </div>

                {/* Display vote counts */}
                {/* <div className="vote-counts">
                  <p>{comment.upvotes}</p>
                  <p>{comment.downvotes}</p> 
                </div> */}
              </div>
            ))}
          </div>
          
            {showDeleteButton && (
            <button id="deletebtn" onClick={() => deleteHandler(question.id)}><RiDeleteBin6Line id="deleteicon"/></button>
            )}

        </div>
      </div>
      <FooterProfile />
    </>
  );
};

export default QuestionDetail;