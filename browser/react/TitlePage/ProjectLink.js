import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const ProjectLink = ({handleOnClick}) => {
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
          <text className="menu-text">The Project</text>
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
          <text onClick={() => {handleOnClick()}} className="menu-text">Go Back</text>
        </div>
      </div>
    </ReactCSSTransitionGroup>
  );
};

export default ProjectLink;
