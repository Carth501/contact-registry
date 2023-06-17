import './App.css';
import RegistryForm from './form/registryForm';
import Dashboard from './dashboard/dashboard';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <div className="form-layout">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<RegistryForm/>}
          />
          <Route
            path="/:id"
            element={<RegistryForm/>}
          />
          <Route
            path="/dashboard"
            element={<Dashboard/>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
