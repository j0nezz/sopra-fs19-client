import React from "react";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { CardContent, Divider, TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { LoginCard, TitleContainer } from "./SharedElements";
import Lock from "@material-ui/icons/Lock";
import NavLink from "react-router-dom/es/NavLink";
import Link from "@material-ui/core/Link";

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Login extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
      name: null,
      username: null
    };
  }
  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end and its token is stored in the localStorage.
   */
  login() {
    fetch(`${getDomain()}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(returnedUser => {
        const user = new User(returnedUser);
        localStorage.setItem("token", user.token);
        localStorage.setItem("name", user.name);
        localStorage.setItem("userId", user.id);
        // user authentication successfully worked --> navigate to the route /game in the GameRouter
        this.props.history.push(`/game`);
      })
      .catch(err => {
        if (err.message.match(/Failed to fetch/)) {
          alert("The server cannot be reached. Did you start it?");
        } else {
          alert(`Something went wrong during the login: ${err.message}`);
        }
      });
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   * You may call setState() immediately in componentDidMount().
   * It will trigger an extra rendering, but it will happen before the browser updates the screen.
   */
  componentDidMount() {}

  render() {
    return (
      <LoginCard>
        <CardContent>
          <TitleContainer>
            <Lock style={{ fontSize: 40 }} />
            <Typography variant="h4"> Login</Typography>
          </TitleContainer>
          <TextField
            margin="normal"
            label="Username"
            fullWidth
            onChange={e => {
              this.handleInputChange("username", e.target.value);
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
          <Button
            style={{ marginTop: 20 }}
            fullWidth
            variant="contained"
            color="primary"
            margin="normal"
            disabled={!this.state.username || !this.state.password}
            width="50%"
            onClick={() => {
              this.login();
            }}
          >
            Login
          </Button>
          <Divider />
          <Typography style={{ marginTop: 20 }} variant="subtitle1">
            Don't have an Account?{" "}
            <Link component={NavLink} to={"/register"}>
              {" "}
              Sign up{" "}
            </Link>
          </Typography>
        </CardContent>
      </LoginCard>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
