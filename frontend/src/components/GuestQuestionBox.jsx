import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import '../designs/GuestQuestionbox.css';

function GuestQuestionBox() {
  const [question, setQuestion] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setQuestion(event.target.value);
    if (showWarning) {
      setShowWarning(false);
    }
  };

  const handleClick = () => {
    if (question.trim() !== "") {
      navigate("/register", { state: { question } }); // Pass question content as state
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div id='guestquestion-container' style={{ position: 'relative' }}>
      <input 
        id='guestquestion-field' 
        placeholder="What is your question?" 
        value={question}
        onChange={handleChange}
      />
      {showWarning && 
        <p className="warning" style={{ position: 'absolute', top: '100%', left: 0 }}>
          Please enter a question before submitting.
        </p>
      }
      <FaSearch 
        id="guestsubmit-btn" 
        role='button' 
        onClick={handleClick} 
        className={question.trim() === "" ? "disabled" : ""}
      />
    </div>
  );
}

export default GuestQuestionBox;
