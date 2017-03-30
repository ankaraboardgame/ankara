import React from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class TitlePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayAbout: false,
      displayGameRules: false,
      displayLinks: false,
    }

    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove(event){
    this.setState({
      mouseX: event.pageX
    })
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
    const parallax = [
      {
        background: 'url("images/splash_bg_3a.png") no-repeat center center',
        left: 0 + (900 - this.state.mouseX) / 100,
        zIndex: -10
      },
      {
        background: 'url("images/splash_bg_2a.png") no-repeat center center',
        left: 0 + (900 - this.state.mouseX - 900) / 200,
        zIndex: -3
      }
    ]

    return (
      <div id="splash-page">
        <div className="parallax">
          <div className="parallax-bg" style={parallax[0]} />
          <div className="parallax-bg" style={parallax[1]} />
        </div>
        <div id="background-fixed" onMouseMove={this.handleMouseMove}>
          <div id="splash-title">
            <img src={'images/Ankara-Title.png'} style={{width: '100%'}}/>
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
            <text onClick={() => {this.handleOnClick('about')}} className="splash-text">The Creators</text>
          </div>
          <div className="menu-items">
            <text onClick={() => {this.handleOnClick('rules')}} className="splash-text">Game Details</text>
          </div>
          <div className="menu-items">
            <Link to="/lobby" style={{textDecoration: 'none', color: 'black'}} className="splash-text">Enter Game</Link>
          </div>
          <div className="menu-items">
            <text onClick={() => {this.handleOnClick('links')}} className="splash-text">The Project</text>
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
            <text className="splash-text">The Creators</text>
          </div>
          <div className="menu-item-info">
            <text style={{margin: '10px 30px 10px 30px'}}>Our team consisted of Maria Xia, Sokmean Nou, Jaekwang Seo, and Daniel Park. We are very smart, very very very smart, super duper smart, and super capable software engineers.</text>
          </div>
          <div style={backStyle} className="menu-items">
            <text onClick={() => {this.handleOnClick()}} className="splash-text">Go Back</text>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }

  renderGameRules() {
    const backStyle = {
      borderTop: '1px solid darkslategrey'
    };

    const linkStyle = {
      borderBottom: 'none',
      borderTop: '1px solid darkslategrey',
      padding: '10px 0px 0px 0px',
      margin: '10px 0px 0px 0px'
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
            <text className="splash-text">Game Details</text>
          </div>
          <div className="menu-item-info">
            <text style={{margin: '10px 30px 10px 30px'}}>In the hustle and bustle of the bazaar district of Ankara, you are a merchant. You and your assistants must compete against other competitors for riches. Good organization is key: your wheelbarrow has to be filled with goods at the warehouses and traded for money to buy the rubies. Your goal as the merchant is to be the first to collect a five rubies!</text>
          </div>
          <div className="menu-items" style={linkStyle}>
            <a style={{textDecoration: 'none', color: 'black'}}href="http://www.pegasus.de/fileadmin/_downloads/regeln/englisch/Istanbul_-_Anleitung_gb.pdf">PDF to Game Rules</a>
          </div>
          <div style={backStyle} className="menu-items">
            <text onClick={() => {this.handleOnClick()}} className="splash-text">Go Back</text>
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
            <text className="splash-text">The Project</text>
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
            <text onClick={() => {this.handleOnClick()}} className="splash-text">Go Back</text>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }

};

export default TitlePage;
