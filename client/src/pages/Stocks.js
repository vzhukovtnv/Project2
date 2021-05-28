import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'

import Navbar from "../components/Navbar"
import Watch from "../components/Watch"
const Stocks = () => {
    const param = useParams()
    const [id, setId] = useState(param.id);
    // ####### don't use setId
    const [mData,setMData] = useState();
   
    let timer;

    function setTimer() {
        timer = setInterval(frame, 500);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    async function frame() {
        //alert("Frame")
        let url = '/stocks/' + id;
        try {
            let response = await fetch(url);
            if (response.ok) {
                //  ########     alert(" OK"); Called twice !
                let data = await response.json();
                const newCounter = data.counter + data.direction;
                console.log(data.counter, data.direction, newCounter)

                try {
                    url += '/counter';
                    //alert('url='+ url);
                    let response = await fetch(url, {
                        method: "PATCH",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({counter:newCounter})
                    });
                    if (response.ok) {
                                    //   alert(" OK");

                        let dataArray = [1, newCounter, 4];
                        setMData({ id, data: { dataArray } });           
                    } else {
                        alert(await response.text() +" 1" );
                        //## Fetch error here
                        //## How stop the timer when component is unmonded?     

                    }
        
                } catch (error) {
                    alert(error.message+" 2");
                }

            } else {
                alert(await response.text()+" 3");
            }           
        } catch (error) {
            alert(error.message+" 4");
        }
    }
    

     useEffect( () => {
       setTimer();
        return() =>{
        stopTimer();
       }  ;
     },[])



    return (
        <div>
            <Navbar pageName="Stocks" id={id} />
            <div>
                <h1>{"Stocks - " + id}</h1>
                {mData && <Watch wData={mData}/> }
            </div>
        </div>
    );
}

export default Stocks;
