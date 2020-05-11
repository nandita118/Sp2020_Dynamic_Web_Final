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
                    <p>This social media site is meant to be a place to share your one-second-a-day videos :) Get creative!</p>
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;