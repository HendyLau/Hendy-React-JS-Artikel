import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Videos from "./pages/Videos";
import VideoDetail from "./pages/VideoDetail";
import SocialLogin from "./pages/SocialLogin";
import SocialCallback from "./pages/SocialCallback";
import SocialLoginRedirect from "./pages/SocialLoginRedirect";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute"; 
import Profile from "./pages/Profile";

const App = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/social-login" element={<SocialLogin />} />
      <Route path="/auth/callback" element={<SocialCallback />} />
      <Route path="/social-login/redirect" element={<SocialLoginRedirect />} />

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/articles" element={
        <ProtectedRoute>
          <Articles />
        </ProtectedRoute>
      } />
      <Route path="/articles/:id" element={
        <ProtectedRoute>
          <ArticleDetail />
        </ProtectedRoute>
      } />
      <Route path="/videos" element={
        <ProtectedRoute>
          <Videos />
        </ProtectedRoute>
      } />
      <Route path="/videos/:id" element={
        <ProtectedRoute>
          <VideoDetail />
        </ProtectedRoute>
      } />

      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>
);

export default App;
