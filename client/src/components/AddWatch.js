import { useState, useEffect } from "react";

const AddWatch = ({id, createWatch}) => {
    const [idClient, setIdClient] = useState(id);
    const [symbol, setSymbol] = useState()
    
    async function  onAdd(){
        if (!symbol || symbol==="" ||  !idClient) {
            return;
        }
        const url ="/stocks/"+idClient+"/watch";
        const action ={ operation: "add" , symbol}
    alert(url)
    //alert(action.symbol)
        try {
            let response = await fetch(url, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify(action)
            });
            // 'Accept': 'application/json'
            if (response.ok) {
                let r = await response.json();
                alert("responceOK = "+r.ok )
            } else {
                alert("rr "+await response.text());
            }
 
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="eeee">
            <h4>Add new stock</h4>
            <form id="add-new-stock-form" className="input-group">
                    <label htmlFor="symbol">Stock:</label>
                    <input
                        type="text"
                        name="symbol"
                        id="symbol"
                        className="input-field"
                        //placeholder="Enter first name"
                        required
                        onChange={(e) => setSymbol(e.target.value)}
                    />

                <button className="submit-btn" onClick={onAdd} >Add</button>

            </form>
        </div>
    );
}

export default AddWatch;