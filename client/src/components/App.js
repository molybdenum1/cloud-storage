import { useEffect } from 'react';
import Navbar from './navbar/Navbar';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Registration from './auth/Registration';
import Login from './auth/Login';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../actions/user';
import Disk from './disk/Disk';


function App() {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(auth())
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar/>
        { !isAuth ? 
            <Routes>
              <Route path="/reg" element={<Registration/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
          :
            <Routes>
              <Route exact path="/" element={<Disk/>}/>
              <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
