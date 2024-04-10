import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listQuestions,
  updateQuestion,
  deleteQuestion,
} from "../actions/adminActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import HeaderAdmin from "../components/HeaderAdmin";

const AdminQuestionsScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listQuestions());
  }, [dispatch]);

  const questionList = useSelector((state) => state.questionList);
  const { loading, error, questions } = questionList;

  const [editedQuestion, setEditedQuestion] = useState({
    content: "",
    image: null,
    points_spent: 0,
  });
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleUpdateQuestion = () => {
    const formData = new FormData();
    formData.append("content", editedQuestion.content);
    formData.append("points_spent", editedQuestion.points_spent);
    if (editedQuestion.image) {
      formData.append("image", editedQuestion.image);
    }

    dispatch(updateQuestion(selectedQuestionId, formData));
    setShowModal(false);
  };

  const handleDeleteQuestion = (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      dispatch(deleteQuestion(questionId));
    }
  };

  return (
    <div className="admin-questions-container">
      <HeaderAdmin />
      <h1>Questions</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              {question.content}
              <Button
                variant="info"
                onClick={() => {
                  setSelectedQuestionId(question.id);
                  setEditedQuestion({
                    content: question.content,
                    image: null,
                    points_spent: question.points_spent,
                  });
                  setShowModal(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                Delete
              </Button>
              {selectedQuestionId === question.id && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Question</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="formContent">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter content"
                          value={editedQuestion.content}
                          onChange={(e) =>
                            setEditedQuestion({
                              ...editedQuestion,
                              content: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                      <Form.Group controlId="formImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                          type="file"
                          onChange={(e) =>
                            setEditedQuestion({
                              ...editedQuestion,
                              image: e.target.files[0],
                            })
                          }
                          name="image"
                        />
                      </Form.Group>
                      <Form.Group controlId="formPointsSpent">
                        <Form.Label>Points Spent</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter points spent"
                          value={editedQuestion.points_spent}
                          onChange={(e) =>
                            setEditedQuestion({
                              ...editedQuestion,
                              points_spent: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateQuestion}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminQuestionsScreen;
