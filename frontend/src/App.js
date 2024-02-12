import LoginScreen from "./screens/LoginScreen";
import RegisterPage from "./screens/RegisterPage";
import Profile from "./screens/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} exact />
        <Route path="/login" element={<LoginScreen />} exact /> 
        <Route path="/profile" element={<Profile />} exact />
      </Routes>
    </Router>
    
  );
}

export default App;
