import { Link } from "react-router-dom";
// import React, { useEffect, useState } from 'react';

//import useFetch from "../utils/useFetch";

const Navbar = (param) => {
    let isHome = false;
    let isLogin = false;
    let isLogout = false;
    let isSignUp = false;
    let isSetting = false;
    let isAdmin = false;
    switch (param.pageName) {
        case 'Home':
            isLogin = true;
            isSignUp = true;
            break;
        case 'Login':
            isHome = true;
            break
        case 'SignUp':
            isHome = true;
            break;
        case 'Admin':
            isHome = true;
            isSetting = true;
            break;

        case 'Setting':
            isAdmin = true;
            isHome = true;
            break;
        case 'Stocks':
            isHome = true;
            break;


        default:
            break;
    }

    return (
        <nav className="navbar">
            <div className="title-bar">
                {isHome && <span>
                    <Link to="/">Home</Link>
                </span>}

                {isLogin && <span>
                    <Link to="/login">Login</Link>
                </span>}

                {isSignUp && <span>
                    <Link to="/signup">Sign up</Link>
                </span>}

                {isAdmin && <span>
                    <Link to="/admin">Administrator</Link>
                </span>}

                {isSetting && <span>
                    <Link to="/setting">Setting</Link>
                </span>}

                {isLogout && <span>
                    <Link to="/">Logout</Link>
                </span>}



            </div>
        </nav>
    );
}

export default Navbar;
