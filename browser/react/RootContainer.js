import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class RootContainer extends React.Component {
  render() {
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {React.cloneElement(this.props.children, {
            key: this.props.location.pathname
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  };


}
export default RootContainer;