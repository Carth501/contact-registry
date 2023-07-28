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
    <div className="page-layout">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<RegistryForm />}
          />
          <Route
            path="/:id"
            element={<RegistryForm />}
          />
          <Route
            path="/client"
            element={<Client />}
          />
        </Routes>
      </Router>
      <div className='contact-info'>Contact me: carth501@gmail.com</div>
      <div className='disclosure'>This is just a way to declare what services you want, and is not binding. However, it could be made binding through legislation.</div>
    </div>
  );
}

export default App;
