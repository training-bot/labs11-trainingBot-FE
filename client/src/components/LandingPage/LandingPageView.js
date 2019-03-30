// contains all components for landing page
import React from 'react';

//Styling
import styled from 'styled-components';

class LandingPageView extends React.Component {
  render() {
    return (
      <>
        <LandingPageContainer>
          <LandingPageContentContainer>
            <h1>contect</h1>
          </LandingPageContentContainer>
        </LandingPageContainer>
      </>
    );
  }
}
export default LandingPageView;

const LandingPageContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  background-color: #f0f4f8;
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LandingPageContentContainer = styled.div`
  background-color: #FFFFFF
  height: 80%;
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
