import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'

import Navbar from "../components/Navbar"
import Watch from "../components/Watch"
import Portfolio from "../components/Portfolio"
import AddWatch from "../components/AddWatch"
import useFetch from "../utils/useFetch"

const Stocks = () => {
    const { id } = useParams();

    const [isPending, setIsPending] = useState();
    const [errorMessage, setError] = useState();
    const [portfolioObj, setPortfolioObj] = useState();
    const [lastData, setLastData] = useState();


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

    useEffect(() => {
        const getDataFirstTime = async () => {
            if (!id) return;
            const { data, message } = await getData();
            if (data == null) {
                setError(message);
            } else {
                setError("");
                setPortfolioObj(data.portfolioObj);
                setLastData(data.lastData);

            }
        };
        getDataFirstTime();
    }, [id])

    function createWatch(symbol) {
        let t = JSON.parse(JSON.stringify(lastData));
        t.push({ symbol, amount: 0, balance: 0, lastDate: "", open: 0, high: 0, low: 0, close: 0, volume: 0, name: "", sector: "", industry: "", exchange: "" });
        setLastData(t);
        return
    }

    function removeWach(symbol) {
        let t = JSON.parse(JSON.stringify(lastData));
        for (let i = 0; i < t.length; i++) {
            if (t[i].symbol === symbol) {
                //alert(i.toString()+ t[i].symbol); 
                t.splice(i,1);
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
                if (buyAction ) {
                    t.portfolioArray[i].amount += amount;
                    t.balance -= balanceChange;
                } else {
                    if (t.portfolioArray[i].amount > amount) {
                        t.portfolioArray[i].amount -= amount;
                    } else {
                        t.portfolioArray.splice(i,1);
                    }
                    t.balance += balanceChange;
                }
                setPortfolioObj(t);
                return
            }
        }
        if (buyAction){
            t.balance -= balanceChange;
            t.portfolioArray.push({ symbol, amount, price });
            setPortfolioObj(t);
        }
    }

    let buySellAction = async function (buyAction, symbol, price, amount) {
        //alert(symbol + " " + price.toString() + " " + amount.toString())
        modifyPortfolio(buyAction, symbol, price, amount); return;
        const url = "/api/stocks/" + id + "/portfolio";
        const action = { operation: (buyAction ? "buy" : "sell"), symbol, amount, price }

        try {
            let response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(action)
            });
            if (response.ok) {
                // setError(null);
            } else {
                setError(await response.text());
            }

        } catch (error) {
            setError(error.message);
        }
    }



    let closeAction = async function (symbol) {
        // alert(sumbol )
        removeWach(symbol); return;
        const url = "/api/stocks/" + id + "/watch";
        const action = { operation: "takeAway", symbol }

        try {
            let response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(action)
            });
            if (response.ok) {
                //removeWach(symbol);
            } else {
                setError(await response.text());
            }

        } catch (error) {
            setError(error.message);
        }
    }

    async function getData() {
        setIsPending(true);
        const url = "/api/stocks/" + id + "/false";
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


    return (
        <div>
            <Navbar pageName="Stocks" id={id} />
            <div>
                <h1>{"Stocks - " + id}</h1>
                {isPending && <h4 className="small-green-box"> </h4>}
                <table>
                    <tr>
                        <td>
                            <div>
                                <AddWatch 
                                    id={id}
                                    createWatch={createWatch} />
                                {portfolioObj &&
                                    <Portfolio portfolioObj={portfolioObj} />
                                }
                            </div>
                        </td>
                        <td>
                            <div>
                                {lastData &&
                                    lastData.map((stock) => {
                                        return (
                                            <Watch
                                                stock={stock}
                                                buySellAction={buySellAction}
                                                closeAction={closeAction}

                                            />
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