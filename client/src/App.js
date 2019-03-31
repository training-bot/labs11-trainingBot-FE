import React, { Component } from "react";
//Components
import LandingPageView from "./components/LandingPage/LandingPageView";
//Styling
import CssBaseline from "@material-ui/core/CssBaseline";

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

export default App;
