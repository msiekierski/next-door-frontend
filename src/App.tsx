import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Community from "./components/Community/Community";
import Administration from "./components/Administration/Administration";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Navigation />
      <Container className="w-50 m-auto">
        <Switch>
          <Route path="/community">
            <Community />
          </Route>
          <Route path="/administration">
            <Administration />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
