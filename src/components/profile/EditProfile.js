import React, { Component } from "react";
import User from "../shared/models/User";
import { getDomain } from "../../helpers/getDomain";
import { TitleContainer } from "../authentication/SharedElements";
import { AccountCircle, ChevronLeft } from "@material-ui/icons";
import { List, ListItem, TextField, Typography } from "@material-ui/core";
import { OnlineBadge, StyledCard } from "./SharedProfileElements";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CardContent from "@material-ui/core/CardContent";
import { withRouter } from "react-router-dom";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      user: new User(),
      username: "",
      birthdate: new Date(0)
    };
  }
  componentDidMount() {
    /**
     * Fetch user data of current user profile
     */
    const authHeaders = new Headers();
    authHeaders.append("Content-Type", "application/json");
    authHeaders.append("token", localStorage.getItem("token"));

    const userId = localStorage.getItem("userId");
    fetch(`${getDomain()}/users/${userId}`, {
      method: "GET",
      headers: authHeaders
    })
      .then(response => response.json())
      .then(returnedUser => {
        this.setState({
          user: new User(returnedUser),
          username: returnedUser.username,
          birthdate: returnedUser.birthDate.split("T")[0]
        });
      })
      .catch(err => {
        if (err.message.match(/Failed to fetch/)) {
          alert("The server cannot be reached. Did you start it?");
        } else {
          alert(`Something went wrong during the login: ${err.message}`);
        }
      });
  }
  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  /**
   * send request to update Profile
   */
  editProfile() {
    const authHeaders = new Headers();
    authHeaders.append("Content-Type", "application/json");
    authHeaders.append("token", localStorage.getItem("token"));
    fetch(`${getDomain()}/users/${this.state.user.id}`, {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify({
        id: this.state.user.id,
        username: this.state.username,
        birthDate: this.state.birthdate
      })
    })
      .then(response => {
        if (response.status === 204) {
          this.props.history.push(`/profile/${this.state.user.id}`);
        } else {
          alert(response.message);
        }
      })
      .catch(err => {
        if (err.message.match(/Failed to fetch/)) {
          alert("The server cannot be reached. Did you start it?");
        } else {
          alert(`Something went wrong during the login: ${err.message}`);
        }
      });
  }

  render() {
    const { user } = this.state;
    return (
      <StyledCard>
        <CardContent>
          <TitleContainer>
            <Button>
              <ChevronLeft onClick={() => this.props.history.push("/")} />
            </Button>
            <Typography variant="h6">Edit user</Typography>
          </TitleContainer>
          <List>
            <ListItem>
              {user.status === "ONLINE" ? (
                <OnlineBadge color="primary" variant="dot">
                  <Avatar>
                    <AccountCircle />
                  </Avatar>
                </OnlineBadge>
              ) : (
                <Avatar>
                  <AccountCircle />
                </Avatar>
              )}
              <ListItemText primary={user.name} secondary={user.username} />
            </ListItem>
            <ListItem>
              <TextField
                type="text"
                margin="normal"
                value={this.state.username}
                label="New Username"
                InputLabelProps={{
                  shrink: true
                }}
                fullWidth
                onChange={e => {
                  this.handleInputChange("username", e.target.value);
                }}
              />
            </ListItem>
            <ListItem>
              <TextField
                type="date"
                label="New Birthdate"
                value={this.state.birthdate}
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                onChange={e => {
                  this.handleInputChange("birthdate", e.target.value);
                }}
              />
            </ListItem>
          </List>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            margin="normal"
            disabled={!this.state.username || !this.state.birthdate}
            width="50%"
            onClick={() => {
              this.editProfile();
            }}
          >
            Update Profile
          </Button>
        </CardContent>
      </StyledCard>
    );
  }
}

export default withRouter(EditProfile);
