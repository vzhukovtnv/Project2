 import { useState } from "react";

const AddWatch = ({createWatch,id}) => {
    //let idClient ="60aab2a2b4296b30c891bd3f" //id;
    
    // const [idClient, setIdClient] = useState();
     
    const [symbol, setSymbol] = useState()
    let idClient = id;
    // function setSymbol(val){
    //     setSymbol( val);
    //     alert("setSymbol "+val)
    // }

    // useEffect(() => {
    //     const AddWatchInit = async () => {
    //         setIdClient(id);
    //     }

    //     AddWatchInit();
    // }, [id])

    async function onAdd() {
        if (!symbol || symbol === "" || !idClient) {
            return;
        }
        const url = "/api/stocks/" + idClient + "/watch";
        //const url = "/api/stocks/60aab2a2b4296b30c891bd3f/watch";
        const action = { operation: "add", symbol }
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
 //               alert("ok=", r.ok)
                if (r.ok){
                    createWatch(symbol);
                    //alert("Data is OK")
                }
                else{
                    alert("There are no "+ symbol+ " stock");
                }
            } else {
                alert("response: " + await response.text());
            }

        } catch (error) {
            alert(error.message);
        }
     }

    return (
        <div className="eeee">
            <h4>Add new stock</h4>
            {/* Form is evil !!! */}
            {/* <form id="add-new-stock-form" className="input-group"> */}
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

                <button className="submit-btn"
                  onClick={onAdd}
                  >Add</button>

            {/* </form> */}
        </div>
    );
}

export default AddWatch;