import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Layout/Header";
import SloganBanner from "@/components/SloganBanner";
import Footer from "@/components/Layout/Footer";
import Home from "@/pages/Home";
import Training from "@/pages/Training";
import Nutrition from "@/pages/Nutrition";
import Music from "@/pages/Music";
import Water from "@/pages/Water";
import Forum from "@/pages/Forum";
import Sleep from "@/pages/Sleep";
import ArticleDetail from "@/pages/ArticleDetail";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import WorkoutTracker from "@/pages/WorkoutTracker";
import WorkoutHistory from "@/pages/WorkoutHistory";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gym-dark flex flex-col">
          <Header />
          <SloganBanner />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/training" element={<Training />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/music" element={<Music />} />
              <Route path="/water" element={<Water />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/sleep" element={<Sleep />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/workout" element={<WorkoutTracker />} />
              <Route path="/workout/history" element={<WorkoutHistory />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}