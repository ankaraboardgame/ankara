import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const GameDetails = ({handleOnClick}) => {
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
          <text className="menu-text">Game Details</text>
        </div>
        <div className="menu-item-info">
          <text style={{margin: '10px 30px 10px 30px', fontSize: '15px'}}>In the hustle and bustle of the bazaar district of Ankara, you are a merchant. Good organization is key: your wheelbarrow has to be filled with goods at the warehouses and traded for money to buy the rubies. Your goal as the merchant is to be the first to collect a five rubies!</text>
        </div>
        <div className="menu-items" style={linkStyle}>
          <a style={{textDecoration: 'none', color: 'black'}}href="http://www.pegasus.de/fileadmin/_downloads/regeln/englisch/Istanbul_-_Anleitung_gb.pdf">PDF to Game Rules</a>
        </div>
        <div style={backStyle} className="menu-items">
          <text onClick={() => {handleOnClick()}} className="menu-text">Go Back</text>
        </div>
      </div>
    </ReactCSSTransitionGroup>
  );
};

export default GameDetails;
