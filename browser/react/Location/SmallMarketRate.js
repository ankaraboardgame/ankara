import React from 'react';

const SmallMarketRate = () => {
  const images = ['tile_1.png', 'tile_2.png', 'tile_3.png', 'tile_4.png', 'tile_5.png'];
  const random = Math.floor(Math.random()*5) // random number between 0 to 4 (index)
  return (
    <div id="exchange-card">
      <img src={ `./images/market/small/${ images[random] }` } />
    </div>
  )
}

export default SmallMarketRate;
