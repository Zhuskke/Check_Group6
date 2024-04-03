import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Profile from "./screens/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import HomeScreenUser from "./screens/HomeScreenUser";
import EnglishScreen from './screens/EnglishScreen'
import MathScreen from './screens/MathScreen'
import HistoryScreen from './screens/HistoryScreen'
import ScienceScreen from './screens/ScienceScreen'
import PhysicsScreen from './screens/PhysicsScreen'
import CalculusScreen from './screens/CalculusScreen'
import AskQuestionScreen from "./screens/AskQuestionScreen";
import QuestionDetail from "./screens/QuestionDetailScreen";
import SearchScreen from "./screens/SearchScreen";
import SubscriptionChoiceScreen from "./screens/SubscriptionChoice";
import OrderScreen from "./screens/OrderScreen";
import TopUpScreen from "./screens/TopUpScreen";
import PaymentScreen from "./screens/PaymentScreen";
import VisitProfile from "./screens/VisitProfile";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/home" element={<HomeScreenUser />} exact />
        <Route path="/register" element={<RegisterScreen />} exact />
        <Route path="/login" element={<LoginScreen />} exact /> 
        <Route path="/profile" element={<Profile />} exact />   
        <Route path="/english" element={<EnglishScreen />} exact />
        <Route path="/math" element={<MathScreen />} exact />
        <Route path="/history" element={<HistoryScreen />} exact />
        <Route path="/science" element={<ScienceScreen />} exact />
        <Route path="/physics" element={<PhysicsScreen />} exact />
        <Route path="/calculus" element={<CalculusScreen />} exact />
        <Route path="/ask-a-question" element={<AskQuestionScreen />} exact />
        <Route path="/questions/:id" element={<QuestionDetail />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/subscription" element={<SubscriptionChoiceScreen />} />
        <Route path="/order" element={<OrderScreen />} />
        <Route path="/topup" element={<TopUpScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/profile/:id" element={<VisitProfile />} />
      </Routes>
    </Router>
    
  );
}

export default App;
