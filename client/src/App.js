import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Titlebar       from './components/Titlebar';
import Home           from './pages/Home';
import NotFound       from './pages/NotFound';
import Login          from './pages/Login';
import Admin          from './pages/Admin';
import Stocks         from './pages/Stocks';

function App() {
  return (
    <Router>
      <div className="App">
        <Titlebar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path= "/login">
              <Login />
            </Route>
            <Route path= "/admin/:clientID">
              <Admin/>
            </Route>
            <Route path= "/stocks/:clientID">
              <Admin/>
            </Route>


            {/* 
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
