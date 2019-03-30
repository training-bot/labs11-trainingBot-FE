import React, {Component} from 'react';
//Components
import LandingPageView from './components/LandingPage/LandingPageView';
//Styling
import CssBaseline from '@material-ui/core/CssBaseline';
import styled from 'styled-components';

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <LandingPageView />
      </>
    );
  }
}

const LoginContainer = styled.div`
  margin-top: 150px;
`;

export default App;
