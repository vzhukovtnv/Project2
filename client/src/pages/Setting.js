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
            }else{
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
                    <h1>Setting</h1>
                </div>
            </div>
            <div>
                <form id="setting-form" className="input-group">
                    <div>
                        <label htmlFor="companyName">Company Name:</label>
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
                    </div>
                    
                    <div>
                        <label htmlFor="commission">Transaction commission $:</label>
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
                    </div>

                    <div>
                        <label htmlFor="key">Code to connect with echange</label>
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
                    </div>

                    <div>
                        <label htmlFor="interval">Interval between data requests</label>
                        <select name="interval" id="interval" defaultValue={interval} size="1"
                            onChange={(e) =>setInterval(e.target.value)}>
                            
                            <option value="1min">1min</option>
                            <option value="5min">5min</option>
                            <option value="15min">15min</option>
                            <option value="30min">30min</option>
                            <option value="60min">60min</option>
                        </select>
                    </div>

                    {<h4>{`Balance: ${balance}`}</h4>}

                    <div>
                        <button onClick={onSave}>Save</button>
                    </div>

                </form>
            </div>

            {error && <h3>{error}</h3>}
        </div>
    );
}

export default Setting;