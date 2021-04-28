import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import { SetUserContext, UserContext } from "./components/Login/UserContext";
import ContentSwitch from "./components/ContentSwitch/ContentSwitch";
import Navbar from "./components/Navbar/Navbar";
import { IUser } from "./components/Login/IUser";
import { ToastProvider } from "react-toast-notifications";

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    } else {
      setUser(null);
    }
  }, [setUser]);

  if (user) {
    return (
      <SetUserContext.Provider value={setUser}>
        <UserContext.Provider value={user}>
          <ToastProvider>
            <Router>
              <Navbar />
              <ContentSwitch />
            </Router>
          </ToastProvider>
        </UserContext.Provider>
      </SetUserContext.Provider>
    );
  } else {
    return <LoginPage setUser={setUser} />;
  }
}

export default App;
