import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar"






const TransferMoney = () => {

    const { id } = useParams()
    const [data, setData] = useState([])

    const [sumTo, setSumTo] = useState(0);
    const [sumFrom, setSumFrom] = useState(0);
    const [message, setMessage] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        let moneyTo = parseInt(sumTo);
        let moneyFrom = parseInt(sumFrom);

        let moneyTransfer = 0;
        if (!isNaN(moneyTo)) { moneyTransfer += moneyTo }
        if (!isNaN(moneyFrom)) { moneyTransfer -= moneyFrom }

        if (moneyTransfer !== 0) {
            fetch('/client/' + id + "/transfer/", {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ transfer: moneyTransfer })
            }).then(() => {
                // history.go(-1);
                setMessage(moneyTransfer.toString() + "$ transferred");
            }).catch(err => {
                setMessage(err.message);

            }
            )
        }
    }



    useEffect(() => {
        const getClientInfo = async () => {
            let response = await fetch('/client/' + id);
            let clientData = await response.json();
            setData(clientData);

        };
        getClientInfo();

    }, [id]);

    return (
        <div>
            <div >
                <Navbar pageName="TransferMoney" id={id}/>
            </div>
            <div>
                <h1 className="center-setting">Transfer Money</h1>
                {data && <h2 className="center-setting">{data.firstName + " " + data.lastName}</h2>}
                <table className="center">
                    {/* <form onSubmit={handleSubmit}> */}
                    <tr>
                        <td>
                            <label>To Account:</label>
                            <input
                                type="text"
                                required
                                value={sumTo}
                                onChange={(e) => setSumTo(e.target.value)}
                            />
                        </td>
                        <td>
                            <label>From Account:</label>
                            <input
                                type="text"
                                required
                                value={sumFrom}
                                onChange={(e) => setSumFrom(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="center-setting" >
                            <button type="button" onClick={handleSubmit}>Transfer</button>
                        </td>
                    </tr>
                    {/* </form> */}
                </table>
            </div>
            <div>
                {message && <h3 className="center-setting">{message}</h3>}
            </div>
        </div>
    );
}

export default TransferMoney;