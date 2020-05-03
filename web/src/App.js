import React from "react";
import "./App.scss";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Me from "./pages/Me";
import OrgSignup from "./pages/OrgSignup";
import OrgLogin from "./pages/OrgLogin";
import OrgMe from "./pages/OrgMe";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/org/signup" exact component={OrgSignup} />
        <Route path="/org/login" exact component={OrgLogin} />
        <Route path="/me" exact component={Me} />
        <Route path="/org/me" exact component={OrgMe} />
        <Route path="/" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
