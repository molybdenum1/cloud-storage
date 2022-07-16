import { useEffect } from 'react';
import Navbar from './navbar/Navbar';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Registration from './auth/Registration';
import Login from './auth/Login';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../actions/user';


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
        { !isAuth && 
          <Routes>
            <Route path="/reg" element={<Registration/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
