import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  onOverlayClick() {
    return this.props.onClose ? this.props.onClose() : null;
  }

  onDialogClick(evt) {
    evt.stopPropagation();
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="modal-anim"
        transitionAppear={true}
        transitionAppearTimeout={300}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div key="modal">
          <div className="modal-overlay-div"/>
            <div className="modal-content-div" onClick={this.onOverlayClick.bind(this)}>
            <div className="modal-dialog-div" onClick={this.onDialogClick}>                         
              {this.props.children}
            </div>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
};

export default Modal;
