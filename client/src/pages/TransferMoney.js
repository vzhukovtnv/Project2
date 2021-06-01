import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar"






const TransferMoney = () => {

    const { id } = useParams()
    const [data, setData] = useState([])


    useEffect(() => {
        const getClientInfo = async () => {
            let response = await fetch('/client/'+id );
            let clientData = await response.json();
            setData(clientData);
           
        };
        getClientInfo();

    }, [id]);

    return (
        <div> 
        <div >
            <Navbar pageName="TransferMoney" />
        </div>
        <div>
            <h1>Transfer Money</h1>
            {data && <div>{data.firstName+" "+data.lastName}</div>}

        </div>
        </div>
     );
}
 
export default TransferMoney;