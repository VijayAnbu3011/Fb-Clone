import Home from './pages/home/Home'
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/home/profile/Profile';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  const {user}=useContext(AuthContext)
  return (
   <BrowserRouter >
    <Routes>
      <Route path='/' element={user ? <Home /> : <Login />}></Route>
      <Route path='/login' element={user ? <Home /> : <Login />} ></Route>
      <Route path='/register' element={user ? <Home /> : <Register />}></Route>
      <Route path='/profile/:username' element={<Profile />}></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
