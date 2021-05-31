import { useState } from "react";
import { useHistory } from "react-router-dom";

import Navbar from "../components/Navbar"

const Login = () => {
    const [eMail,   setEmail]       = useState();
    const [password,setPassword]    = useState();
    const [error   ,setError]       = useState();

    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        const url =`client/login/${eMail}/${password}`;
        try {
            let response = await fetch(url);
            if (!response.ok){
                setError("Server Error ")
                return;
            }
            let data = await response.json();
            if (data){
                if (data._id.length > 10){
                    history.push((data.role > 0) ?
                            `/admin`:
                            `/stocks/${data._id}`);
                }else
                {
                    setError("User ID or password are not correct");
                }
            }else {
                setError("Server Error 2");
            }
                
        } catch (error) {
            setError(error.message)            
        }
    }


    return (
        <div className="rpage" >
            <div >
                <Navbar pageName="Login" />
            </div>
            <div className="form-box" >
                <form id="login" className="input-group">
                    <label htmlFor="eMail">eMail:</label>
                    <input
                        type="email"
                        name="eMail"
                        id="eMail"
                        value={eMail}
                        className="input-field"
                        placeholder="Enter eMail"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        className="input-field"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="submit-btn" onClick={handleSubmit}>Login</button>
                </form>
                {error && <h3>{error}</h3>}
            </div>
        </div>

    );
}

export default Login
    ;