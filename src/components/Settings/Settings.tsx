import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { UserContext } from "../Login/UserContext";
import SettingsAccountNickname from "./Account/Nickname/SettingsAccountNickname";
import SettingsAccountPassword from "./Account/Password/SettingsAccountPassword";

const Settings = () => {
  const user = useContext(UserContext);
  const [isChangingNick, setIsChangingNick] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);

useEffect(() => {}, [user])

  return (
    <Card className="mt-3">
      <Card.Title className="text-center mb-1 mt-2">
        <h2>Account Settings</h2>
      </Card.Title>
      {!isChangingNick && !isChangingPass && (
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div className="text-muted">
              <u>
                <b>Login</b>
              </u>
            </div>
            <div className="d-flex text-row">
              <div className="text-muted mr-2">{user?.login}</div>
              <Card.Link href="#" onClick={() => setIsChangingNick(!isChangingNick)}>
                Edit
              </Card.Link>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="text-muted">
              <u>
                <b>Password</b>
              </u>
            </div>
            <div className="d-flex text-row">
              <div className="text-muted mr-2">{Array(user?.password.length! + 1).join("*")}</div>
              <Card.Link href="#" onClick={() => setIsChangingPass(!isChangingPass)}>
                Edit
              </Card.Link>
            </div>
          </div>
        </Card.Body>
      )}
      {isChangingNick && <SettingsAccountNickname closeNicknameChange={() => setIsChangingNick(false)} />}
      {isChangingPass && <SettingsAccountPassword closePasswordChange={() => setIsChangingPass(false)} />}
    </Card>
  );
};

export default Settings;
