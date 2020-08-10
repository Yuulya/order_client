import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import {OrderList} from "./pages/orders/orders-list";

// es6
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <Switch>
        <Route path='/orders-list' component={OrderList} />
      </Switch>
  );
}

export default App;
