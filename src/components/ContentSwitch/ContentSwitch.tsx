import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import Community from "../Community/Community";
import Administration from "../Administration/Administration";
import AdvertisementsPage from "../Advertisements/AdvertisementsPage/AdvertisementsPage";
import Settings from "../Settings/Settings";
import Chat from "../Chat/Chat";
import PrivateGroups from "../PrivateGroups/PrivateGroups";
import { PrivateGroupsProvider } from "../PrivateGroups/context";

interface OwnProps {}

type Props = OwnProps;

const ContentSwitch: FunctionComponent<Props> = (props) => {
  return (
    <Container className="w-50 m-auto">
      <Switch>
        <Route path="/community">
          <Community />
        </Route>
        <Route path="/administration">
          <Administration />
        </Route>
        <Route path="/advertisements">
          <AdvertisementsPage />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/groups">
          <PrivateGroupsProvider>
            <PrivateGroups />
          </PrivateGroupsProvider>
        </Route>
      </Switch>
    </Container>
  );
};

export default ContentSwitch;
