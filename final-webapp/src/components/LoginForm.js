import React from 'react';

function LoginForm({LoginFunction}) {
    return (
        <div>
            <form className="Form LoginForm" onSubmit={(e) => LoginFunction(e)}>
                <label htmlFor="loginEmail">Email</label>
                <input type="email" name="loginEmail" />
                <label htmlFor="loginPassword">Password</label>
                <input type="password" name="loginPassword" />
                <button>Log In Button</button>
            </form>
        </div>
    );
}

export default LoginForm;