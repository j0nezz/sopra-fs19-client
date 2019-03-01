import React from "react";
import User from "../shared/models/User";
import styled from "styled-components";
import { getDomain } from "../../helpers/getDomain";
import { withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const Container = styled.div`
  padding: 20px;
  margin: 0 10em;
  background: rgba(200, 200, 200, 0.5);
  border-radius: 5px;
`;

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
    return (
      <Container>
        {this.state.user.name}
        <StyledCard>
          <CardContent />
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </StyledCard>
      </Container>
    );
  }
}

export default withRouter(Profile);
