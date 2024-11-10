import logo from './logo.svg';
import './App.css';
import Login from './Components/LoginForm/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/HomeScreen/Home';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
