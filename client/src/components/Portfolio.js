import { useState,useEffect } from "react";

const Portfolio = ({ portfolioObj }) => {
    const [portfolio, setPortfolio] = useState();

    useEffect( () => {
        const portfolioChange  = async () => {
            setPortfolio(portfolioObj);
        };
        portfolioChange();
    }, [portfolioObj]);

   //alert("portfolio call");
    return (
        <div>
            <h3>Portfolio</h3>
            { portfolio &&
                <table>
                    <tr>
                        <th>Symbol</th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th>Overall</th>
                    </tr>
                    {portfolio.portfolioArray.map((stock, index) => {
                        let price;
                        let sumStock;
                        if ('price' in stock) {
                            price = stock.price;
                            sumStock = price * stock.amount;
                            sumStock = sumStock.toFixed(0);
                        } else {
                            price = '';
                            sumStock = '';
                        }
                        return (
                            <tr>
                                <td>{stock.symbol} </td>
                                <td>{stock.amount} </td>
                                <td >{price}</td>
                                <td>{sumStock} </td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td>Balance:</td>
                        <td></td>
                        <td></td>
                        <td colspan="3">{portfolio.balance} </td>

                    </tr>
                    <tr>
                        <td>Total:</td>
                        <td></td>
                        <td></td>
                        <td colspan="3">{portfolio.totalSum.toFixed(0)} </td>

                    </tr>

                </table>
            }
        </div>
    );
}

export default Portfolio;