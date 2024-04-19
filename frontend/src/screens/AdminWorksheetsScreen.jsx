import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listWorksheets,
  deleteWorksheet,
  createWorksheet,
  updateWorksheet,
} from '../actions/adminActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import HeaderAdmin from '../components/HeaderAdmin';
import '../designs/Adminworksheet.css';

const AdminWorksheetsScreen = () => {
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editedWorksheet, setEditedWorksheet] = useState({
    id: '',
    name: '',
    category: '',
    file: '',
  });

  const worksheetList = useSelector((state) => state.worksheetList);
  const { loading, error, worksheets } = worksheetList;

  // Extract categories from the Worksheet model
  const categories = ['English', 'Math', 'History', 'Science', 'Physics', 'Calculus'];

  useEffect(() => {
    dispatch(listWorksheets());
  }, [dispatch]);

  const handleCreateWorksheet = () => {
    dispatch(createWorksheet(editedWorksheet)).then(() => {
      setShowCreateModal(false);
      dispatch(listWorksheets());
    });
  };

  const handleEditWorksheet = (worksheet) => {
    // Retain the existing file value if it exists
    const file = worksheet.file ? worksheet.file : '';
    setEditedWorksheet({ ...worksheet, file }); // Spread the existing worksheet properties and add the file
    setShowEditModal(true);
  };
  

  const handleUpdateWorksheet = () => {
    const formData = new FormData();
    formData.append('name', editedWorksheet.name);
    formData.append('category', editedWorksheet.category);
    
    // Check if a new file is selected
    if (editedWorksheet.file instanceof File) {
      formData.append('file', editedWorksheet.file); // Append the new file
    } else if (editedWorksheet.file) {
      // A file URL is provided, fetch the file and append it
      fetch(editedWorksheet.file)
        .then(response => response.blob())
        .then(blob => {
          const file = new File([blob], editedWorksheet.file.split('/').pop()); // Create a new File object
          formData.append('file', file); // Append the file
        })
        .catch(error => {
          console.error('Error fetching file:', error);
        });
    }
  
    // Include the ID of the worksheet in the form data
    formData.append('id', editedWorksheet.id);
  
    dispatch(updateWorksheet(editedWorksheet.id, formData)).then(() => {
      setShowEditModal(false);
      dispatch(listWorksheets());
    });
  };
  
  
  
  
  const handleDeleteWorksheet = (id) => {
    if (window.confirm('Are you sure you want to delete this worksheet?')) {
      dispatch(deleteWorksheet(id)).then(() => {
        dispatch(listWorksheets());
      });
    }
  };

  const resetNewWorksheetsState = () => {
    setEditedWorksheet({
      id: "", 
      name: "",
      category: "",
      file: "",
    });
  };

  return (
    <>
    <HeaderAdmin />
    <div className="admin-worksheets-container">
      <h1 id='adminwtitle'>Worksheets</h1>
      <div className="worksheet-list">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <ul>
      <Button id='adminwbtn' variant="primary" onClick={() => {
        resetNewWorksheetsState();
        setShowCreateModal(true);
      }}>
        Add Worksheet
      </Button>

      {worksheets.map((worksheet) => (
            <div key={worksheet.id} className="worksheeta-item-container">
              <div className="worksheeta-item">
                <div className="worksheeta-info">
                  <span>Name: {worksheet.name}</span> -{' '}
                  <span>Category: {worksheet.category}</span>
                  {worksheet.file && (
                    <div>
                      <strong>File:</strong>{' '}
                      <a href={worksheet.file} target="_blank" rel="noopener noreferrer">
                        {worksheet.file}
                      </a>
                    </div>
                  )}
                </div>
                <div className="worksheet-actions">
                  <button onClick={() => handleEditWorksheet(worksheet)}>Edit</button>
                  <button onClick={() => handleDeleteWorksheet(worksheet.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Worksheet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={editedWorksheet.name}
                onChange={(e) => setEditedWorksheet({ ...editedWorksheet, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select" // Render the category field as a select dropdown
                value={editedWorksheet.category}
                onChange={(e) =>
                  setEditedWorksheet({ ...editedWorksheet, category: e.target.value })
                }
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formFile">
              <Form.Label>File</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  setEditedWorksheet({ ...editedWorksheet, file: e.target.files[0] })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateWorksheet}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Worksheet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <Form>
    <Form.Group controlId="formName">
      <Form.Label>Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter name"
        name="name"
        value={editedWorksheet.name}
        onChange={(e) => setEditedWorksheet({ ...editedWorksheet, name: e.target.value })}
      />
    </Form.Group>

    <Form.Group controlId="formCategory">
      <Form.Label>Category</Form.Label>
      <Form.Control
        as="select" // Render the category field as a select dropdown
        value={editedWorksheet.category}
        onChange={(e) =>
          setEditedWorksheet({ ...editedWorksheet, category: e.target.value })
        }
      >
        <option value="">Select category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Form.Control>
    </Form.Group>

    <Form.Group controlId="formFile">
  <Form.Label>File</Form.Label>
  <Form.Control
    type="file"
    onChange={(e) =>
      setEditedWorksheet({ ...editedWorksheet, file: e.target.files[0] })
    }
  />
  {editedWorksheet.file && (
    <div>
      <p>Current File: {editedWorksheet.file.name}</p>
    </div>
  )}
</Form.Group>

  </Form>
</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateWorksheet}>
            Create Worksheet
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default AdminWorksheetsScreen;
