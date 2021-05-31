import { useState, useEffect } from "react";

const Watch = ({ stock, buySellAction, closeAction }) => {
    const [lastData, setLastData] = useState();
    //   const [fullData, setFullData] = useState(props.fullData);

    const [arrowBottom, setArrowBottom] = useState(true);
    const [buyAmount, setBuyAmount] = useState(0);
    const [sellAmount, setSellAmount] = useState(0);


    useEffect(() => {
        const wachChange = async () => {
            setLastData(stock);
            if (stock) {
                setSellAmount(stock.amount);
                if (stock.close) {
                    setSellAmount(stock.close > 0 ? Math.floor((stock.balance / stock.close)) : 0);
                }
            }
            setArrowBottom(true);
        };
        wachChange();
    }, [stock]);


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