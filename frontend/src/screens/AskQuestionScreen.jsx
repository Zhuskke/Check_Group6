import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { askQuestion } from "../actions/questionActions";
import HeaderQuestion from "../components/HeaderQuestion"

const AskQuestionScreen = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const questionAsk = useSelector((state) => state.questionAsk);
  const { loading, error, success } = questionAsk;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(askQuestion(title, content));
    setTitle("");
    setContent("");
  };

  return (
    <div>
    <HeaderQuestion/>
      {error && <p>Error: {error}</p>}
      {success && <p>Question posted successfully!</p>}
      <form className="question-container" onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="Type your question here..."
          id='question-field'
        />
        <input id="submit-btn" type="submit" disabled={loading} value="Submit" />
      </form>
    </div>
  );
};

export default AskQuestionScreen;

// <div>
// <form className="question-container" onSubmit={handleSubmit}>
//   <textarea value={content} onChange={(e) => setContent(e.target.value)} required placeholder="Type your question here..." />
//   <input type="submit" disabled={loading} value="Submit"/>
// </form>
// </div>
