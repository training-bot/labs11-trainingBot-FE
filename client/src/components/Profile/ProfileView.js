import React from "react";
//Stripe
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../Stripe/CheckoutForm";

//Authentication
import Authenticate from "../authenticate/authenticate";

//State Management
import { getUser } from "../../store/actions/userActions";
import { connect } from "react-redux";
//Styling
import AppBar from "../AppBar/AppBar";

import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Typography,
  withStyles
} from "@material-ui/core";
import styled from "styled-components";

const styles = {
  card: {
    maxWidth: 800,
    margin: "0 auto"
  },
  cardContent: {
    backgroundColor: "#E8E9EB"
  },
  media: {
    height: 200,
    width: 200
  }
};

class ProfileView extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <StripeProvider apiKey='pk_test_L76yOnUDjq2cNP8heEH9MkpA00Ktyd3MYn'>
        <Container>
          <AppBar />
          <div className='profile-area'>
            <Card className={classes.card}>
              <Typography gutterBottom variant='h5' component='h1'>
                {this.props.userProfile.name}
              </Typography>

              <CardMedia
                className={classes.media}
                image={this.props.userProfile.picture}
                title='Contemplative Reptile'
              />
              <Typography gutterBottom variant='h5' component='h5'>
                {this.props.userProfile.email}
              </Typography>
              <CardActions>
                <Button size='small' color='primary'>
                  Edit
                </Button>
                <Button size='small' color='secondary'>
                  Delete Account
                </Button>
              </CardActions>
            </Card>
          </div>
          <Elements>
            <CheckoutForm user={this.props.user} />
          </Elements>
        </Container>
      </StripeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.userReducer.userProfile
  };
};

export default connect(
  mapStateToProps,
  {
    getUser
  }
)(withStyles(styles)(Authenticate(ProfileView)));

//Styled components

const Container = styled.div`
  margin-top: 80px;
`;
