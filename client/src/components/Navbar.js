import { Link } from "react-router-dom";
// import React, { useEffect, useState } from 'react';

//import useFetch from "../utils/useFetch";

const Navbar = (param) => {
    let isHome = false;
    let isLogin = false;
    let isLogout = false;
    let isSignUp = false;
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
            break;
        case 'Stocks':
            isHome = true;
            break;
    
            
        default:
            break;
    }

    //const [name, setName] =useState("");

    // useEffect(() => {
    //     const getName = async () => {
    //       //let response = await fetch('/company');
    //       //let data = await response.json();
    //       const { data: name, error, isPending } = useFetch("/company");
    //       //setName(data.name);
    //     };
    //     getName();
    //     console.log("name=", name);
    // }, [])
    
   //     const { data, error, isPending } = useFetch("/company");

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

                {isLogout && <span>
                    <Link to="/">Logout</Link>
                </span>}


            </div>
        </nav>
    );
}

export default Navbar;
