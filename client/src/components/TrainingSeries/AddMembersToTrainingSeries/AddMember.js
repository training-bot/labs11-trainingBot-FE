import React, { Component } from "react";

//Date Picker
import DatePicker from "react-datepicker";
//Styles
import "react-datepicker/dist/react-datepicker.css";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem
} from "@material-ui/core/";
import styled from "styled-components";
import TrainingBotGIF from "../../../img/trainingBot.gif";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit,
    color: "#451476",
    "&:hover": {
      background: "#451476",
      color: "white"
    }
  },
  memberList: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 240,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};


class AddMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      name: [],
      assignments:[],
    };
  }
  handleChange = event => {
    this.setState({ name: event.target.value });
    console.log(event.target)
    this.props.handler.handleChecked(event.target.dataID)
  };

    filteredMembers(){
        let assignments = this.props.assignments.map(
          assignment => assignment.teamMember_ID
        );
      let filteredMembers = this.props.teamMembers.filter(member => {
        return !assignments.includes(member.teamMemberID);
      });
     return filteredMembers.map(name => (
        <MenuItem key={name.teamMemberID} dataID={name.teamMemberID} value={`${name.firstName} ${name.lastName}`}  >
          {name.firstName} {name.lastName}
        </MenuItem>
      ))}
    
    // const renderMembers = () => {
      //   //Map Through the current assignments for the team member, returns an array of ID's
      //   let assignments = props.assignments.map(
        //     assignment => assignment.teamMember_ID
        //   );
        //   //Filters the trainingSeries based on assignments
        //   let filteredMembers = props.teamMembers.filter(member => {
          //     return !assignments.includes(member.teamMemberID);
          //   });
          //   return filteredMembers.map(member => (
            //     <>
            //       <FormControlLabel
            //         control={
              //           <Checkbox
              //             name={member.teamMemberID}
              //             onChange={() => props.handler.handleChecked(member.teamMemberID)}
              //           />
              //         }
              //         label={`${member.firstName} ${member.lastName}`}
              //       />
              //     </>
              //   ));
              // };
              // console.log(this.props.selectedTeamMembers);
              render() {
                const { classes } = this.props;
                return (
                  <AddMemberContainer>
        {this.props.teamMembers.length ? (
          <>
            <h3>Assign Team Members </h3>
            <DatePicker
              inline
              minDate={new Date()}
              selected={this.props.startDate}
              onChange={this.props.handler.handleDateChange}
            />
            <TeamMemberContainer>
              <form
                variant="body1"
                id="modal-title"
                className={classes.memberList}
                onSubmit={e => this.props.handler.handleSubmit(e)}
              >
                {/* {renderMembers()} */}
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple-chip">Selected Members</InputLabel>
                  <Select
                    multiple
                    value={this.state.name}
                    onChange={this.handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={selected => (
                      <div className={classes.chips}>
                        {selected.map(value => (
                          <Chip
                            key={value}
                            label={value}
                            className={classes.chip}
                          />
                        ))}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {this.filteredMembers()}
                  </Select>
                </FormControl>
                <Button
                  disabled={
                    this.state.name< 1 ||
                    this.props.isRouting === true
                      ? "true"
                      : null
                  }
                  type="submit"
                  className={classes.button}
                >
                  {this.props.isRouting ? (
                    <LoadingImage src={TrainingBotGIF} alt="loader" />
                  ) : (
                    `Assign`
                  )}
                </Button>
                <Button onClick={this.props.handler.routeToPostPage}>
                  Cancel
                </Button>
              </form>
            </TeamMemberContainer>
          </>
        ) : (
          <h2> You need to create Team members! </h2>
        )}
      </AddMemberContainer>
    );
  }
}

export default withStyles(styles)(AddMember);

const AddMemberContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TeamMemberContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoadingImage = styled.img`
  width: 40px;
  overflow: hidden;
  pointerevents: none;
  cursor: not-allowed;
`;
