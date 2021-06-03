import Navbar from "../components/Navbar"
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import ModifyAdminPage from "../pages/ModifyAdminPage";

const ClientList = () => {
    const [rows, setRows] = useState([]);

    const history = useHistory();

    useEffect(() => {
        const getClients = async () => {
            let response = await fetch('/client');
            let data = await response.json();
            setRows(data);
        };
        getClients();

    }, []);

    return (



        <div className="all-clients">
            <div >
                <Navbar pageName="Admin" />

                <div >
                    <h1 className="center-setting">Client list</h1>
                </div>
            </div>
            <table className="center">

                <tr>
                    <th className= "edit-column">Edit</th>
                    <th className= "money-column">$</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
                {rows.map((row) => {
                    return (
                        <tr key={row.name}  >
                            {/* onClick={() => { history.push('/modifyadminpage/' + row._id) }} */}
                            <td>
                                <input type="image"
                                    alt=""
                                    src={"/images/edit-icon-260nw.jpg"}
                                    className="top-bottom-arrow-button"
                                    onClick={() => history.push('/modifyadminpage/'+ row._id) }>
                                </input>
                                {/* <button>Money</button> */}
                            </td>

                            <td>
                                <input type="image"
                                    alt=""
                                    src={"/images/MoneyTransfer.png"}
                                    className="top-bottom-arrow-button"
                                    onClick={() => history.push('/transfermoney/'+ row._id) }>
                                </input>
                                {/* <button>Money</button> */}
                            </td>
                            <td>{row.firstName}</td>
                            <td>{row.lastName}</td>


                        </tr>
                    )
                })}

            </table>
        </div>

    );
}


export default ClientList;


