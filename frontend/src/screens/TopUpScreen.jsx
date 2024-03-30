import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopUpPackages } from "../actions/pointsActions";

const TopUpScreen = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const dispatch = useDispatch();
  const { packages } = useSelector((state) => state.topUpPackages);

  useEffect(() => {
    dispatch(getTopUpPackages());
  }, [dispatch]);

  // Function to handle clicking on a package
  const handlePackageClick = (packageId) => {
    setSelectedPackage(packageId);
    // Redirect to payment screen with packageId as a query parameter
    window.location.href = `/payment?packageId=${packageId}`;
  };

  return (
    <div>
      <h2>Top Up Points</h2>
      <ul>
        {packages.map((topUpPackage) => (
          <li key={topUpPackage.id}>
            {/* Handle package click */}
            <div onClick={() => handlePackageClick(topUpPackage.id)}>
              {topUpPackage.points} Points - ${topUpPackage.price}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUpScreen;
