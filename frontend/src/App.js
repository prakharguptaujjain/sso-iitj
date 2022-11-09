import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './utils/ProtectedRoute';
import StudentLogin from './views/studentLogin';
import StudentRegister from './views/StudentRegister';
import Dashboard from './views/Dashboard';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/login"
              exact
              element={
                <div>
                  <StudentLogin />
                </div>
              }
            />
            <Route
              path="/register"
              exact
              element={
                <div>
                  <StudentRegister />
                </div>
              }
            />
            <Route
              path="/"
              element={
                <div>
                  <ProtectedRoute>
                    {' '}
                    <Dashboard />{' '}
                  </ProtectedRoute>
                </div>
              }
            />
          </Routes>
          <Toaster />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
