import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { PushSpinner } from "react-spinners-kit";



import Navbar from "../components/Navbar"
import Watch from "../components/Watch"
import Portfolio from "../components/Portfolio"
import AddWatch from "../components/AddWatch"
//import useFetch from "../utils/useFetch"

const Stocks = () => {
    const { id } = useParams();

    const [isPending, setIsPending] = useState();
    const [errorMessage, setError] = useState();
    const [portfolioObj, setPortfolioObj] = useState();
    const [lastData, setLastData] = useState();
    const [fullData, setFullData] = useState();
//    const [timerInterval, setTimerInterval] = useState(0);
    
    // let lastData = [
    //     { symbol: "AMD", amount: 100, balance: 9010, lastDate: "2021-05-27 20:00:00", open: 78.34, high: 78.42, low: 78.34, close: 78.42, volume: 13348, name: "Advanced Micro Devices, Inc", sector: "Technology", industry: "Semiconductors", exchange: "NASDAQ" },
    //     { symbol: "INTC", amount: 0, balance: 9010, lastDate: "2021-05-27 20:00:00", open: 57.85, high: 57.8899, low: 57.77, close: 57.77, volume: 5789, name: "Intel Corporation", sector: "Technology", industry: "Semiconductors", exchange: "NASDAQ" }]

    // let portfolioObj = {
    //     balance: 9010, totalSum: 20446.010000000002,
    //     portfolioArray: [
    //         { symbol: "AMD", amount: 100, price: 78.42 },
    //         { symbol: "ZZZ", amount: 20 },
    //         { symbol: "AAPL", amount: 100, price: 126.0401 }]
    // };

    // Actions

    let timer = null;
    let timerInterval = 0
    let semafor = false;
    let missedDataRenew = false;

    function setTimer() {
        if (timerInterval > 0) {
            timer = setInterval(GetDataAndMore, timerInterval);
  //          alert("timer set 1")
        }
    }

    function stopTimer() {
        if (timer) {
            clearInterval(timer);
//          alert("timer stopped")
        }
    }


    useEffect(() => {
        const getDataFirstTime = async () => {
            // alert("Useeffect " +( typeof id) +" "+id);
            if (!id) return;

            await GetDataAndMore();
            if (timerInterval === 0) {
                timerInterval = await GetTimerInterval();
  //            alert("timer set 0")
  //              alert(timerInterval)
                if (timerInterval >0){
                    setTimer();        
                }
            }
            // const { data, message } = await getData();
            // if (data == null) {
            //     setError(message);
            // } else {
            //     setError("");
            //     setPortfolioObj(data.portfolioObj);
            //     setLastData(data.lastData);
            // }
         
        };
        getDataFirstTime();
        return () => {
            stopTimer();
       }
    }, [])

    async function GetTimerInterval() {
        const url = "/api/stocks/timeInterval";

        try {
            let response = await fetch(url);
            if (!response.ok) { // error coming back from server                
               return -1;
            }
            let data = await response.json();
            if (data) {
                return 60000 * data.timeInterval;
                //alert('data.timeInterval='+ data.timeInterval.toString())               
            }

        } catch (error) {

        }
        return -1;
    }

    function createWatch(symbol) {
        let t = JSON.parse(JSON.stringify(lastData));
        t.push({ symbol, amount: 0, balance: 0, lastDate: "", open: 0, high: 0, low: 0, close: 0, volume: 0, name: "", sector: "", industry: "", exchange: "" });
        setLastData(t);
        GetDataAndMore(false);
        return
    }

    function removeWach(symbol) {
        let t = JSON.parse(JSON.stringify(lastData));
        for (let i = 0; i < t.length; i++) {
            if (t[i].symbol === symbol) {
                //alert(i.toString()+ t[i].symbol); 
                t.splice(i, 1);
                setLastData(t);
                //alert(t[i].symbol);
                return
            }
        }
    }

    function modifyPortfolio(buyAction, symbol, price, amount) {
        //alert(buyAction+" "+symbol)
        let t = JSON.parse(JSON.stringify(portfolioObj));
        const balanceChange = Math.round(amount * price);

        for (let i = 0; i < t.portfolioArray.length; i++) {
            if (t.portfolioArray[i].symbol === symbol) {
                if (buyAction) {
                    t.portfolioArray[i].amount += amount;
                    t.balance -= balanceChange;
                } else {
                    if (t.portfolioArray[i].amount > amount) {
                        t.portfolioArray[i].amount -= amount;
                    } else {
                        t.portfolioArray.splice(i, 1);
                    }
                    t.balance += balanceChange;
                }
                setPortfolioObj(t);
                return
            }
        }
        if (buyAction) {
            t.balance -= balanceChange;
            t.portfolioArray.push({ symbol, amount, price });
            setPortfolioObj(t);
        }
    }

    let buySellAction = async function (buyAction, symbol, price, amount) {
        //     alert(symbol + " " + price.toString() + " " + amount.toString())
        modifyPortfolio(buyAction, symbol, price, amount);
        const url = "/api/stocks/" + id + "/portfolio";
        const action = { operation: (buyAction ? "buy" : "sell"), symbol, amount, price }

        try {
            let response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(action)
            });
            if (response.ok) {
                setError(null);
                GetDataAndMore(false);
            } else {
                setError(await response.text());
            }

        } catch (error) {
            setError(error.message);
        }
    }



    let closeAction = async function (symbol) {
        // alert(sumbol )
        removeWach(symbol);
        const url = "/api/stocks/" + id + "/watch";
        const action = { operation: "takeAway", symbol }

        try {
            let response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(action)
            });
            if (response.ok) {
                setError(null);
                //removeWach(symbol);
            } else {
                setError(await response.text());
            }

        } catch (error) {
            setError(error.message);
        }
    }

    async function GetDataAndMore(calledByTimer = true) {
        if (!semafor) { // Check if already running
            semafor = true;
            do {
                missedDataRenew = false;
                const { data, message } = await getData();
                if (data == null) {
                    setError(message);
                } else {
                    setError("");
                    setPortfolioObj(data.portfolioObj);
                    setLastData(data.lastData);
                    setFullData(data.fullData);
                }
            } while (missedDataRenew)
            semafor = false;
        } else {
            if (!calledByTimer) {
                // if renew, required but is not possible
                missedDataRenew = true;
            }
        }
    }


    async function getData() {
        setIsPending(true);
        const url = "/api/stocks/" + id + "/true";
        try {
            let response = await fetch(url);
            if (!response.ok) { // error coming back from server
                setIsPending(false);
                return { data: null, message: url + " Server error 1" };
            }
            let data = await response.json();
            setIsPending(false);
            if (data) {
                return { data, message: "" };
            }
            return { data: null, message: "Server error 2" };

        } catch (error) {
            setIsPending(false);
            return { data: null, message: error.message };
        }
    }

    function getLastDataElement(symbol) {
        if (!fullData) {
            alert("No full data");
            return null;
        }
        for (const iterator of fullData) {
            if (iterator.symbol === symbol) {
                return iterator;
            }
        }
        return null;
    }

    return (
        <div>
            <Navbar pageName="Stocks" id={id} />
            <div>
                <table>
                    <tr>
                        <td className="portfolio">
                            <div>
                                <AddWatch
                                    createWatch={createWatch}
                                    id={id}
                                />
                                <hr></hr>
                                {portfolioObj &&
                                    <Portfolio portfolioObj={portfolioObj} />
                                }
                                {/* <h1>{"Stocks - " + id}</h1> */}
                                {/* {isPending && <h4 className="small-green-box"> </h4>} */}
                                {<PushSpinner size={30} color="#686769" loading={isPending} />}
                            </div>
                        </td>
                        <td className="stocks">
                            <div>
                                {lastData && fullData &&
                                    lastData.map((stock) => {
                                        return (
                                            <div>
                                                <Watch
                                                    stock={stock}
                                                    fullElement={getLastDataElement(stock.symbol)}
                                                    buySellAction={buySellAction}
                                                    closeAction={closeAction}

                                                />
                                            </div>
                                        )
                                    })}
                            </div>
                        </td>
                    </tr>
                </table>

            </div>
            {errorMessage && <h3>{errorMessage}</h3>}
        </div>
    );
}

export default Stocks;