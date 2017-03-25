import React from 'react';

const GameSummary = props => {
  return (
    <section id="game-summary">
      <div id="game-summary-header">
          <text id="game-header-text">> Game Summary</text>
      </div>
      <table>
          <thead>
              <tr style={{backgroundColor: 'rgba(215, 117, 79,.2)'}}>
                  <th className="th-center" style={{ textAlign: 'left' }}>Name</th>
                  <th className="th-center">Rubies</th>
                  <th className="th-center">Lira</th>
                  <th className="th-center">Heirlooms</th>
                  <th className="th-center">Fabric</th>
                  <th className="th-center">Fruit</th>
                  <th className="th-center">Spices</th>
              </tr>
          </thead>
          <tbody>
              {
                props.merchants && Object.keys(props.merchants).map(merchant => {
                  let merchObj = props.merchants[merchant];
                  return (
                    <tr className="tr-game-summary" key={merchant}>
                      <td className="td-name">{merchObj.id}</td>
                      <td className="td-center">{merchObj.wheelbarrow.ruby}</td>
                      <td className="td-center">{merchObj.wheelbarrow.money}</td>
                      <td className="td-center">{merchObj.wheelbarrow.heirloom}</td>
                      <td className="td-center">{merchObj.wheelbarrow.fabric}</td>
                      <td className="td-center">{merchObj.wheelbarrow.fruit}</td>
                      <td className="td-center">{merchObj.wheelbarrow.spice}</td>
                    </tr>
                  );
                })
              }
          </tbody>
      </table>
    </section>
  );
}

export default GameSummary;
