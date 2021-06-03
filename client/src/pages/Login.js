import { useState } from "react";
import { useHistory } from "react-router-dom";

import Navbar from "../components/Navbar"

const Login = () => {
    const [eMail,   setEmail]       = useState();
    const [password,setPassword]    = useState();
    const [error   ,setError]       = useState();

    const history = useHistory();

    async function handleSubmit(e) {
        console.log('on handle submit');
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
            console.log('caught error');
            setError(error.message)            
        }
    }


    return (
        <div className="container" >
            <div className="col-4 offset-4">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title text-center">Login</h4>
                        <div className="card-text">
                            <form id="login">
                                <div className="row-fluid">
                                    <label for="eMail" className="form-label">Email</label>
                                    <input type="email"
                                        name="eMail"
                                        id="eMail"
                                        value={eMail}
                                        placeholder="email"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label for="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        className="form-control"
                                        placeholder="password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                  <div className="row-fluid text-center">
                                    <button className="btn btn-secondary" type="button" onClick={handleSubmit}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {error && <h3>{error}</h3>}
                </div>
            </div>
        </div>

    );
}

export default Login
    ;