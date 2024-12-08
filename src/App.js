import logo from './logo.svg';
import './App.css';
import Login from './Components/LoginForm/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/HomeScreen/Home';
import ProtectedRoute from './Components/LoginForm/ProtectedRoute';
import About from './Components/About/About';
import SingUp from './Components/SingUpPage/SingUp';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home'  element={
              <ProtectedRoute element={<Home />} />
            }/>
        <Route path='/about' element={<About/>}/>
        <Route path='/singup' element={<SingUp/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
