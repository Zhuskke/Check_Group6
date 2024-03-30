import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../designs/Questionbox.css';

function QuestionBox() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setShowWarning(true);
    } else {
      navigate('/register', { state: { question } });
    }
  };

  const handleChange = (e) => {
    setQuestion(e.target.value);
    setShowWarning(false);
  };

  return (
    <div>
      <form className="question-container" onSubmit={handleSubmit}>
        <textarea id='question-field' placeholder="Type your question here..." value={question} onChange={handleChange} />
        {showWarning && <p className="warning-message">Please type your question before submitting.</p>}
        <input id="submit-btn" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default QuestionBox;
