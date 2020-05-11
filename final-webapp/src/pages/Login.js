import React from 'react';
//Components
import LoginForm from '../components/LoginForm';

function Login({ LoginFunction }) {
    return (
    <div className="Wrapper">
        <h1>Login</h1>
        <LoginForm  LoginFunction={LoginFunction}/>
    </div>
    );
}

export default Login;