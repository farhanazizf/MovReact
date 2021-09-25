import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// import logo from './logo.svg';
import "./App.css";
import { storeRedux } from "./redux/redux";
import Home from "./pages/Home";
import MovieDetails from "./pages/Detail";

const App = () => {
  return (
    <Provider store={storeRedux}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/details/:id" component={MovieDetails} exact />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
