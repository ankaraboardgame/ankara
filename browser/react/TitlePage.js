import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';

class TitlePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayAbout: false,
      displayGameRules: false,
      displayLinks: false
    }
  }

  handleOnClick(link) {
    if (link === 'about') {
      this.setState({displayAbout: true});
    } else if (link === 'rules') {
      this.setState({displayGameRules: true});
    } else if (link === 'links') {
      this.setState({displayLinks: true});
    } else {
      this.setState({
        displayAbout: false,
        displayGameRules: false,
        displayLinks: false
      })
    }
  } 

  render() {
    return (
      <div id="splash-page">
        <div id="splash-title">
          <img src={`images/Ankara-Title.png`} style={{width: '100%'}}/>
        </div>
        <div id="splash-menu">  
            {
              !this.state.displayAbout && !this.state.displayGameRules && !this.state.displayLinks && this.renderMenu()
            }
            {
              this.state.displayAbout && this.renderAbout()
            }
            {
              this.state.displayGameRules && this.renderGameRules()
            }
            {
              this.state.displayLinks && this.renderLinks()
            }
        </div>
      </div>
    );
  }

  renderMenu() {
    return (
      <ReactCSSTransitionGroup
        transitionName="menu-anim"
        transitionEnter={false}
        transitionLeave={false}
        transitionAppear={true}
        transitionAppearTimeout={300}
      >
        <div id="menu-items-container">
          <div className="menu-items" style={{paddingTop: '10px'}}>
            <text onClick={() => {this.handleOnClick('about')}} className="menu-text">About the Creators</text>
          </div>
          <div className="menu-items">
            <text onClick={() => {this.handleOnClick('rules')}} className="menu-text">Game Rules</text>
          </div>
          <div className="menu-items">
            <Link to="/lobby" className="menu-text">Enter Game</Link>
          </div>
          <div className="menu-items">
            <text onClick={() => {this.handleOnClick('links')}} className="menu-text">Link to Project</text>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }

  renderAbout() {
    return (
      <ReactCSSTransitionGroup
        transitionName="menu-anim"
        transitionEnter={false}
        transitionLeave={false}
        transitionAppear={true}
        transitionAppearTimeout={300}
      >
        <div className="menu-open-container">
          <div className="menu-items" style={{paddingTop: '10px'}}>
            <text className="menu-text">About the Creators</text>
          </div>
          <div className="menu-items">
            <text onClick={() => {this.handleOnClick()}} className="menu-text">Go Back</text>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }

  renderGameRules() {
    return (
      <ReactCSSTransitionGroup
        transitionName="menu-anim"
        transitionEnter={false}
        transitionLeave={false}
        transitionAppear={true}
        transitionAppearTimeout={300}
      >
        <div className="menu-open-container">
          <div className="menu-items" style={{paddingTop: '10px'}}>
            <text className="menu-text">Game Rules</text>
          </div>
          <div className="menu-items">
            <a href="http://www.pegasus.de/fileadmin/_downloads/regeln/englisch/Istanbul_-_Anleitung_gb.pdf">PDF to game rules</a>
          </div>
          <div className="menu-items">
            <text onClick={() => {this.handleOnClick()}} className="menu-text">Go Back</text>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }

  renderLinks() {
    const style = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start'
    };
    return (
      <ReactCSSTransitionGroup
        transitionName="menu-anim"
        transitionEnter={false}
        transitionLeave={false}
        transitionAppear={true}
        transitionAppearTimeout={300}
        style={style}
      >
        <div className="menu-open-container">
          <div className="menu-items" style={{paddingTop: '10px'}}>
            <text className="menu-text">Link to Project</text>
          </div>
          <div className="menu-items">
            <text onClick={() => {this.handleOnClick()}} className="menu-text">Go Back</text>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
  
};

export default TitlePage;