import Profile from './components/Profile';
import Groups from './components/Groups';
import Notes from './components/Notes';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
 } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="login" />} />
          <Route path="/login" element={< Login/>} />
          <Route path="/register" element={< Register/>} />
          <Route path="/cursuri" element={< Notes/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/grupuri" element={<Groups />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;