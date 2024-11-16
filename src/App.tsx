import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import BookingPage from './pages/BookingPage';
import SeatSelection from './pages/SeatSelection';
import Payment from './pages/Payment';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import MovieManagement from './pages/admin/MovieManagement';
import ShowtimeManagement from './pages/admin/ShowtimeManagement';
import FeedbackManagement from './pages/admin/FeedbackManagement';
import BookingHistory from './pages/BookingHistory';
import Profile from './pages/Profile';
import Feedback from './pages/Feedback';
import Cinema from './pages/Cinema';
import Chat from './pages/Chat';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';
import DeveloperLogin from './pages/developer/DeveloperLogin';
import DeveloperLayout from './pages/developer/DeveloperLayout';
import DeveloperDashboard from './pages/developer/Dashboard';
import AdminManagement from './pages/developer/AdminManagement';
import { useAdminStore } from './store/adminStore';
import { useDeveloperStore } from './store/developerStore';

function App() {
  const { admin } = useAdminStore();
  const { developer } = useDeveloperStore();

  return (
    <Router>
      <Routes>
        {/* Admin Login Route */}
        <Route path="/admins/login" element={<AdminLogin />} />

        {/* Developer Login Route */}
        <Route path="/developers/login" element={<DeveloperLogin />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute isAllowed={!!admin} redirectPath="/admins/login" />}>
          <Route path="/admins/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="movies" element={<MovieManagement />} />
            <Route path="showtimes" element={<ShowtimeManagement />} />
            <Route path="feedback" element={<FeedbackManagement />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Route>

        {/* Protected Developer Routes */}
        <Route element={<ProtectedRoute isAllowed={!!developer} redirectPath="/developers/login" />}>
          <Route path="/developer/*" element={<DeveloperLayout />}>
            <Route path="dashboard" element={<DeveloperDashboard />} />
            <Route path="admin-management" element={<AdminManagement />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Route>

        {/* Public Routes */}
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </Router>
  );
}

const PublicRoutes = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/movies/:id/booking" element={<BookingPage />} />
      <Route path="/movies/:id/seats" element={<SeatSelection />} />
      <Route path="/movies/:id/payment" element={<Payment />} />
      <Route path="/cinemas" element={<Cinema />} />
      <Route path="/booking-history" element={<BookingHistory />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
  </>
);

export default App;