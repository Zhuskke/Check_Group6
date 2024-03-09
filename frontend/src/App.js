import LoginScreen from "./screens/LoginScreen";
import RegisterPage from "./screens/RegisterPage";
import Profile from "./screens/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import HomeScreenUser from "./screens/HomeScreenUser";
import EnglishScreen from './screens/EnglishScreen'
import MathScreen from './screens/MathScreen'
import HistoryScreen from './screens/HistoryScreen'
import ScienceScreen from './screens/ScienceScreen'
import PhysicsScreen from './screens/PhysicsScreen'
import CalculusScreen from './screens/CalculusScreen'
import HeaderProfile from "./components/HeaderProfile";
import AskAQuestionScreen from "./screens/AskAQuestionScreen";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/home" element={<HomeScreenUser />} exact />
        <Route path="/register" element={<RegisterPage />} exact />
        <Route path="/login" element={<LoginScreen />} exact /> 
        <Route path="/profile" element={<Profile />} exact /> 
        <Route path="/english" element={<EnglishScreen />} exact />
        <Route path="/math" element={<MathScreen />} exact />
        <Route path="/history" element={<HistoryScreen />} exact />
        <Route path="/science" element={<ScienceScreen />} exact />
        <Route path="/physics" element={<PhysicsScreen />} exact />
        <Route path="/calculus" element={<CalculusScreen />} exact />
        <Route path="/ask-a-question" element={<AskAQuestionScreen />} exact />
        

      </Routes>
    </Router>
    
  );
}

export default App;
