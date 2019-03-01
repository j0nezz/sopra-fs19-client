import React from "react";
import styled from "styled-components";
import { ReactLogo } from "./ReactLogo";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

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
const StyledAppbar = styled(AppBar)`
  align-items: center;
`;
/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Header = props => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <ReactLogo width="60" height="60" />
        <Title>SoPra FS19 rocks with React and Material UI!</Title>
        <div>
          <IconButton aria-haspopup="true" color="inherit">
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

/**
 * Don't forget to export your component!
 */
export default Header;
