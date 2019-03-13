import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { withRouter } from "react-router-dom";
import { List, Typography } from "@material-ui/core";
import Player from "./Player";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const Container = styled(BaseContainer)`
  margin-top: 20px;
  color: white;
  text-align: center;
  min-width: 300px;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null
    };
  }

  logout() {
    fetch(`${getDomain()}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: localStorage.getItem("token")
      })
    })
      .then(response => {
        if (response.status === 204) {
          localStorage.removeItem("token");
          this.props.history.push("/login");
        } else {
          alert(response.message);
        }
      })
      .catch(err => {
        if (err.message.match(/Failed to fetch/)) {
          alert("The server cannot be reached. Did you start it?");
        } else {
          alert(`Something went wrong during the logout: ${err.message}`);
        }
      });
  }

  componentDidMount() {
    const authHeaders = new Headers();
    authHeaders.append("Content-Type", "application/json");
    authHeaders.append("token", localStorage.getItem("token"));
    fetch(`${getDomain()}/users`, {
      method: "GET",
      headers: authHeaders
    })
      .then(response => response.json())
      .then(async users => {
        // delays continuous execution of an async operation for 0.8 seconds.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        await new Promise(resolve => setTimeout(resolve, 800));

        this.setState({ users });
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });
  }

  render() {
    return (
      <Container>
        <Typography variant="h4">Userlist</Typography>
        {!this.state.users ? (
          <CircularProgress />
        ) : (
          <div>
            <Users>
              <List>
                {this.state.users.map(user => {
                  return <Player user={user} key={user.id} />;
                })}
              </List>
            </Users>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              width="100%"
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Game);
