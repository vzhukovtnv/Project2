import { useState, useEffect } from "react";
import Plot from 'react-plotly.js';



const Watch = ({ stock, fullElement, buySellAction, closeAction }) => {
    const [lastData, setLastData] = useState();
    //   const [fullData, setFullData] = useState(props.fullData);

    const [arrowBottom, setArrowBottom] = useState(true);
    const [buyAmount, setBuyAmount] = useState();
    const [sellAmount, setSellAmount] = useState();

    const [stockChartXValues, setStockChartXValues] = useState([]);
    const [stockChartYValues, setStockChartYValues] = useState([]);
    //let  stockChartXValues =[1, 2, 3, 4, 5, 6];
    //let  stockChartYValues =[2, 3, 4, 5, 3, 1];



    useEffect(() => {
        const wachChange = async () => {
            setLastData(stock);
            setChartValues();
            if (stock && stock.close) {
                if (stock.amount) {
                    setSellAmount(stock.amount);
                }
                setBuyAmount(stock.close > 0 ? Math.floor((stock.balance / stock.close)) : 0);
            }
            setArrowBottom(true);
        };
        wachChange();
    }, [stock, fullElement]);

    function setChartValues() {
        if (!fullElement || !fullElement.data ) {
 //           alert("No fulldata for "+ stock.symbol)
            setStockChartXValues([]);
            setStockChartYValues([]);
            return
        } else {
            const xArray =[];
            const yArray =[];
            for (const iterator of fullElement.data) {
                xArray.push(iterator.dateS);
                yArray.push(iterator.close);
            }
            setStockChartXValues(xArray);
            setStockChartYValues(yArray);

        }
    }
    function topBottomEvent() {
        setArrowBottom(!arrowBottom);
    }

    function buyClick() {
        //alert(buyAmount);

        if (lastData.close * buyAmount > lastData.balance) {
            alert("You can't buy more then " + Math.floor((lastData.balance / lastData.close)).toString() + " stocks");
            return;
        }
        buySellAction(true, lastData.symbol, lastData.close, buyAmount);
    }

    function sellClick() {
        //alert(sellAmount.toString());

        if (sellAmount > lastData.amount) {
            alert("You can't sell more then " + (lastData.amount).toString() + " stocks")
            return;
        }
        buySellAction(false, lastData.symbol, lastData.close, sellAmount);
    }

    function onClose() {
        // alert("Close "+lastData.symbol)   
        closeAction(lastData.symbol);
    }


    return (
        <div >
            <div className="watch-element">

                <input type="image" src="/images/close.png" className="close-button-small" onClick={onClose}></input>
                {/* <h3>Watch Element</h3> */}
                {lastData &&
                    <table>
                        <tr>
                            <td>
                                <table>

                                    <tr>
                                        <td>Symbol:</td>
                                        <td>{lastData.symbol}</td>
                                    </tr>
                                    <tr>
                                        <td>Exchange:</td>
                                        <td>{lastData.exchange}</td>
                                    </tr>
                                    <tr>
                                        <td>Date:</td>
                                        <td>{lastData.lastDate}</td>
                                    </tr>

                                    <tr>
                                        <td>Open:</td>
                                        <td>{lastData.open}</td>
                                    </tr>
                                    <tr>
                                        <td>High:</td>
                                        <td>{lastData.high}</td>
                                    </tr>
                                    <tr>
                                        <td>Low:</td>
                                        <td>{lastData.low}</td>
                                    </tr>
                                    <tr>
                                        <td>Close:</td>
                                        <td>{lastData.close}</td>
                                    </tr>
                                    <tr>
                                        <td>Volume:</td>
                                        <td>{lastData.volume}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">{lastData.name + "; " + lastData.sector + "; " + lastData.industry}</td>
                                    </tr>

                                </table>
                            </td>
                            <td>
                                <Plot
                                    data={[
                                        {
                                            x: stockChartXValues,
                                            y: stockChartYValues,
                                            type: 'scatter',
                                            mode: 'lines+markers',
                                            marker: { color: 'blue' },
                                        }
                                    ]}
                                    layout={{ width: 680, height: 340, title: `` }}
                                />
                            </td>
                        </tr>

                    </table>

                }
                <div className="top-bottom-div">
                    <input type="image"
                        alt=""
                        src={arrowBottom ? "/images/arrowbottom.png" : "/images/arrortop.png"}
                        className="top-bottom-arrow-button"
                        onClick={() => topBottomEvent()}>
                    </input>
                </div>
                {/* && lastData.close > 0  */}
                {!arrowBottom && lastData.close && lastData.close > 0 && <div>
                    <label for="buyAmount">Buy Amount:</label>
                    <input type="number"
                        name="buyAmount"
                        id="buyAmount"
                        required
                        min="0"
                        value={buyAmount}
                        onChange={(e) => setBuyAmount(parseInt(e.target.value))}
                    />
                    <button type="button" onClick={buyClick}>Buy</button>

                    {(lastData.amount > 0) && <span className="sell-amount-group">
                        <label for="sellAmount">Sell Amount:</label>
                        <input type="number"
                            name="sellAmount"
                            id="sellAmount"
                            required
                            min="0"
                            value={sellAmount}
                            onChange={(e) => setSellAmount(parseInt(e.target.value))}
                        />
                        <button type="button" onClick={sellClick}>Sell</button>
                    </span>
                    }
                </div>
                }
            </div>

        </div>

    );
}

export default Watch;