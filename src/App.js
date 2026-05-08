import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import Login from './pages/Login';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherUpload from './pages/TeacherUpload';
import TeacherMyContent from './pages/TeacherMyContent';
import PrincipalDashboard from './pages/PrincipalDashboard';
import PrincipalApprovals from './pages/PrincipalApprovals';
import PrincipalAllContent from './pages/PrincipalAllContent';
import PublicLive from './pages/PublicLive';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/live/:teacherId" element={<PublicLive />} />
          
          {/* Teacher Routes with Layout */}
          <Route path="/teacher" element={<PrivateRoute allowedRoles={['teacher']} />}>
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="upload" element={<TeacherUpload />} />
            <Route path="my-content" element={<TeacherMyContent />} />
          </Route>
          
          {/* Principal Routes with Layout */}
          <Route path="/principal" element={<PrivateRoute allowedRoles={['principal']} />}>
            <Route path="dashboard" element={<PrincipalDashboard />} />
            <Route path="approvals" element={<PrincipalApprovals />} />
            <Route path="all-content" element={<PrincipalAllContent />} />
          </Route>
          
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;