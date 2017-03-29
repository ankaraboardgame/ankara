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
        <div className="menu-items-container">
          <div className="menu-items" style={{paddingTop: '10px'}}>
            <text onClick={() => {this.handleOnClick('about')}} className="menu-text">About the Creators</text>
          </div>
          <div className="menu-items">
            <text onClick={() => {this.handleOnClick('rules')}} className="menu-text">Game Rules</text>
          </div>
          <div className="menu-items">
            <Link to="/lobby" style={{textDecoration: 'none', color: 'black'}} className="menu-text">Enter Game</Link>
          </div>
          <div className="menu-items">
            <text onClick={() => {this.handleOnClick('links')}} className="menu-text">Link to Project</text>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }

  renderAbout() {
    const backStyle = {
      borderTop: '1px solid darkslategrey'
    };
    return (
      <ReactCSSTransitionGroup
        transitionName="menu-anim"
        transitionEnter={false}
        transitionLeave={false}
        transitionAppear={true}
        transitionAppearTimeout={300}
      >
        <div className="menu-items-container">
          <div className="menu-items" style={{paddingTop: '10px'}}>
            <text className="menu-text">About the Creators</text>
          </div>
          <div className="menu-item-info">
            <text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</text>
          </div>
          <div style={backStyle} className="menu-items">
            <text onClick={() => {this.handleOnClick()}} className="menu-text">Go Back</text>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }

  renderGameRules() {
    const backStyle = {
      borderTop: '1px solid darkslategrey'
    };
    return (
      <ReactCSSTransitionGroup
        transitionName="menu-anim"
        transitionEnter={false}
        transitionLeave={false}
        transitionAppear={true}
        transitionAppearTimeout={300}
      >
        <div className="menu-items-container">
          <div className="menu-items" style={{paddingTop: '10px'}}>
            <text className="menu-text">Game Rules</text>
          </div>
          <div className="menu-item-info">
            <text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</text>
          </div>
          <div className="menu-items">
            <a style={{textDecoration: 'none', color: 'black'}}href="http://www.pegasus.de/fileadmin/_downloads/regeln/englisch/Istanbul_-_Anleitung_gb.pdf">PDF to game rules</a>
          </div>
          <div style={backStyle} className="menu-items">
            <text onClick={() => {this.handleOnClick()}} className="menu-text">Go Back</text>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }

  renderLinks() {
    const backStyle = {
      borderTop: '1px solid darkslategrey'
    };
    return (
      <ReactCSSTransitionGroup
        transitionName="menu-anim"
        transitionEnter={false}
        transitionLeave={false}
        transitionAppear={true}
        transitionAppearTimeout={300}
      >
        <div className="menu-items-container">
          <div className="menu-items" style={{paddingTop: '10px'}}>
            <text className="menu-text">Link to Project</text>
          </div>
          <div className="menu-item-info">
            <a href="https://github.com/ankaraboardgame/ankara" target="_blank" style={{display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'black'}}>
              <img src="images/github-logo.png" style={{width: '30px', alignSelf: 'center'}}/>
              <img src="images/github-text.png" style={{width: '50px', alignSelf: 'center'}}/>
              <br />
              <text style={{fontSize: '17px'}}>/ankaraboardgame/ankara</text>
            </a>
          </div>
          <div style={backStyle} className="menu-items">
            <text onClick={() => {this.handleOnClick()}} className="menu-text">Go Back</text>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
  
};

export default TitlePage;