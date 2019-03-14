import { withStyles } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import styled from "styled-components";
import Card from "@material-ui/core/Card";

/**
 * Green Badge for accounts with status online
 */
export const OnlineBadge = withStyles(() => ({
  badge: { backgroundColor: "#4caf50" }
}))(Badge);

export const StyledCard = styled(Card)`
  max-width: 300px;
  margin: 1em auto auto;
`;
