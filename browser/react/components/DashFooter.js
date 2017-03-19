import React from 'react';

const Footer = () => {
  return (
    <footer className="black">
      <div className="container">
        <div className="row">
          <div className="col s2"><img className="img-circle" src="./images/cart/wheelbarrow.png" /><p className="white-text"> 3</p></div>
          <div className="col s1"><img className="img-circle" src="./images/cart/fruits.png" /><p className="white-text"> 3</p></div>
          <div className="col s1"><img className="img-circle" src="./images/cart/fabric.png" /><p className="white-text"> 3</p></div>
          <div className="col s1"><img className="img-circle" src="./images/cart/spices.png" /><p className="white-text"> 3</p></div>
          <div className="col s1"><img className="img-circle" src="./images/cart/gems.png" /><p className="white-text"> 2</p></div>
          <div className="col s2 offset-s1"><img className="img-money" src="./images/money/lira.png" /><p className="white-text"> $30</p></div>
          <div className="col s1"><img className="img-circle" src="./images/money/ruby.png" /><p className="white-text"> 2</p></div>
          <div className="col s1 offset-s1"><p className="white-text">Exit</p></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
