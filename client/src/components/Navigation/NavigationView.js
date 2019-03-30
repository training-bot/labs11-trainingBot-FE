import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
//Styling
import styled from 'styled-components';
//Logo
import Logo from '../../img/training-bot.png';

import {login} from '../../Auth/Auth';

class NavigationView extends Component {
  render() {
    return (
      <NavigationContainer>
        <NavigationTop />
        <NavItemsContainer>
          <NavigationLogo src={Logo} />
          <NavLinkItems>
            <Link to="/home">Dashboard</Link>
            <Link to="/pricing">Pricing</Link>
          </NavLinkItems>
          <a onClick={() => login()}>Login</a>
        </NavItemsContainer>
      </NavigationContainer>
    );
  }
}

export default withRouter(NavigationView);

const NavigationContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  max-width: 1280px;
  flex-direction: column;
  align-items: center;
`;
const NavigationTop = styled.div`
  background-color: #3ebd93;
  width: 100%;
  padding: 8px 0;
`;
const NavItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 0px 30px;
  width: 100%;
  a {
    margin: 0 10px;
    text-decoration: none;
    color: #690cb0;
    &: hover {
      cursor: pointer;
    }
  }
`;
const NavLinkItems = styled.div`
  display: flex;
`;
const NavigationLogo = styled.img`
  height: 35px;
`;
