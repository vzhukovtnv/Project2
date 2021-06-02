import { useState, useEffect } from "react";
//import { useHistory } from "react-router-dom";

import Navbar from "../components/Navbar"

const Setting = () => {
    const [name, setName] = useState();
    const [commission, setCommission] = useState();
    const [key, setKey] = useState();
    const [interval, setInterval] = useState();
    const [balance, setBalance] = useState();

    const [error, setError] = useState();

    useEffect(() => {
        const getSetting = async () => {
            const url = '/company/setting';
            try {
                let response = await fetch(url);
                if (!response.ok) {
                    setError("Server Error ");
                    return;
                }
                let data = await response.json();
                if (data) {
                    setName(data.name);
                    setCommission(data.commission);
                    setKey(data.key);
                    setInterval(data.interval);
                    setBalance(data.balance);
                } else {
                    setError("Server Error 2")
                }

            } catch (error) {
                setError("Server Error " + error.message)
            }

        };
        getSetting();
    }, [])

    let onSave = async (e) => {
        e.preventDefault();
        const url = '/company/setting';
        const setting = { name, commission, key, interval };
        try {
            let response = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(setting)
            });
            if (response.ok) {
                setError("Configuration saved");
            } else {
                setError(await response.text());
            }

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="setting">
            <div className="rpage" >
                <Navbar pageName="Setting" />
                <div>
                    <h1 className="center-setting">Settings</h1>
                </div>
            </div>
            <div>
                
                {/* <form id="setting-form" className="input-group"> */}
                <table className="center">
                    <tr>
                        <td>
                            <label htmlFor="companyName">Company Name:</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                name="companyName"
                                id="companyName"
                                value={name}
                                className="input-field"
                                placeholder="Enter company name"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="commission">Transaction commission $:</label>
                        </td>
                        <td>
                            <input
                                type="number"
                                name="commission"
                                id="commission"
                                value={commission}
                                className="input-field"
                                placeholder="Enter commission"
                                required
                                onChange={(e) => setCommission(e.target.value)}
                            />
                        </td>
                    </tr>


                    <tr>
                        <td>
                            <label htmlFor="key">Code to connect with exchange</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                name="key"
                                id="key"
                                value={key}
                                className="input-field"
                                placeholder="Enter code"
                                required
                                onChange={(e) => setKey(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="interval">Interval between data requests</label>
                        </td>
                        <td>
                            <select name="interval" id="interval" value={interval} size="1"
                                onChange={(e) => setInterval(e.target.value)}>

                                <option value="1min">1min</option>
                                <option value="5min">5min</option>
                                <option value="15min">15min</option>
                                <option value="30min">30min</option>
                                <option value="60min">60min</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {<h4>Balance:</h4>}
                        </td>
                        <td>
                            {<h4>{`${balance}`}</h4>}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="center-setting">
                            <button onClick={onSave}>Save</button>
                        </td>
                    </tr>
                </table>
                {/* </form> */}

            </div>

            {error && <h3>{error}</h3>}
        </div>
    );
}

export default Setting;