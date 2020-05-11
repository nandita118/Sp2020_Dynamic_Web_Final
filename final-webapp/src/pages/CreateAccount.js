import React from 'react';
//Components
import CreateAccountForm from '../components/CreateAccountForm';

function CreateAccount({ CreateAccountFunction }) {
    return (
        <div className="Wrapper">
            <h1>Create Account</h1>
            <div className="CreateWrapper">
                <CreateAccountForm  CreateAccountFunction={CreateAccountFunction}/>
                <div className="CreateInformation">
                    <h2>About Convey</h2>
                    <p>Lorem ipsum ...</p>
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;