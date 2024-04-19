import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { askQuestion } from "../actions/questionActions";
import HeaderQuestion from "../components/HeaderQuestion";
import Footer from '../components/Footer';
import { BsFillSendCheckFill } from "react-icons/bs";
import { TbPhoto } from "react-icons/tb";
import '../designs/AskQuestion.css';

const AskQuestionScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [pointsSpent, setPointsSpent] = useState(10);
  const [attachment, setAttachment] = useState(null); // State for attachment

  const location = useLocation(); // Initialize useLocation hook
  const question = location.state ? location.state.question : ''; // Extract question from location state

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const questionAsk = useSelector((state) => state.questionAsk);
  const { loading, error, success } = questionAsk;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create FormData object
    const formData = new FormData();
    formData.append('content', content);
    formData.append('points_spent', pointsSpent);
    
    // Conditionally append attachment if it exists
    if (attachment) {
      formData.append('attachment', attachment);
    }
  
    // Dispatch askQuestion action with FormData
    dispatch(askQuestion(formData));
    
    // Reset form fields
    setContent("");
    setAttachment(null);
  };
  

  // Handle file input change
  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  useEffect(() => {
    // Set content to question when component mounts if question is provided
    if (question) {
      setContent(question);
    }
  }, [question]); // Run the effect whenever question changes

  useEffect(() => {
    if (success) {
      navigate("/home");
      window.location.reload();
    }
  }, [success, navigate]);

  return (
    <><HeaderQuestion />

      <section id="askquestionsection1">
      <strong><h1 className="title" id="askquestionslogan">You have the questions, We have the answers!</h1></strong>
      <strong><h3 className="title-2" id="askquestionslogan2">Welcome to Check!</h3></strong>
      </section>

    <section id="askquestionsection2">
      {error && <p>Error: {error}</p>}
      {success && <p>Question posted successfully!</p>}
      <div id="askquestion">
        <form className="question-container" onSubmit={handleSubmit}>
          {/* Display the received question in the textarea */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Type your question here..."
            id="question-field"
          />
          <select
            id="questionpoints"
            value={pointsSpent}
            onChange={(e) => setPointsSpent(parseInt(e.target.value))}
            className="custom-select"
          >
            <option id="pointsoption" value={10}>10 points</option>
            <option id="pointsoption" value={20}>20 points</option>
            <option id="pointsoption" value={30}>30 points</option>
            <option id="pointsoption" value={40}>40 points</option>
            <option id="pointsoption" value={50}>50 points</option>
          </select>
          {/* File input field for attachment */}
          <div>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <div id="questionbtn-container" onClick={() => document.getElementById('file-input').click()}>
            <TbPhoto id="askquestionbtn1" />
          </div>
          </div>

          <div className='askquestionline'></div>
          <div>

          <button id="submit-btn-container" type="submit" disabled={loading} value="Submit">
          <BsFillSendCheckFill id="askquestionbtn2" />
          </button>
          </div>
        </form>
      </div>

              <div id='askqimage1'>
              </div>

              <div id='askqimage2'>
              </div>

    </section>
    <Footer />
    </>
  );
};

export default AskQuestionScreen;