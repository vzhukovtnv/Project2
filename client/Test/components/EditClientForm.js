import { useState, useEffect } from "react";

const EditClientForm = ({ id, editRole, buttonCaption, submitMessage }) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phone, setPhone] = useState();
    const [eMail, setEMail] = useState();
    const [role, setRole] = useState();
    const [password, setPassword] = useState();

    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [error, setError] = useState();

    
    useEffect(() => {
        const getClient = async () => {
            if (!id) { return }

            const url = '/client/' + id;
            try {
                let response = await fetch(url);
                if (!response.ok) {
                    setError("Server Error ");
                    return;
                }
                let data = await response.json();
                if (data) {
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setPhone(data.phone);
                    setEMail(data.eMail);
                    setRole(data.role)
                } else {
                    setError("Server Error 2")
                }
            } catch (error) {
                setError("Server Error " + error.message)
            }
        };
        getClient();
    }, [id])

    let onSave = async (e) => {
        e.preventDefault();
        let method;
        let client;
        let url = '/client';
        if (id) {
            method = "PUT";
            url += "/" + id;
            client = (editRole) ?
                { firstName, lastName, phone, eMail, role } :
                { firstName, lastName, phone, eMail };

        } else {
            method = "POST";
            client = { firstName, lastName, phone, eMail, password, role: 0, balance:0 };
        }
        try {
            let response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(client)
            });
            if (response.ok) {
                setError(submitMessage);
                setSubmitButtonDisabled(true);
            } else {
                setError(await response.text());
            }

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="registratioon-fosetting">

            <div>
                <form id="registration-form" className="input-group">
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={firstName}
                            className="input-field"
                            placeholder="Enter first name"
                            required
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={lastName}
                            className="input-field"
                            placeholder="Enter Last name"
                            required
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={phone}
                            className="input-field"
                            placeholder="Enter phone"
                            required
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>


                    <div>
                        <label htmlFor="eMail">eMail:</label>
                        <input
                            type="email"
                            name="eMail"
                            id="eMail"
                            value={eMail}
                            className="input-field"
                            placeholder="Enter eMail"
                            required
                            onChange={(e) => setEMail(e.target.value)}
                        />
                    </div>

                    {   !id && <div>
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
                        </div>
                    }
                    <button className="submit-btn" onClick={onSave} disabled={submitButtonDisabled}>{buttonCaption}</button>

                </form>
                {error && <h3>{error}</h3>}

            </div>
        </div>
    );
}

export default EditClientForm;