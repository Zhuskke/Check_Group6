import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listTopUpPackages,
  updateTopUpPackage,
  deleteTopUpPackage,
  createTopUpPackage,
} from "../actions/adminActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import HeaderAdmin from "../components/HeaderAdmin";

const AdminPackagesScreen = () => {
  const dispatch = useDispatch();
  const [editedPackage, setEditedPackage] = useState({
    points: "",
    price: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    dispatch(listTopUpPackages());
  }, [dispatch]);

  const packageList = useSelector((state) => state.topUpPackageList);
  const { loading, error, packages } = packageList;

  const handleCloseModal = () => {
    setShowModal(false);
    setEditedPackage({
      points: "",
      price: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPackage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreatePackage = async () => {
    try {
      await dispatch(createTopUpPackage(editedPackage));
      setShowCreateModal(false);
      dispatch(listTopUpPackages());
    } catch (error) {
      console.error("Error creating package:", error);
    }
  };

  const handleEditPackage = (pkg) => {
    setEditedPackage({
      points: pkg.points,
      price: pkg.price,
    });
    setSelectedPackage(pkg); // Store the selected package
    setShowModal(true);
  };

  const handleUpdatePackage = async (packageId, packageData) => {
    try {
      await dispatch(updateTopUpPackage(packageId, packageData));
      setShowModal(false);
      dispatch(listTopUpPackages());
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  const handleDeletePackage = async (packageId) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await dispatch(deleteTopUpPackage(packageId));
        dispatch(listTopUpPackages());
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    }
  };

  return (
    <div className="admin-packages-container">
      <HeaderAdmin />
      <h1>Packages</h1>
      <div className="package-list">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <ul>
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              Add Package
            </Button>
            {packages.map((pkg) => (
              <li key={pkg.id} className="package-item">
                <div className="package-info">
                  <span>Points: {pkg.points}</span> -{" "}
                  <span>Price: {pkg.price}</span>
                </div>
                <div className="package-actions">
                  <button onClick={() => handleEditPackage(pkg)}>Edit</button>
                  <button onClick={() => handleDeletePackage(pkg.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPoints">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter points"
                name="points"
                value={editedPackage.points}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={editedPackage.price}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              handleUpdatePackage(selectedPackage.id, editedPackage)
            }
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPoints">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter points"
                name="points"
                value={editedPackage.points}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={editedPackage.price}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreatePackage}>
            Add Package
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPackagesScreen;
