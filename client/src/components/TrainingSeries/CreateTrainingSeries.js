import React from 'react';

//Prop Types
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addTrainingSeries } from '../../store/actions/trainingSeriesActions';
import ProgressCircle from '../Progress/ProgressCircle';

//Styles
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, TextField } from '@material-ui/core/';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 25,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});

class CreateTrainingSeries extends React.Component {
  state = {
    title: '',
    isRouting: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleTrainingSeriesSubmit = e => {
    e.preventDefault();
    const data = { title: this.state.title, userID: this.props.userId };
    this.props.addTrainingSeries(data);

    this.setState({ isRouting: true });

    setTimeout(() => {
      this.props.history.push(
        `/home/training-series/${this.props.trainingSeriesID}`
      );
    }, 1000);
  };

  render() {
    const { classes } = this.props;
    return this.state.isRouting ? (
      <ProgressCircle />
    ) : (
      <div>
        <Typography variant="h6" id="modal-title">
          Create A New Training Series
        </Typography>
        <form
          onSubmit={e => this.handleTrainingSeriesSubmit(e)}
          className={classes.container}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-name"
            label="Title"
            className={classes.textField}
            value={this.state.title}
            onChange={this.handleChange('title')}
            margin="normal"
          />
          <Button type="submit" variant="contained" className={classes.button}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

CreateTrainingSeries.propTypes = {
  classes: PropTypes.object.isRequired
};

const CreateTrainingSeriesWrapped = withStyles(styles)(CreateTrainingSeries);

const mapStateToProps = state => {
  return {
    isAdding: state.trainingSeriesReducer.isAdding,
    addSuccess: state.trainingSeriesReducer.addSuccess,
    trainingSeriesID: state.trainingSeriesReducer.trainingSeriesID
  };
};

export default connect(
  mapStateToProps,
  { addTrainingSeries }
)(CreateTrainingSeriesWrapped);