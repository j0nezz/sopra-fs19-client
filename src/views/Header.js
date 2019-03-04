import React from "react";
import styled from "styled-components";
import { ReactLogo } from "./ReactLogo";
import { AppBar, Typography } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";

/**
 * Using styled-components you can visual HTML primitives and use props with it!
 * The idea behind this external package, it's to have a better structure and overview for your HTML and CSS
 * Using styled-components, you can have styling conditions using the following syntax: ${props => ...}
 * https://www.styled-components.com/
 */

const Title = styled.h1`
  font-weight: bold;
  color: white;
  flex: 1;
`;
class Header extends React.Component {
  // TODO update Component when local storage changes
  // TODO add Links to Header (currently outside Router)

  render() {
    return (
      <AppBar position="relative">
        <Toolbar>
          <ReactLogo width="60" height="60" />
          <Title>SoPra FS19 rocks with React and Material UI!</Title>
          {localStorage.getItem("name") ? (
            <React.Fragment>
              <Typography variant="h6" style={{ color: "white" }}>
                Hi {localStorage.getItem("name")}
              </Typography>
              <Button aria-haspopup="true" color="inherit" to="/edit">
                <AccountCircle />
              </Button>
            </React.Fragment>
          ) : null}
        </Toolbar>
      </AppBar>
    );
  }
}

/**
 * Don't forget to export your component!
 */
export default Header;
