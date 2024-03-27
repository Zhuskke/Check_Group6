import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { askQuestion } from "../actions/questionActions";
import HeaderQuestion from "../components/HeaderQuestion";

const AskQuestionScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pointsSpent, setPointsSpent] = useState(10); // Default points spent

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const questionAsk = useSelector((state) => state.questionAsk);
  const { loading, error, success } = questionAsk;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(askQuestion(title, content, pointsSpent)); 
    setTitle("");
    setContent("");
  };

  // Redirect to home screen after successful question submission
  useEffect(() => {
    if (success) {
      navigate("/home"); // Redirect to home screen
      window.location.reload(); // Reload the window
    }
  }, [success, navigate]);

  return (
    <div>
      <HeaderQuestion />
      {error && <p>Error: {error}</p>}
      {success && <p>Question posted successfully!</p>}
      <form className="question-container" onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="Type your question here..."
          id="question-field"
        />
        <select value={pointsSpent} onChange={(e) => setPointsSpent(parseInt(e.target.value))}>
          <option value={10}>10 points</option>
          <option value={20}>20 points</option>
          <option value={30}>30 points</option>
          <option value={40}>40 points</option>
          <option value={50}>50 points</option>
        </select>
        <input id="submit-btn" type="submit" disabled={loading} value="Submit" />
      </form>
    </div>
  );
};

export default AskQuestionScreen;
