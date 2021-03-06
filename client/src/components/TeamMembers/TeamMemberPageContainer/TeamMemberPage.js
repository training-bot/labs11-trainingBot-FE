import React from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import styled from "styled-components";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  List,
  Typography,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel
} from "@material-ui/core/";
import NotificationWidget from "./SnackBarTeamMember";
//Components
import TrainingSeriesAssignments from "./TrainingSeriesAssigments";
import DeleteModal from "../../Modals/deleteModal";

//Redux
import { connect } from "react-redux";
import { getTrainingSeries, editTeamMember } from "../../../store/actions";

const styles = theme => ({
  // these styles fixes the off-centering
  paper: {
    // "max-width": 800,
    width: "89%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
    margin: "5px auto",

    "@media (max-width: 768px)": {
      width: "89%",
      // padding: 0,
      margin: "5px auto"
    },

    "@media (max-width: 480px)": {
      width: "80%",
      // padding: 0,
      margin: "5px auto"
    }
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    width: "100%"
  },
  info: {
    "margin-right": "50px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  fab: {
    margin: theme.spacing.unit
  },
  button: {
    "margin-left": theme.spacing.unit,
    background: "#451476",
    color: "white",
    "&:hover": {
      background: "#591a99",
      color: "white"
    },

    "@media (max-width: 768px)": {
      margin: "15px 0"
    }
  },
  trainingSeriesHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media (max-width: 768px)": {
      flexDirection: "column"
    }
  },
  messageText: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center"
  },
  divider: {
    margin: "15px 0"
  },
  assignBtn: {
    "margin-left": theme.spacing.unit,
    background: "#451476",
    color: "white",
    "&:hover": {
      background: "#591a99",
      color: "white"
    },

    "&:disabled": {
      background: "white"
    },

    "@media (max-width: 768px)": {
      margin: "20px 0 15px"
    }
  }
});

class TeamMemberPage extends React.Component {
  state = {
    teamMember: {
      firstName: "",
      lastName: "",
      jobDescription: "",
      email: "",
      phoneNumber: "",
      user_ID: "",
      TeamMemberCol: "",
      teamMemberID: "",
      textOn: false,
      emailOn: false
    },
    assignments: [],
    trainingSeries: [] //Leigh-Ann: this may not be needed?
  };

  componentDidMount() {
    // this.props.getTrainingSeries(this.props.userId);
    if (Object.keys(this.props.teamMember).length !== 0) {
      this.setState({
        teamMember: this.props.teamMember.teamMember,
        assignments: this.props.teamMember.assignments
      });
    }

    //console.log("team member", this.props.teamMember);
  }

  handleChange = name => event => {
    this.setState({
      teamMember: {
        ...this.state.teamMember,
        [name]: event.target.value
      }
    });
  };

  handleToggleChange = name => async event => {
    await this.setState({
      teamMember: {
        ...this.state.teamMember,
        [name]: event.target.checked
      }
    });

    // PUT request on toggle
    this.props.editTeamMember(
      this.state.teamMember.teamMemberID,
      this.state.teamMember
    );
  };

  handleDate = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  routeToAssigning = e => {
    e.preventDefault();

    this.props.history.push({
      pathname: `/home/assign-series/${this.state.teamMember.teamMemberID}`,
      state: {
        userId: this.props.userId,
        urlId: this.props.urlId,
        assignments: this.props.teamMember.assignments,
        trainingSeries: this.props.trainingSeries
      }
    });
  };

  render() {
    const { classes } = this.props;

    //console.log("IS LOADING TMP", this.props.isLoading);

    const { textOn, emailOn } = this.state.teamMember;

    let textDisabled;
    let emailDisabled;

    if (textOn && !emailOn) {
      textDisabled = true;
    }

    if (emailOn && !textOn) {
      emailDisabled = true;
    }

    if (emailOn && textOn) {
      textDisabled = false;
      emailDisabled = false;
    }

    //Checks to see if one number has been entered and if the full number matches
    let addDisabled = false;
    if (
      /^$/gm.test(this.state.teamMember.phoneNumber) === true ||
      (/\+1 \(\d{0}/gm.test(this.state.teamMember.phoneNumber) === true &&
        /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{4})(?:[-.x ]*(\d+))?)\S*$/gm.test(
          this.state.teamMember.phoneNumber
        ) === false)
    ) {
      addDisabled = true;
    }

    const trainingAssigments =
      this.props.teamMember.assignments &&
      this.props.teamMember.assignments.map(trainingSeries => {
        return (
          <TrainingSeriesAssignments
            trainingSeries={trainingSeries}
            teamMemberId={this.props.urlId}
          />
        );
      });

    let disabledTrainingSeries;

    if (
      this.props.trainingSeries.length > 0 &&
      this.state.assignments.length === 0
    ) {
      disabledTrainingSeries = (
        <>
          <div className={classes.trainingSeriesHeader}>
            <Typography variant="title">Training Series</Typography>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={this.routeToAssigning}
            >
              Assign to Training Series
            </Button>
          </div>
          <HolderText>
            <p>This team member currently does not have any assignments.</p>
            <p>Click the button above to assign them to a training series.</p>
          </HolderText>
        </>
      );
    } else if (this.props.trainingSeries.length > 0) {
      disabledTrainingSeries = (
        <>
          <div className={classes.trainingSeriesHeader}>
            <Typography variant="title">Assigned Training Series</Typography>
            <Button
              className={classes.assignBtn}
              variant="outlined"
              // className={classes.button}
              onClick={this.routeToAssigning}
            >
              Assign to Training Series
            </Button>
          </div>
          <List>{trainingAssigments}</List>
        </>
      );
    } else {
      disabledTrainingSeries = (
        <>
          <div className={classes.trainingSeriesHeader}>
            <Typography variant="title">Training Series</Typography>
            <Button className={classes.assignBtn} variant="outlined" disabled>
              Assign to Training Series
            </Button>
          </div>
          <HolderText>
            <p>You don't have any training series to assign.</p>
            <p variant="subheading" className={classes.messageText}>
              <Link to="/home/create-training-series">Click here</Link> to
              create your first training series.
            </p>
          </HolderText>
        </>
      );
    }

    return (
      <MainContainer>
        <form className={classes.form}>
          <Paper className={classes.paper}>
            <Typography variant="title">Team Member Info</Typography>
            <Divider variant="fullWidth" className={classes.divider} />
            <MemberInfoContainer>
              <TextField
                id="standard-name"
                label="first name"
                className={classes.textField}
                value={this.state.teamMember.firstName}
                onChange={this.handleChange("firstName")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="last name"
                className={classes.textField}
                value={this.state.teamMember.lastName}
                onChange={this.handleChange("lastName")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="job description"
                className={classes.textField}
                value={this.state.teamMember.jobDescription}
                onChange={this.handleChange("jobDescription")}
                margin="normal"
                required
              />
            </MemberInfoContainer>
            <MemberInfoContainer>
              <NumberFormat
                format="+1 (###) ###-####"
                mask="_"
                id="standard-name"
                label="phone number"
                customInput={TextField}
                className={classes.textField}
                value={this.state.teamMember.phoneNumber}
                onChange={this.handleChange("phoneNumber")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="email"
                type="email"
                className={classes.textField}
                value={this.state.teamMember.email}
                onChange={this.handleChange("email")}
                margin="normal"
              />
            </MemberInfoContainer>
            <ButtonContainer>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.teamMember.textOn}
                    onChange={
                      textDisabled ? null : this.handleToggleChange("textOn")
                    }
                    value="textOn"
                    color="default"
                    style={
                      this.state.teamMember.textOn
                        ? { color: "#451476" }
                        : { color: "#edeaea" }
                    }
                  />
                }
                label={
                  this.state.teamMember.textOn
                    ? "Texts Active"
                    : "Texts Inactive"
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.teamMember.emailOn}
                    onChange={
                      emailDisabled ? null : this.handleToggleChange("emailOn")
                    }
                    value="emailOn"
                    color="default"
                    style={
                      this.state.teamMember.emailOn
                        ? { color: "#451476" }
                        : { color: "#edeaea" }
                    }
                  />
                }
                label={
                  this.state.teamMember.emailOn
                    ? "Email Active"
                    : "Email Inactive"
                }
              />
            </ButtonContainer>
            <ButtonContainer>
              <NotificationWidget
                disabled={addDisabled ? true : false}
                teamMember={this.state.teamMember}
                editTeamMemberSubmit={this.props.editTeamMemberSubmit}
                type="success"
                submitType="edit"
              />
              <DeleteModal
                deleteType="inTeamMemberPage"
                teamMemberId={this.state.teamMember.teamMemberID}
                userId={this.props.userId}
                displayType="button"
              />
            </ButtonContainer>
          </Paper>
        </form>
        <Paper className={classes.paper}>{disabledTrainingSeries}</Paper>
      </MainContainer>
    );
  }
}

const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const HolderText = styled.div`
  margin: 50px 0;
  p {
    color: lightgray;
    text-align: center;
  }
`;

const MemberInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 20px auto;
  @media (max-width: 480px) {
    flex-direction: column;
    width: 90%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;

const mapStateToProps = state => ({
  trainingSeries: state.trainingSeriesReducer.trainingSeries
});

export default connect(
  mapStateToProps,
  { getTrainingSeries, editTeamMember }
)(withStyles(styles)(TeamMemberPage));
