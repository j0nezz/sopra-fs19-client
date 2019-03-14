import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../authentication/Login";
import Register from "../../authentication/Register";
import Profile from "../../profile/Profile";
import EditProfile from "../../profile/EditProfile";

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <React.Fragment>
            <Route
              path="/game"
              render={() => (
                <GameGuard>
                  <GameRouter base={"/game"} />
                </GameGuard>
              )}
            />
            <Route
              path="/login"
              exact
              render={() => (
                <LoginGuard>
                  <Login />
                </LoginGuard>
              )}
            />
            <Route
              path="/profile/:userId"
              exact
              render={() => (
                <GameGuard>
                  <Profile />
                </GameGuard>
              )}
            />
            <Route
              path="/edit"
              exact
              render={() => (
                <GameGuard>
                  <EditProfile />
                </GameGuard>
              )}
            />
            <Route path="/register" exact render={() => <Register />} />

            <Route path="/" exact render={() => <Redirect to={"/game"} />} />
          </React.Fragment>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
