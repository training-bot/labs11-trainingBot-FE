import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../AppBar/AppBar';
import styled from 'styled-components';

const styles = {
	card: {
		maxWidth: 800,
		margin: '0 auto'
	},
	media: {
		height: 200,
		width: 200
	}
};

const Container = styled.div`
	margin-top: 80px;
`;

function Profile(props) {
	const { classes } = props;
	const [uProfile, setUProfile] = useState({});

	const handleLogout = e => {
		e.preventDefault();
		localStorage.removeItem('isLoggedIn');
		props.history.push('/');
	};

	useEffect(() => {
		const { userProfile, getProfile } = props.auth;

		if (!userProfile) {
			getProfile((err, profile) => {
				setUProfile(profile);
			});
		} else {
			setUProfile(userProfile);
		}
	});
	return (
		<>
			<AppBar />
			<Container>
				<Button
					variant='contained'
					color='secondary'
					onClick={e => handleLogout(e)}
				>
					Log Out
				</Button>
				<div className='profile-area'>
					<Card className={classes.card}>
						<Typography gutterBottom variant='h5' component='h1'>
							{uProfile.name}
						</Typography>

						<CardActionArea>
							<CardMedia
								className={classes.media}
								image={uProfile.picture}
								title='Contemplative Reptile'
							/>
							<CardContent>
								<Typography gutterBottom variant='h5' component='h2'>
									{uProfile.nickname}
								</Typography>
								<Typography component='p'>
									<pre>{JSON.stringify(uProfile, null, 2)}</pre>
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</div>
			</Container>
		</>
	);
}

Profile.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
