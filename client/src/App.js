import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Titlebar from './components/Titlebar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import SignUpPage from './pages/SignUpPage';
import ModifyClientPage from './pages/ModifyClientPage';
import Admin from './pages/Admin';
import Setting from './pages/Setting';
import Stocks from './pages/Stocks';
import StocksHistory from './pages/StocksHistory';
import TransferMoney from './pages/TransferMoney';

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
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUpPage />
            </Route>
            <Route path="/modifyClient/:id">
              <ModifyClientPage/>
              </Route>
            <Route path="/transferMoney/:id">
              <TransferMoney/>
              </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/setting">
              <Setting />
            </Route>
            <Route path="/stocks/:id">
              <Stocks />
            </Route>
            <Route path="/stocksHistory">
              <StocksHistory/>
            </Route>


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
