import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Layout/Header";
import SloganBanner from "@/components/SloganBanner";
import Footer from "@/components/Layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Home = lazy(() => import("@/pages/Home"));
const Training = lazy(() => import("@/pages/Training"));
const Nutrition = lazy(() => import("@/pages/Nutrition"));
const Music = lazy(() => import("@/pages/Music"));
const Water = lazy(() => import("@/pages/Water"));
const Forum = lazy(() => import("@/pages/Forum"));
const Sleep = lazy(() => import("@/pages/Sleep"));
const ArticleDetail = lazy(() => import("@/pages/ArticleDetail"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Profile = lazy(() => import("@/pages/Profile"));
const WorkoutTracker = lazy(() => import("@/pages/WorkoutTracker"));
const WorkoutHistory = lazy(() => import("@/pages/WorkoutHistory"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function PageLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-gym-accent/20 border-t-gym-accent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <ScrollToTop />
        <div className="min-h-screen bg-gym-dark flex flex-col">
          <Header />
          <SloganBanner />
          <div className="flex-1">
            <Suspense fallback={<PageLoading />}>
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
