import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { purchasePoints, getPackageDetails } from "../actions/pointsActions";
import { useLocation } from "react-router-dom";

const PaymentScreen = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const packageId = new URLSearchParams(location.search).get("packageId");

  const initialState = {
    points: 0,
    price: 0
  };

  useEffect(() => {
    if (packageId) {
      dispatch(getPackageDetails(packageId));
    }
  }, [dispatch, packageId]);

  const packageDetails = useSelector((state) => state.package.packageDetails);



  const handlePurchase = () => {
    if (!packageDetails) return; 
    setLoading(true);
    dispatch(purchasePoints(packageId, handleSuccess))
      .catch((error) => {
        setLoading(false);
        console.error("Purchase failed:", error);
      });
  };

  const handleSuccess = () => {
    setLoading(false);
    console.log("Purchase successful!");
  };

  return (
    <div>
      <h2>Payment Screen</h2>
      {packageDetails ? (
        <div>
          <p>Points: {packageDetails.points}</p>
          <p>Amount: ${packageDetails.price}</p>
        </div>
      ) : (
        <p>Loading package details...</p>
      )}
      <button onClick={handlePurchase} disabled={loading}>
        {loading ? "Processing..." : "Confirm Purchase"}
      </button>
    </div>
  );
};

export default PaymentScreen;
