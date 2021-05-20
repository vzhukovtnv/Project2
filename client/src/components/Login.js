import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
    const [eMail, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    return (
        <div class="rpage" >
            <div class="form-box" >
                <form id="login" class="input-group">
                    <label htmlFor="eMail">eMail:</label>
                    <input
                        type="email"
                        name="eMail"
                        value={eMail}
                        class="input-field"
                        placeholder="Enter eMail"
                        required
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        class="input-field"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button  class="submit-btn"  onClick={ handleSubmit }>Login</button>
                </form>
            </div>
        </div>

    );
}

export default Login
    ;