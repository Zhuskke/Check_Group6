import React, { useState } from 'react'

function QuestionBox() {
  return (
    <div>
        <form className="question-container">
          <textarea id='question-field' placeholder="Type your question here..." />
          <input id="submit-btn" type="submit" value="Submit"/>
        </form>
    </div>
  );
};

export default QuestionBox;