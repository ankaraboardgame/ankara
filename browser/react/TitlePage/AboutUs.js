import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const AboutUs = ({handleOnClick}) => {
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
          <text className="menu-text">The Creators</text>
        </div>
        <div className="menu-item-info">
          <text style={{margin: '10px 30px 10px 30px'}}>Our team consisted of Maria Xia, Sokmean Nou, Jaekwang Seo, and Daniel Park. We are very smart, very very very smart, super duper smart, and super capable software engineers.</text>
        </div>
        <div style={backStyle} className="menu-items">
          <text onClick={() => {handleOnClick()}} className="menu-text">Go Back</text>
        </div>
      </div>
    </ReactCSSTransitionGroup>
  );
};

export default AboutUs;
