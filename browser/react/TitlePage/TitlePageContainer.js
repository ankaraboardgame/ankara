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
    }

    this.handleOnClick = this.handleOnClick.bind(this);
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
            this.state.displayAbout && <AboutUs handleOnClick={this.handleOnClick} />
          }
          {
            this.state.displayGameRules && <GameDetails handleOnClick={this.handleOnClick} />
          }
          {
            this.state.displayLinks && <ProjectLink handleOnClick={this.handleOnClick} />
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
