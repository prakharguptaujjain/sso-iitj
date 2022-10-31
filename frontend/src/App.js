import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import StudentLogin from './views/studentLogin';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/student-login"
            exact
            element={
              <div>
                <StudentLogin />
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
