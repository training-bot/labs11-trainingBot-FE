// navigation includes tab navigation, breadcrumbs, user avatar
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import AppBar from '@material-ui/core/AppBar';
import logo from '../../img/training-bot.png';
import { flex } from '@material-ui/system/flexbox';
const faker = require('faker');

const styles = {
	avatar: {
		margin: 10
	},

	appBar: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		color: 'white',
		backgroundColor: '',
		padding: 5
	},
	logo: {
		width: 50,
		height: 50,
		marginRight: 10
	},
	menuItems: {
		display: 'flex',
		alignItems: 'center',
		color: 'white'
	}
};

const appBar = props => {
	const { classes } = props;
	const [value, setValue] = React.useState(2);

	function handleChange(event, newValue) {
		setValue(newValue);
	}

	return (
		<>
			<AppBar className={classes.appBar}>
				<div className={classes.menuItems}>
					<img src={logo} alt='logo' className={classes.logo} />
					<Button>About</Button>
					<Button>Contact</Button>
				</div>
				<Link to='/profile'>
					<Avatar
						alt='Avatar'
						src={faker.image.avatar()}
						className={classes.avatar}
					/>
				</Link>
			</AppBar>
		</>
	);
};

appBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(appBar);
