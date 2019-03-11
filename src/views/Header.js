import React from "react";
import styled from "styled-components";
import { ReactLogo } from "./ReactLogo";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";

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
  render() {
    return (
      <AppBar position="relative">
        <Toolbar>
          <ReactLogo width="60" height="60" />
          <Title>SoPra FS19 rocks with React and Material UI!</Title>
        </Toolbar>
      </AppBar>
    );
  }
}

/**
 * Don't forget to export your component!
 */
export default Header;
