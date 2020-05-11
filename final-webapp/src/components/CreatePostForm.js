import React from 'react';

function CreatePostForm({CreatePostFunction}) {
    return (
        <div>
            <form className="Form CreatePostForm" onSubmit={(e) => CreatePostFunction(e)}>
                <label htmlFor="postText">Text</label>
                <input type="text" name="postText" />
                <label htmlFor="postImage">Image</label>
                <input type="file" name="postImage" accept="image/*"/>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default CreatePostForm;