import { useParams } from 'react-router-dom'


import Navbar from "../components/Navbar"
const Stocks = () => {
    const {id} = useParams()
    return (
        <div> 
            <Navbar pageName="Stocks" id={id} /> 
            <div>  
                <h1>{"Stocks - "+ id}</h1>
             </div>     
       </div>
    );
}

export default Stocks;
