import React, { Component } from 'react';
import Home from "./components/Home/Home";
import Clientes from "./components/Clientes/Clientes";
import NotFound from "./components/NotFound/NotFound";

import { BrowserRouter, Switch, Route } from 'react-router-dom';


class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/clientes" component={Clientes} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
