import React from "react";
import { getDomain } from "../../helpers/getDomain";
import { withRouter } from "react-router-dom";
import { CardContent, TextField, Typography } from "@material-ui/core";
import Lock from "@material-ui/icons/Lock";
import NavLink from "react-router-dom/es/NavLink";
import { LoginCard, TitleContainer } from "./SharedElements";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: null,
      username: null,
      password: null,
      passwordRep: null,
      birthDate: null
    };
  }

  /**
   *  Send data to backend
   */
  register() {
    fetch(`${getDomain()}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        name: this.state.name,
        password: this.state.password,
        birthDate: this.state.birthDate
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.status > 299) {
          alert(response.message);
        } else {
          this.props.history.push(`/login`);
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

  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  render() {
    return (
      <LoginCard>
        <CardContent>
          <TitleContainer>
            <Lock style={{ fontSize: 40 }} />
            <Typography variant="h4"> Register</Typography>
          </TitleContainer>
          <TextField
            margin="normal"
            label="Name"
            fullWidth
            onChange={e => {
              this.handleInputChange("name", e.target.value);
            }}
          />
          <TextField
            margin="normal"
            label="Username"
            fullWidth
            onChange={e => {
              this.handleInputChange("username", e.target.value);
            }}
          />
          <TextField
            margin="normal"
            label="BirthDate"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            onChange={e => {
              this.handleInputChange("birthDate", e.target.value);
            }}
          />
          <TextField
            type="password"
            label="Password"
            fullWidth
            onChange={e => {
              this.handleInputChange("password", e.target.value);
            }}
          />
          <TextField
            type="password"
            label="Password"
            fullWidth
            onChange={e => {
              this.handleInputChange("passwordRep", e.target.value);
            }}
          />
          <Button
            style={{ marginTop: 20 }}
            fullWidth
            variant="contained"
            color="primary"
            margin="normal"
            disabled={
              !this.state.username ||
              !this.state.name ||
              this.state.password !== this.state.passwordRep ||
              this.state.passwordRep == null
            }
            width="50%"
            onClick={() => {
              this.register();
            }}
          >
            Sign up
          </Button>
          <Typography style={{ marginTop: 20 }} variant="subtitle1">
            Already have an Account?{" "}
            <Link component={NavLink} to={"/login"}>
              Login
            </Link>
          </Typography>
        </CardContent>
      </LoginCard>
    );
  }
}

export default withRouter(Register);
