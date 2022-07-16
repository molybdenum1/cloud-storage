import React from 'react';
import './auth.css';
import Input from '../utils/Input/Input';
import { useState } from 'react';
import { registration } from '../../actions/user';

export default function Registration() {    
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
  
    return (
      <div className='auth'>
            <div className="auth__header">Registration</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Enter email..."/>
            <Input value={pass} setValue={setPass} type="password" placeholder="Enter пароль..."/>
            <button className="auth__btn" onClick={() => registration(email, pass)}>Enter</button>
        </div>
    )
}
