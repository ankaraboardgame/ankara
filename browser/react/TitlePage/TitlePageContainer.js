import React from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/** --- Importing Presentational Components ---- */
import AboutUs from './AboutUs';
import GameDetails from './GameDetails';
import ProjectLink from './ProjectLink';

/** --------- Container Component --------- */
class TitlePageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayAbout: false,
      displayGameRules: false,
      displayLinks: false,
      mouseX: 900
    }

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleMouseMove(event){
    this.setState({
      mouseX: event.pageX
    })
  }

  handleOnClick(link) {
    switch(link) {
      case 'about': return this.setState({displayAbout: true});
      case 'rules': return this.setState({displayGameRules: true});
      case 'links': return this.setState({displayLinks: true});
      default:      return this.setState({
        displayAbout: false,
        displayGameRules: false,
        displayLinks: false
      });
    }
  }

  render() {
    const { mouseX, displayAbout, displayGameRules, displayLinks } = this.state;
    const parallax = [
      {
        background: 'url("images/splash_bg_3a.png") no-repeat center center',
        left: 0 + (900 - mouseX) / 100,
        zIndex: -10
      },
      {
        background: 'url("images/splash_bg_2a.png") no-repeat center center',
        left: 0 + (900 - mouseX - 900) / 200,
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
            <img src={'images/Ankara-Title.png'} style={{width: '100%'}} />
          </div>
          <div id="splash-menu">
            {
              !displayAbout && !displayGameRules && !displayLinks && this.renderMenu()
            }
            {
              displayAbout && <AboutUs handleOnClick={this.handleOnClick} />
            }
            {
              displayGameRules && <GameDetails handleOnClick={this.handleOnClick} />
            }
            {
              displayLinks && <ProjectLink handleOnClick={this.handleOnClick} />
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
            <text onClick={() => {this.handleOnClick('about')}} className="menu-text">The Creators</text>
          </div>
          <div className="menu-items">
            <text onClick={() => {this.handleOnClick('rules')}} className="menu-text">Game Details</text>
          </div>
          <div className="menu-items">
            <Link to="/lobby" style={{textDecoration: 'none', color: 'black'}} className="menu-text">Enter Game</Link>
          </div>
          <div className="menu-items">
            <text onClick={() => {this.handleOnClick('links')}} className="menu-text">The Project</text>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
};

export default TitlePageContainer;
