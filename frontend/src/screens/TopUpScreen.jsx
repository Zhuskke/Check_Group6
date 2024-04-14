import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopUpPackages } from "../actions/pointsActions";
import HeaderUser from "../components/HeaderUser";
import '../designs/Topupscreen.css'
import Footer from "../components/Footer";
import { FaCoins } from "react-icons/fa6";
import FooterProfile from "../components/FooterProfile";

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
    <>
      <HeaderUser />
      <div id="topupcontainer">
        <p id='topuptitle'>Top Up Points:</p>
        <div className="flex-container">
          {packages.map((topUpPackage) => (
            <div key={topUpPackage.id} className="listcontainer" onClick={() => handlePackageClick(topUpPackage.id)}>
              {topUpPackage.points} Points - ${topUpPackage.price}

              <FaCoins id="topupicon"/>

            </div>
          ))}

            <div id='topupimg'>
            </div>

            <div id='topupimg2'>
            </div>
          
        </div>
      </div>
      <FooterProfile />
    </>
  );
};

export default TopUpScreen;
