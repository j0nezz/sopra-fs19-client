import React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { Typography, withStyles } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { withRouter } from "react-router-dom";

const OnlineBadge = withStyles(() => ({
  badge: { backgroundColor: "#4caf50" }
}))(Badge);

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
class Player extends React.Component {
  redirect(id) {
    this.props.history.push(`/profile/${id}`);
  }

  render() {
    const { user } = this.props;

    return (
      <React.Fragment>
        <ListItem
          button
          onClick={() => {
            this.redirect(user.id);
          }}
        >
          {user.status === "ONLINE" ? (
            <OnlineBadge color="primary" variant="dot">
              <Avatar>
                <AccountCircle
                  color={
                    parseInt(user.id) ===
                    parseInt(localStorage.getItem("userId"))
                      ? "primary"
                      : "inherit"
                  }
                />
              </Avatar>
            </OnlineBadge>
          ) : (
            <Avatar>
              <AccountCircle />
            </Avatar>
          )}

          <ListItemText primary={user.name} secondary={user.username} />
          <ListItemSecondaryAction>
            <Typography variant="body1">{user.id}</Typography>
          </ListItemSecondaryAction>
        </ListItem>
      </React.Fragment>
    );
  }
}

export default withRouter(Player);
