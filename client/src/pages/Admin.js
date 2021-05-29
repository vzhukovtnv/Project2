import Navbar from "../components/Navbar"
import React, { useEffect, useState } from 'react';

/*const Admin = () => {
    return (
        <div >
            <Navbar pageName="Admin" />

            <div >
                <h1>Admin</h1>
            </div>
        </div>
    );
}*/

const ClientList = () => {
    const [rows, setRows] = useState([]);

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
                <h1>Admin</h1>
            </div>
        </div>
            <table>
                
                <tr><th>First Name</th><th>Last Name</th></tr>
                {rows.map((row) => {
                    return (                                     
                        <tr key={row.name} >
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


