import React from 'react';
import './auth.css';
import Input from '../utils/Input/Input';
import { useState } from 'react';
import { login } from '../../actions/user';
import { useDispatch } from 'react-redux';

export default function Login() {    
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const dispatch = useDispatch();
  
    return (
      <div className='auth'>
            <div className="auth__header">Login</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Enter email..."/>
            <Input value={pass} setValue={setPass} type="password" placeholder="Enter пароль..."/>
            <button className="auth__btn" onClick={() => dispatch(login(email, pass))}>Enter</button>
        </div>
    )
}
