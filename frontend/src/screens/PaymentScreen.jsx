import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { purchasePoints, getPackageDetails } from "../actions/pointsActions";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import HeaderUser from "../components/HeaderUser";


const PaymentScreen = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const packageId = new URLSearchParams(location.search).get("packageId");
  const packageDetails = useSelector((state) => state.package.packageDetails);
  

  useEffect(() => {
    if (packageId) {
      dispatch(getPackageDetails(packageId));
    }
  }, [dispatch, packageId]);

  useEffect(() => {
    if (success) {
      navigate("/home");
      window.location.reload();
    }
  }, [success, navigate]);

  const handlePurchase = () => {
    if (!packageDetails) return;
    setLoading(true);
    dispatch(purchasePoints(packageId, handleSuccess));
  };

  const successPaymentHandler = (paymentResult) => {
    dispatch(purchasePoints(packageId, paymentResult))
      .then(() => {
        setSuccess(true); // Update success state after successful purchase
      })
      .catch((error) => {
        setLoading(false);
        console.error("Purchase failed:", error);
      });
  };

  const createOrderHandler = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: packageDetails.price,
            currency_code: "USD",
          },
        },
      ],
    });
  };

  const onApproveHandler = (data, actions) => {
    return actions.order.capture().then(function (details) {
      successPaymentHandler({ id: details.id, status: details.status, update_time: details.update_time });
    });
  };

  const handleSuccess = () => {
    setLoading(false);
    console.log("Purchase successful!");
  };

  return (
    <div>
      <HeaderUser />
      <h2>Payment Screen</h2>
      {packageDetails ? (
        <div>
          <p>Points: {packageDetails.points}</p>
          <p>Amount: ${packageDetails.price}</p>
        </div>
      ) : (
        <p>Loading package details...</p>
      )}
      <PayPalScriptProvider
        options={{
          "client-id":
            "AZCdyKNZ2p8oABKCFwy2w0_tJA1dsr5ghWDDDpLl_7YLn3b6GwL6uTK9oWb3vsImxyqQnBzdma0GdCnv",
          currency: "USD",
        }}
      >
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={createOrderHandler}
          onApprove={onApproveHandler}
          onSuccess={successPaymentHandler}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaymentScreen;
