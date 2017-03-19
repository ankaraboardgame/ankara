import React from 'react';

const Footer = () => {
  return (
    <footer className="page-footer black">
      <div className="container">
        <div className="row">
          <div className="col s2"><p className="white-text"><img className="img-circle" src="./images/cart/Wheelbarrow.png" /> 3</p></div>
          <div className="col s1"><p className="white-text"><img className="img-circle" src="./images/cart/Fruits.png" /> 3</p></div>
          <div className="col s1"><p className="white-text"><img className="img-circle" src="./images/cart/Fabric.png" /> 3</p></div>
          <div className="col s1"><p className="white-text"><img className="img-circle" src="./images/cart/Spices.png" /> 3</p></div>
          <div className="col s1"><p className="white-text"><img className="img-circle" src="./images/cart/Gems.png" /> 2</p></div>
          <div className="col s2 offset-s1"><p className="white-text">Money: $30</p></div>
          <div className="col s1"><p className="white-text">Rubies: 2</p></div>
          <div className="col s1 offset-s1"><p className="white-text">Exit</p></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
