import React from "react";
import User from "../shared/models/User";
import styled from "styled-components";
import { getDomain } from "../../helpers/getDomain";
import { withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  Typography, withStyles
} from "@material-ui/core";
import {Cake, ChevronLeft, Create} from "@material-ui/icons";
import { TitleContainer } from "../authentication/SharedElements";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Moment from "react-moment";
import Badge from "@material-ui/core/Badge";


const OnlineBadge = withStyles(() => ({
  badge: { backgroundColor: "#4caf50" }
}))(Badge);


const StyledCard = styled(Card)`
  max-width: 300px;
  margin: auto;
`;
class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: new User()
    };
  }
  componentDidMount() {
    let userId = this.props.match.params.userId;
    console.log(userId);

    fetch(`${getDomain()}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(returnedUser => {
        this.setState({
          user: new User(returnedUser)
        });
        console.log(this.state);
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
              <ChevronLeft onClick={() => this.props.history.go(-1)} />
            </Button>
            <Typography variant="h6">User Details</Typography>
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
              <Avatar>
                <Cake />
              </Avatar>
              <ListItemText primary=<Moment format="DD.MM.YYYY">{user.birthDate}</Moment> />
            </ListItem>
            <ListItem>
              <Avatar>
                <Create />
              </Avatar>
              <ListItemText primary=<Moment format="DD.MM.YYYY">{user.creationDate}</Moment> />
            </ListItem>
          </List>
        </CardContent>
      </StyledCard>
    );
  }
}

export default withRouter(Profile);
