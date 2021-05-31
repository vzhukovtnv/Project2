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
import React from 'react';

function App() {
  return (
    
    <Router>
      {/* <Container></Container> */}
      {/* <div className="App"> */}
      {/* <Stocks></Stocks> */}
    {/* </div> */}
    
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
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/setting">
              <Setting />
            </Route>

            <Route path="/stocks/:id">
              <Stocks />
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
