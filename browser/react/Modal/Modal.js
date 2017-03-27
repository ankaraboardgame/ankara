import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Modal extends Component {

  onOverlayClick() {
    return this.props.onClose ? this.props.onClose() : null;
  }

  onDialogClick(evt) {
    evt.stopPropagation();
  }

  render() {
    const overlayStyle = this.props.overlayStyle ? this.props.overlayStyle : {};
    const contentStyle = this.props.contentStyle ? this.props.contentStyle : {};
    const dialogStyle = this.props.dialogStyle ? this.props.dialogStyle : {};
    return (
      <ReactCSSTransitionGroup
        transitionName="modal-anim"
        transitionAppear={true}
        transitionAppearTimeout={300}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div key="modal">
          <div className="modal-overlay-div" style={overlayStyle} />
            <div className="modal-content-div" style={contentStyle} onClick={this.onOverlayClick.bind(this)}>
            <div className="modal-dialog-div" style={dialogStyle} onClick={this.onDialogClick}>                         
              {this.props.children}
            </div>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}
