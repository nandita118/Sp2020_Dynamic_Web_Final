import React from 'react';

function CreatePostForm({createPostFunction}) {
    return (
        <div>
            <form className="Form CreatePostForm" onSubmit={(e) => createPostFunction(e)}>
                <label htmlFor="loginPassword">Password</label>
                <input type="password" name="loginPassword" />
                <button>Log In Button</button>
            </form>
        </div>
    );
}

export default CreatePostForm;