import React, { useState, useEffect } from "react";
import axios from "axios"; 

function Home({userInformation}) {
    const [allPosts, setAllPosts] = useState([]);
    const email = userInformation.email;
    const uid = userInformation.uid;

    useEffect(() => {
        //Make a request for the weather by city
        // if (city) {
            axios
                .get(
                    //My API Endpoint
                    //Local:
                    `http://localhost:4000`
                    //Production:
                    //`https://myheroku-deployed-api.heroku.com`
                )
                .then(function(response){
                    //handle success
                    console.log('response', response);
                    setAllPosts(response.data);
                })
                .catch(function(error){
                    //handle error
                    console.log(error);
                });
    }, []);

    return (
        <div className="Wrapper">
        <h1>Welcome, {email} </h1>
        <h2>All Posts</h2>
        <div className="AllPosts Header__Nav">
            {/*DISPLAY ALL POSTS HERE */}
            {allPosts.map((post, i) => (
                <p key={i}>
                    <a href={`/post/${post.id}`}>
                        {post.text}
                    </a>
                </p>
            ))}
        </div>
    </div>
    );
}

export default Home;