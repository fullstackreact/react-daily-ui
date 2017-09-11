import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Route,
  NavLink,
  Switch,
  Redirect
} from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home";
import About from "./pages/About";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <nav>
        <ul className="navigation">
          <li><NavLink to="/">Home</NavLink></li>
          <li>
            <NavLink to="/about-us">Old About Us Page (will redirect)</NavLink>
          </li>
          <li><NavLink to="/about">About Us</NavLink></li>
          <li><NavLink to="/not-found">Invalid Page</NavLink></li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Redirect from="/about-us" to="/about" />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
