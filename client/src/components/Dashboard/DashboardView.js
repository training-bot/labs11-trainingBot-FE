// parent component for app once logged in
import React from 'react';
import { Router, Route } from 'react-router-dom';

import history from '../../history';

//Styling
import styled from 'styled-components';

//Components
import TeamMembersView from '../TeamMembers/TeamMembersView';
import TrainingSeriesView from '../TrainingSeries/TrainingSeriesView';
import ProgressCircle from '../Progress/ProgressCircle';
import ProfileView from '../Profile/ProfileView';
import AppBar from '../AppBar/AppBar';
import TeamMemberPageView from '../TeamMembers/TeamMemberPageContainer/TeamMemberPageView';
import AddTrainingSeriesView from '../TrainingSeries/AddMembersToTrainingSeries/AddMembersView.js';
import CreateTrainingSeries from '../TrainingSeries/CreateTrainingSeries';
import ReturnToDashboardButton from '../Navigation/ReturnToDashboard';
import TrainingSeriesPosts from '../TrainingSeries/TrainingSeriesPosts';
import AddTeamMemberPage from '../TeamMembers/TeamMemberPageContainer/AddTeamMemberPage';
import CreatePost from '../TrainingSeries/CreatePost';
import PostPage from '../TrainingSeries/PostPage';
import NotificationsView from '../Notifications/NotificationsView';
import AssignMemberPage from '../TeamMembers/TeamMemberPageContainer/AssignMemberPage';
import Snackbar from '../Snackbar/Snackbar';
import DashboardTour from '../Tour/Tour';

//Auth
import Authenticate from '../authenticate/authenticate';

//State Management
import { connect } from 'react-redux';
import { getUser } from '../../store/actions/userActions';

class Dashboard extends React.Component {
  state = {
    tabValue: 0,
    displaySnackbar: false,
    isTourOpen: true
  };

  componentDidMount() {
    this.props.getUser();
  }

  componentDidUpdate(prevProps) {
    //Checks if an already existing user, if so disable tour.
    if (this.props.newUser !== prevProps.newUser) {
      this.setState({ isTourOpen: false });
    }
    if (this.props.location.state) {
      if (
        this.props.location.state !== prevProps.location.state &&
        this.props.location.state.success
      ) {
        this.setState({
          displaySnackbar: true
        });
      }
    }
  }

  toggleFreakinSnackBar = e => {
    this.setState({
      displaySnackbar: false
    });
  };

  renderDashboard = () => {
    const user = this.props.userProfile.user;
    return (
      <>
        <TripleColumn>
          <SmallColumns>
            <TeamMembersView
              toggleFreakinSnackBar={this.toggleFreakinSnackBar}
              userId={user.userID}
            />
            <TrainingSeriesView
              toggleFreakinSnackBar={this.toggleFreakinSnackBar}
              userId={user.userID}
              match={this.props.match}
            />
          </SmallColumns>
          <NotificationsView userId={user.userID} />
        </TripleColumn>
      </>
    );
  };

  render() {
    return (
      <>
        {this.props.doneLoading ? (
          <>
            {this.state.displaySnackbar && (
              <>
                <Snackbar
                  message="Your team members have been successfully added."
                  type="success"
                />
              </>
            )}
            <AppBar />
            {this.props.location.pathname !== '/home' && (
              <ReturnToDashboardButton />
            )}
            <DashboardContainer>
              <Router history={history}>
                <Route exact path="/home" component={this.renderDashboard} />
                <Route
                  path="/home/profile"
                  render={props => (
                    <ProfileView
                      {...props}
                      activateTutorial={this.activateTutorial}
                      toggleFreakinSnackBar={this.toggleFreakinSnackBar}
                    />
                  )}
                />
                <Route
                  path="/home/team-member/:id"
                  render={props => (
                    <TeamMemberPageView
                      {...props}
                      userId={this.props.userProfile.user.userID}
                    />
                  )}
                />
                <Route
                  path="/home/create-team-member/"
                  render={props => (
                    <AddTeamMemberPage
                      {...props}
                      userId={this.props.userProfile.user.userID}
                    />
                  )}
                />
                <Route
                  path="/home/create-training-series"
                  render={props => (
                    <CreateTrainingSeries
                      {...props}
                      userId={this.props.userProfile.user.userID}
                    />
                  )}
                />
                <Route
                  path="/home/training-series/:id"
                  render={props => (
                    <TrainingSeriesPosts
                      {...props}
                      userId={this.props.userProfile.user.userID}
                    />
                  )}
                />
                <Route
                  path="/home/create-post"
                  render={props => <CreatePost {...props} />}
                />
                <Route
                  path="/home/assign-members/:id"
                  render={props => (
                    <AddTrainingSeriesView
                      {...props}
                      userId={this.props.userProfile.user.userID}
                    />
                  )}
                />
                <Route
                  path="/home/assign-series/:id"
                  render={props => (
                    <AssignMemberPage
                      {...props}
                      userId={this.props.userProfile.user.userID}
                    />
                  )}
                />
                <Route path="/home/post/:id" component={PostPage} />
              </Router>
              <DashboardTour
                isTourOpen={this.state.isTourOpen}
                closeTour={this.closeTour}
                newUser={this.props.newUser}
              />
            </DashboardContainer>
          </>
        ) : (
          <ProgressCircle />
        )}
      </>
    );
  }

  // tracking the tab value in navigation.js
  changeTabValue = value => {
    this.setState({
      tabValue: value
    });
  };

  //Tour methods
  closeTour = () => {
    this.setState({ isTourOpen: false });
  };
  activateTutorial = () => {
    this.props.history.push('/home');
    this.setState({ isTourOpen: true });
  };
}

const mapStateToProps = state => {
  return {
    userProfile: state.userReducer.userProfile,
    doneLoading: state.userReducer.doneLoading,
    newUser: state.userReducer.newUser
  };
};

export default connect(
  mapStateToProps,
  {
    getUser
  }
)(Authenticate(Dashboard));

//Styled Components
const TripleColumn = styled.div`
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  margin: 48px auto;
  /* height: 500px; */
  @media (max-width: 1400px) {
    flex-wrap: wrap;
    max-width: 1000px;
    padding: 10px;
  }
  @media (max-width: 768px) {
    max-width: 768px;
    height: 100%;
    flex-direction: column;
    padding: 10px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
`;
const SmallColumns = styled.div`
  display: flex;
  width: 800px;
  @media (max-width: 1400px) {
    width: 100%;
    margin-bottom: 50px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    /* margin-bottom: 5px; */
  }
`;
const DashboardContainer = styled.div`
  display: flex;
  /* background-color: #fafafa; */

  @media (max-width: 768px) {
    max-width: 768px;
    height: 100%;
    flex-direction: column;
    padding: 10px;
  }
`;
