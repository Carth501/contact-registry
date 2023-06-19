import './App.css';
import Client from './client/client';
import RegistryForm from './form/registryForm';
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
            path="/client"
            element={<Client/>}
          />
        </Routes>
      </Router>
      <div className='contact-info'>Contact me: carth501@gmail.com</div>
    </div>
  );
}

export default App;
