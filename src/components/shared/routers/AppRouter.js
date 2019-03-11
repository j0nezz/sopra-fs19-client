import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../authentication/Login";
import Register from "../../authentication/Register";
import Profile from "../../profile/Profile";
import EditProfile from "../../profile/EditProfile";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/authentication"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /authentication renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
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
/*
 * Don't forget to export your component!
 */
export default AppRouter;
