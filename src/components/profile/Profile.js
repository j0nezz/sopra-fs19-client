import React from "react";
import User from "../shared/models/User";
import { getDomain } from "../../helpers/getDomain";
import { withRouter } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {
  List,
  ListItem,
  Typography
} from "@material-ui/core";
import {Cake, ChevronLeft, Create} from "@material-ui/icons";
import { TitleContainer } from "../authentication/SharedElements";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import {AccountCircle, Edit } from "@material-ui/icons";
import {OnlineBadge, StyledCard} from "./SharedProfileElements";
import Moment from 'react-moment';


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
            {parseInt(user.id) === parseInt(localStorage.getItem("userId")) ?
                (<Button>
                  <Edit onClick={() => this.props.history.push("/edit")} />
                </Button>)
                : null
              }
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
