import React from 'react';
//Components
import CreatePostForm from '../components/CreatePostForm';

function CreatePost({ CreatePostFunction, UploadImage }) {
    return (
        <div className="Wrapper">
            <h1>Create Post</h1>
            <div className="CreateWrapper">
                <CreatePostForm  CreateAccountFunction={CreatePostFunction}/>
                <div className="CreateInformation">
                    <h2>Create a Post</h2>
                    <p>Lorem ipsum ...</p>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;