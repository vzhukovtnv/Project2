import { Link, useParams } from "react-router-dom";
// import React, { useEffect, useState } from 'react';

//import useFetch from "../utils/useFetch";

const Navbar = ({ pageName, id }) => {

    let isHome = false;
    let isLogin = false;
    let isLogout = false;
    let isSignUp = false;
    let isModifyClient = false;
    let isSetting = false;
    let isAdmin = false;
    let isStock = false;
    let isStockHistory = false
    //let isTransferMoney =false;
    switch (pageName) {
        case 'Home':
            isLogin = true;
            isSignUp = true;
            break;
        case 'Login':
        case 'Registration':
            isHome = true;
            break
        case 'SignUp':
            isHome = true;
            break;
        case 'ModifyClientPage':
            isHome = true;
            isStock = true;
            break;
        case 'ModifyAdminPage':
            isHome = true;
            isAdmin = true;
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
            isStockHistory = true;
            isModifyClient = true;
            break;

        case 'StocksHistory':
            isHome = true;
            //          isStock = true;
            break;

        case 'TransferMoney':
            isHome = true;
            isAdmin = true;
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

                {isModifyClient && <span>
                    <Link to={"/modifyClient/" + id}>Modify personal information</Link>
                </span>}

                {isAdmin && <span>
                    <Link to="/admin">Administrator</Link>
                </span>}

                {isStock && <span>
                    <Link to={"/stocks/" + id}>Stocks</Link>
                </span>}

                {isStockHistory && <span>
                    <Link to={"/stocksHistory/"}>Stocks History</Link>
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
