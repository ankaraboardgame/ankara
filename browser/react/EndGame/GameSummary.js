import React from 'react';
import { fadeIn } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

const animateStyles = StyleSheet.create({
  fadeIn: {
    animationName: fadeIn,
    animationDuration: '3s'
  }
});

/** -------- Component -------- */
const GameSummary = ({merchants, playerMap}) => {
  return (
    <div className={css(animateStyles.fadeIn)} id="game-summary">
      <div id="game-summary-header">
        <text id="game-header-text">Game Summary</text>
      </div>
      <div id="game-statistics-container">
        <div id="game-stat-head-row">
          <text className="game-state-text" >Name</text>
          <text className="game-state-text" >Rubies</text>
          <text className="game-state-text" >Lira</text>
          <text className="game-state-text" >Heirlooms</text>
          <text className="game-state-text" >Fabric</text>
          <text className="game-state-text" >Fruit</text>
          <text className="game-state-text" >Spices</text>
        </div>
        {
          merchants && Object.keys(merchants).map((merchant,i) => {
            let merchObj = merchants[merchant];
            return (
              <div key={i} className="game-stat-row">
                <text className="game-state-text" style={{fontWeight: 'bold'}}>{playerMap[merchObj.id]}</text>
                <text className="game-state-text">{merchObj.wheelbarrow.ruby}</text>
                <text className="game-state-text" >{merchObj.wheelbarrow.money}</text>
                <text className="game-state-text" >{merchObj.wheelbarrow.heirloom}</text>
                <text className="game-state-text" >{merchObj.wheelbarrow.fabric}</text>
                <text className="game-state-text" >{merchObj.wheelbarrow.fruit}</text>
                <text className="game-state-text" >{merchObj.wheelbarrow.spice}</text>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default GameSummary;
