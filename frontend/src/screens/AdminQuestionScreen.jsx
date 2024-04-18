import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listQuestions,
  updateQuestion,
  deleteQuestion,
  createQuestion,
  listUsers,
} from "../actions/adminActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import HeaderAdmin from "../components/HeaderAdmin";
import '../designs/Adminquestion.css';

const AdminQuestionsScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listQuestions());
    dispatch(listUsers()); // Dispatch the listUsers action
  }, [dispatch]);

  const questionList = useSelector((state) => state.questionList);
  const { loading, error, questions } = questionList;

  const [editedQuestion, setEditedQuestion] = useState({
    content: "",
    attachment: null,
    points_spent: 0,
  });
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [clearAttachment, setClearAttachment] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const handleUpdateQuestion = async () => {
    const formData = new FormData();
    formData.append("content", editedQuestion.content);
    formData.append("points_spent", editedQuestion.points_spent);

    // Append clearAttachment parameter
    formData.append("clearAttachment", clearAttachment ? "true" : "false");

    // Append attachment if it's not null
    if (editedQuestion.attachment) {
      formData.append("attachment", editedQuestion.attachment);
    }

    await dispatch(updateQuestion(selectedQuestionId, formData)); // Wait for updateQuestion action to complete

    setShowEditModal(false);
    dispatch(listQuestions()); // Fetch updated list of questions
  };

  const resetNewQuestionState = () => {
    setNewQuestion({
      content: "",
      attachment: null,
      points_spent: 0,
    });
  };
  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      await dispatch(deleteQuestion(questionId));
      dispatch(listQuestions()); // Fetch updated list of questions
    }
  };

  const [newQuestion, setNewQuestion] = useState({
    content: "",
    attachment: null,
    points_spent: 0,
  });

  const handleCreateQuestion = () => {
    const questionData = {
      ...newQuestion,
      userId: selectedUserId,
      attachment: newQuestion.attachment,
      points_spent: newQuestion.points_spent,
    };
    dispatch(createQuestion(questionData));
    setShowAddModal(false);
    dispatch(listQuestions());
  };

  return (
    <>
    <HeaderAdmin />
    <div className="admin-questions-container">
      <h1 id="adminqtitle">Questions</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>

<Button
  variant="primary"
  onClick={() => {
    resetNewQuestionState();
    setShowAddModal(true);
  }}
  id="adminqbtn"
>
  Add Question
</Button>
          <ul>
            {questions.map((question) => (
              <div className="userq-container">
              <li key={question.id} className="userq-item">
                <div className="userq-info">
                {question.content}
                </div>
                <div className="userq-actions">
                <Button
                  variant="info"
                  onClick={() => {
                    setSelectedQuestionId(question.id);
                    setEditedQuestion({
                      content: question.content,
                      attachment: null,
                      points_spent: question.points_spent,
                    });
                    setShowEditModal(true); // Show edit modal
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
                </div>



                {selectedQuestionId === question.id && (
                  <Modal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Question</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group controlId="formContent">
                          <Form.Label>Question</Form.Label>
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
                                attachment: e.target.files[0],
                              })
                            }
                            name="attachment"
                          />
                          {editedQuestion.attachment && (
                            <div>
                              <p>
                                Uploaded File: {editedQuestion.attachment.name}
                              </p>
                              <Form.Check
                                type="checkbox"
                                label="Clear Image"
                                onChange={(e) => {
                                  setClearAttachment(e.target.checked);
                                  if (e.target.checked) {
                                    setEditedQuestion({
                                      ...editedQuestion,
                                      attachment: null,
                                    });
                                  }
                                }}
                              />
                            </div>
                          )}
                          {!editedQuestion.attachment &&
                            question.attachment && (
                              <div>
                                <p>
                                  Uploaded File:{" "}
                                  {question.attachment.split("/").pop()}
                                </p>
                                <Form.Check
                                  type="checkbox"
                                  label="Clear Image"
                                  onChange={(e) => {
                                    setClearAttachment(e.target.checked);
                                    if (e.target.checked) {
                                      setEditedQuestion({
                                        ...editedQuestion,
                                        attachment: null,
                                      });
                                    }
                                  }}
                                />
                              </div>
                            )}
                        </Form.Group>

                        <Form.Group controlId="formPointsSpent">
                          <Form.Label>Points</Form.Label>
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
                        onClick={() => setShowEditModal(false)}
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
            </div>
            ))}
          </ul>
          <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formUser">
                  <Form.Label>Choose User</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => setSelectedUserId(e.target.value)}
                  >
                    <option value="">Select user</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formContent">
                  <Form.Label>Question</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter content"
                    value={newQuestion.content}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        content: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formAttachment">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        attachment: e.target.files[0],
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formPointsSpent">
                  <Form.Label>Points</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter points spent"
                    value={newQuestion.points_spent}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
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
                onClick={() => setShowAddModal(false)}
              >
                Close
              </Button>
              <Button variant="primary" onClick={handleCreateQuestion}>
                Add Question
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
    </>
  );
};

export default AdminQuestionsScreen;
