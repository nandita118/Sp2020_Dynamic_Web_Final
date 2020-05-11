import React from "react";

function Header({LogoutFunction, isLoggedIn}) {
    return (
        <header className="Header">
            <div className="Header__Wrapper">
                <div className="Header__Logo">Logo</div>
                <nav className="Header__Nav">
                    {isLoggedIn && <a href="/">Profile</a>}
                    {isLoggedIn && <a href="/create-post">Create Post</a>}
                    {isLoggedIn && <a href="/create-account">Create Account</a>}
                    {isLoggedIn && <a href="/login">Login</a>}
                    {isLoggedIn && 
                        <a href="" onClick={() => LogoutFunction()} > 
                            Log Out
                        </a>}
                </nav>
            </div>
        </header>
    );
}

export default Header;