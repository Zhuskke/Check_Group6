import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import '../designs/GuestQuestionbox.css'

function GuestQuestionBox() {
  return (
    <div id='guestquestion-container'>
          <input id='guestquestion-field' placeholder="What is your question?" />
          <FaSearch type="submit" id="guestsubmit-btn" role='button'/>
    </div>
  );
};

export default GuestQuestionBox;