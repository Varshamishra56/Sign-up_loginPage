import 'bootstrap/dist/css/bootstrap.min.css';
import './output.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import SignupLoginForm from './SignupLoginForm';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Signup" />} />
        <Route path='/Signup' element={<SignupLoginForm isSignup={true} />} />
        <Route path='/Login' element={<SignupLoginForm isSignup={false} />} />
        <Route path='/Home' element={<Home></Home>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
