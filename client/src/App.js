import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// import Navbar         from './components/Navbar';
// import Home           from './components/Home';
// import Create         from './components/Create';
// import ClientDetails  from './components/ClientDetails';
// import TransferMoney  from './components/TransferMoney';
import NotFound       from './components/NotFound';
import Login          from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <div className="content">
          <Switch>
            <Route path= "/client/login">
              <Login />
            </Route>
            {/* <Route exact path="/">
              <h1>Hello Storks !</h1>
            </Route>
            <Route path="/clients/create">
              <Create />
            </Route>
            <Route path="/clients/transferMoney/:id">
              <TransferMoney />
            </Route>
            <Route path="/clients/:id">
              <ClientDetails />
            </Route>
            <Route  path="/clients">
              <Home />
            </Route> */}
            
            
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
