import React from 'react';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron } from 'react-bootstrap';

import Navbar from "../components/Navbar"

class Stocks extends React.Component{
    constructor(props){
        super(props);
        this.state={
            stockChartXValues:[],
            stockChartYValues:[],
            stockSymbol: 'AMZN',
            // message: 'Getting data'
        }
    }
    componentDidMount(){
        this.fetchStock();
    }

    fetchStock(){
        const pointerToThis = this;                               
        const API_KEY = 'A7XG9Y8KUJI9WAWZ';
        let API_Call=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${this.state.stockSymbol}&outputsize=compact&apikey=${API_KEY}`;
        // this.state.message = 'getting Data';
        // pointerToThis.setState({message: 'Getting Data'})
        // this.setState({message: 'Getting Data'});
        let stockChartXValuesFunction =[];
        let stockChartYValuesFunction =[];
        fetch(API_Call)
        .then(
            function(response){
                return response.json();
            }
        )
        .then( 
            function(data){
                // pointerToThis.setState({message: 'Done getting data'})
                // console.log(data);
                for (var key in data ['Time Series (Daily)']){
                    stockChartXValuesFunction.push(key);
                    stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
               }
               pointerToThis.setState({
                   stockChartXValues: stockChartXValuesFunction,
                   stockChartYValues: stockChartYValuesFunction
               });
            }
        )
    }

    handleStockSymbolChange = (v) => {
        this.setState({stockSymbol: v.target.value});
        this.fetchStock();
    }


render(){
    return(
    <div className="container-fluid">
        <Navbar pageName="StocksHistory" />

        {/* <Container> */}
            <h1> Stock</h1>
            <div className="row">
                <div className="col-8">
                    <Plot 
                    data={[
                        {
                            x: this.state.stockChartXValues,
                            y: this.state.stockChartYValues,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'blue'},
                        }
                    ]}
                    layout={{width: 720, height: 440, title: `${this.state.stockSymbol} Chart`}}
                    />
                </div>
                <div className="col-4">
                <Jumbotron>
                    <input className="form-control" name="stockSymbol" type="text" value={this.state.stockSymbol} onChange={this.handleStockSymbolChange}/>    
                    {this.state.message}
                    </Jumbotron>
                </div>
            </div>
            
        {/* </Container> */}
        
        
    </div>
)}
}
 export default Stocks;