import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listUsers,
  getUserDetails,
  updateUser,
  deleteUser,
  createUser,
} from "../actions/adminActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import HeaderAdmin from "../components/HeaderAdmin";
import '../designs/Adminuser.css';
import Footer from "../components/Footer";

const AdminUsersScreen = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editedUser, setEditedUser] = useState({
    id: null,
    username: "",
    email: "",
    points: 0,
    is_active: false,
    is_staff: false,
    is_superuser: false,
    is_premium: false,
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  // const handleUserClick = (userId) => {
  //   dispatch(getUserDetails(userId));
  // };

  const handleCreateUser = () => {
    // Check if username, email, and points are not blank
    if (
      !editedUser.username.trim() ||
      !editedUser.email.trim() ||
      editedUser.points === ""
    ) {
      console.error("Username, email, and points are required.");
      return; // Exit the function without creating user if any required fields are empty
    }

    // Check if either the password or the confirm password field is filled
    if (
      editedUser.password.trim() !== "" ||
      editedUser.confirmPassword.trim() !== ""
    ) {
      // Check if the password and confirm password fields match
      if (editedUser.password !== editedUser.confirmPassword) {
        console.error("Password and confirm password must match.");
        return; // Exit the function without creating user if passwords don't match
      }
    }

    // Prepare the payload with user information
    const payload = {
      username: editedUser.username,
      email: editedUser.email,
      points: editedUser.points,
      is_active: editedUser.is_active,
      is_premium: editedUser.is_premium,
      is_staff: editedUser.is_staff,
      is_superuser: editedUser.is_superuser,
      password: editedUser.password,
    };

    // Dispatch the createUser action with the payload
    dispatch(createUser(payload))
      .then(() => {
        setShowCreateModal(false); // Close the create user modal
        dispatch(listUsers()); // Refresh the user list
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  const handleEditUser = (user) => {
    setEditedUser({
      id: user.id,
      username: user.username,
      email: user.email,
      points: user.points || 0,
      is_active: user.is_active || false,
      is_premium: user.is_premium || false,
      is_staff: user.is_staff || false,
      is_superuser: user.is_superuser || false,
      password: "",
      confirmPassword: "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditedUser({
      id: null,
      username: "",
      email: "",
      points: 0,
      is_active: false,
      is_staff: false,
      is_superuser: false,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setEditedUser((prevState) => ({
      ...prevState,
      [name]: val,
    }));

    if (
      name === "password" &&
      (!value || value.trim() === "") &&
      (!editedUser?.confirmPassword || editedUser.confirmPassword.trim() === "")
    ) {
      setEditedUser((prevState) => ({
        ...prevState,
        password: "",
      }));
    }
    if (
      name === "confirmPassword" &&
      (!value || value.trim() === "") &&
      (!editedUser?.password || editedUser.password.trim() === "")
    ) {
      setEditedUser((prevState) => ({
        ...prevState,
        confirmPassword: "",
        [name]: name === "is_premium" ? checked : value,
      }));
    }

    // Update is_premium field when checkbox changes
    if (name === "is_premium") {
      setEditedUser((prevState) => ({
        ...prevState,
        is_premium: checked,
      }));
    }
  };

  const handleUpdateUser = () => {
    // Check if username, email, and points are not blank
    if (
      !editedUser.username.trim() ||
      !editedUser.email.trim() ||
      editedUser.points === ""
    ) {
      console.error("Username, email, and points are required.");
      return; // Exit the function without updating if any required fields are empty
    }

    // Check if either the new password or the confirm password field is filled
    if (
      editedUser.password.trim() !== "" ||
      editedUser.confirmPassword.trim() !== ""
    ) {
      // Check if the new password and confirm password fields match
      if (editedUser.password !== editedUser.confirmPassword) {
        console.error("New password and confirm password must match.");
        return; // Exit the function without updating if passwords don't match
      }
    }

    // Prepare the payload with updated user information
    const payload = {
      username: editedUser.username,
      email: editedUser.email,
      points: editedUser.points,
      is_active: editedUser.is_active,
      is_staff: editedUser.is_staff,
      is_superuser: editedUser.is_superuser,
      is_premium: editedUser.is_premium, // Include is_premium in the payload
    };

    // Include the password field in the payload only if it's not empty
    if (editedUser.password && editedUser.password.trim() !== "") {
      payload.password = editedUser.password;
    }

    // Dispatch the updateUser action with the updated payload
    dispatch(updateUser(editedUser.id, payload))
      .then(() => {
        setShowModal(false);
        dispatch(listUsers());
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId))
        .then(() => {
          dispatch(listUsers());
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

  const resetNewUserState = () => {
    setEditedUser({
      username: "",
      email: "",
      points: 0,
      is_active: false,
      is_staff: false,
      is_superuser: false,
      is_premium: false,
    });
  };

  return (
    <>
    <HeaderAdmin />
    <div className="admin-users-container">
      <h1 id="adminutitle">Users</h1>
      <div className="user-list">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <ul>
<<<<<<< Updated upstream
            <Button
              variant="primary"
              onClick={() => {
                resetNewUserState(); // Reset the state of editedUser
                setShowCreateModal(true); // Open the modal for creating a new user
              }}
            >
=======
            <Button id="adduserbtn" variant="primary" onClick={() => setShowCreateModal(true)}>
>>>>>>> Stashed changes
              Add User
            </Button>

            {users.map((user) => (
              <div className="user-container">
              <li key={user.id} className="user-item">
                <div className="user-info">
                  <span>{user.username}</span> -<span>{user.email}</span>
                </div>
                <div className="user-actions">
                  <button onClick={() => handleEditUser(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)}>
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
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={editedUser.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                name="password"
                value={editedUser.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                name="confirmPassword"
                value={editedUser.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPoints">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter points"
                name="points"
                value={editedUser.points}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formis_active">
              <Form.Check
                type="checkbox"
                label="Active"
                name="is_active"
                checked={editedUser.is_active}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formIsPremium">
              <Form.Check
                type="checkbox"
                label="Premium"
                name="is_premium"
                checked={editedUser.is_premium}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formis_staff">
              <Form.Check
                type="checkbox"
                label="Staff status"
                name="is_staff"
                checked={editedUser.is_staff}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formis_superuser">
              <Form.Check
                type="checkbox"
                label="Superuser status"
                name="is_superuser"
                checked={editedUser.is_superuser}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={editedUser.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={editedUser.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={editedUser.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPoints">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter points"
                name="points"
                value={editedUser.points}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formIsActive">
              <Form.Check
                type="checkbox"
                label="Active"
                name="is_active"
                checked={editedUser.is_active}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formIsPremium">
              <Form.Check
                type="checkbox"
                label="Premium"
                name="is_premium"
                checked={editedUser.is_premium}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formIsStaff">
              <Form.Check
                type="checkbox"
                label="Staff"
                name="is_staff"
                checked={editedUser.is_staff}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formIsSuperuser">
              <Form.Check
                type="checkbox"
                label="Superuser"
                name="is_superuser"
                checked={editedUser.is_superuser}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateUser}>
            Create User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    {/* <Footer /> */}
    </>
  );
};

export default AdminUsersScreen;
