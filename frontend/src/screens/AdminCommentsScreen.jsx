import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listComments,
  updateComment,
  deleteComment,
  createComment,
  listUsers,
  listQuestions,
} from "../actions/adminActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import HeaderAdmin from "../components/HeaderAdmin";
import '../designs/Admincomment.css';

const AdminCommentsScreen = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editedComment, setEditedComment] = useState({
    id: "", // Add id field for the comment ID
    user: "",
    question: "",
    content: "",
  });

  const [showCreateModal, setShowCreateModal] = useState(false);

  const commentList = useSelector((state) => state.commentList);
  const { loading, error, comments } = commentList;

  const userList = useSelector((state) => state.userList);
  const { users = [] } = userList;

  const questionList = useSelector((state) => state.questionList);
  const { loading: questionLoading, questions: questionListData = [] } =
    questionList || {};

  useEffect(() => {
    dispatch(listComments());
    dispatch(listUsers());
    dispatch(listQuestions())
      .then((data) => {
        console.log("Fetched Questions:", data.questions); // Log fetched questions
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, [dispatch]);

  const [questions, setQuestions] = useState(questionListData);

  useEffect(() => {
    setQuestions(questionListData);
  }, [questionListData]);

  const handleCreateComment = () => {
    // Check if user, question, and content are not blank
    if (
      !editedComment.user ||
      !editedComment.question ||
      !editedComment.content.trim()
    ) {
      console.error("User, question, and content are required.");
      return;
    }

    // Prepare the payload with comment information
    const payload = {
      user: editedComment.user,
      question: editedComment.question,
      content: editedComment.content,
    };

    // Dispatch the createComment action with the payload
    dispatch(createComment(payload))
      .then(() => {
        setShowCreateModal(false); // Close the create comment modal
        dispatch(listComments()); // Refresh the comment list
      })
      .catch((error) => {
        console.error("Error creating comment:", error);
      });
  };

  const handleEditComment = (comment) => {
    setEditedComment({
      id: comment.id,
      user: String(comment.user),
      question: String(comment.question),
      content: comment.content,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditedComment({
      user: "",
      question: "",
      content: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the target name is "user" or "question", convert the value to number
    const updatedValue =
      name === "user" || name === "question" ? parseInt(value) : value;

    setEditedComment((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };

  const resetNewCommentState = () => {
    setEditedComment({
      id: "", // Add id field for the comment ID
      user: "",
      question: "",
      content: "",
    });
  };

  const handleUpdateComment = () => {
    // Check if user, question, content, and id are not blank
    if (
      !String(editedComment.user).trim() ||
      !String(editedComment.question).trim() ||
      !editedComment.content.trim() ||
      !editedComment.id // Ensure comment ID is present
    ) {
      console.error("User, question, content, and ID are required.");
      return;
    }

    // Prepare the payload with updated comment information
    const payload = {
      user: editedComment.user,
      question: editedComment.question,
      content: editedComment.content.trim(),
    };

    // Dispatch the updateComment action with the updated payload
    dispatch(updateComment(editedComment.id, payload)) // Pass comment ID here
      .then(() => {
        setShowModal(false);
        dispatch(listComments());
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
      });
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      dispatch(deleteComment(commentId))
        .then(() => {
          dispatch(listComments());
        })
        .catch((error) => {
          console.error("Error deleting comment:", error);
        });
    }
  };

  return (
    <>
    <HeaderAdmin />
    <div className="admin-comments-container">
      <h1 id="adminctitle">Comments</h1>
      <div className="comment-list">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <ul>
            <Button
              variant="primary"
              onClick={() => {
                resetNewCommentState();
                setShowCreateModal(true);
              }}
              id="admincbtn"
            >
              Add Comment
            </Button>

            {comments.map((comment) => (
              <div className="comment-container">
              <li key={comment.id} className="comment-item">
                <div className="comment-info">
                  {/* Display the question content */}
                  <span>
                    Question:{" "}
                    {questions.find((q) => q.id === comment.question)?.content}
                  </span>{" "}
                  - {/* Display the comment content */}
                  <span>Comment: {comment.content}</span>
                </div>
                <div className="comment-actions">
                  <button onClick={() => handleEditComment(comment)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteComment(comment.id)}>
                    Delete
                  </button>
                </div>
              </li>
              </div>
            ))}
          </ul>
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUser">
              <Form.Label>User</Form.Label>
              <Form.Control
                as="select"
                value={editedComment.user}
                onChange={handleChange}
                name="user"
              >
                <option value="">Select user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formQuestion">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="select"
                value={editedComment.question}
                onChange={handleChange}
                name="question"
              >
                <option value="">Select question</option>
                {questions &&
                  questions.map((question) => (
                    <option key={question.id} value={question.id}>
                      {question.content}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter content"
                name="content"
                value={editedComment.content}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateComment}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUser">
              <Form.Label>User</Form.Label>
              <Form.Control
                as="select"
                value={editedComment.user}
                onChange={handleChange}
                name="user"
              >
                <option value="">Select user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formQuestion">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="select"
                value={editedComment.question}
                onChange={handleChange}
                name="question"
              >
                <option value="">Select question</option>
                {questions &&
                  questions.map((question) => (
                    <option key={question.id} value={question.id}>
                      {question.content}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter content"
                name="content"
                value={editedComment.content}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateComment}>
            Create Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default AdminCommentsScreen;
