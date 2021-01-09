import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import { UserContext } from "./components/Login/UserContext";
import ContentSwitch from "./components/ContentSwitch/ContentSwitch";
import Navbar from "./components/Navbar/Navbar";
import { IUser } from "./components/Login/IUser";

function App() {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    } else {
      setUser(null);
    }
  }, [setUser]);

  if (user) {
    return (
      <UserContext.Provider value={user}>
        <Router>
          <Navbar />
          <ContentSwitch />
        </Router>
      </UserContext.Provider>
    );
  } else {
    return <LoginPage setUser={setUser} />;
  }
}

export default App;
