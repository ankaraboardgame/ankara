import React from 'react';

const Footer = () => {
  return (
    <footer className="page-footer black">
      <div className="container">
        <div className="row">
          <div className="col s2"><p className="white-text">WB Size: 3</p></div>
          <div className="col s1"><p className="white-text">Fruits: 3</p></div>
          <div className="col s1"><p className="white-text">Fabric: 3</p></div>
          <div className="col s1"><p className="white-text">Spices: 3</p></div>
          <div className="col s1"><p className="white-text">Gems: 2</p></div>
          <div className="col s2 offset-s1"><p className="white-text">Money: $30</p></div>
          <div className="col s1"><p className="white-text">Rubies: 2</p></div>
          <div className="col s1 offset-s1"><p className="white-text">Exit</p></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
