import { useState } from "react";
import { useHistory } from "react-router-dom";

import Navbar from "../components/Navbar"

const Login = () => {
    const [eMail,   setEmail]    = useState("");
    const [password,setPassword] = useState("");

    //  const history = useHistory();

    async function handleSubmit() {
        const url =`client/login/${eMail}/${password}`;
        alert(url)
        let response = await fetch(url);
        let data = await response.json();
        if (data){
            alert("Click!");

            console.log("data=", data)
            if (data?._id !==""){
                if (data.role > 0){
                    //history.push("/Admin/"+ data._id)
                }else{
                    //history.push("/Stocks/"+ data._id)
                }
            }
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
                        value={password}
                        className="input-field"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="submit-btn" onClick={handleSubmit}>Login</button>
                </form>
            </div>
        </div>

    );
}

export default Login
    ;