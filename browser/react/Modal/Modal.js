import React, { Component } from 'react';

export default class Modal extends Component {

    render() {
        const overlayStyle = this.props.overlayStyle ? this.props.overlayStyle : {};
        const contentStyle = this.props.contentStyle ? this.props.contentStyle : {};
        const dialogStyle = this.props.dialogStyle ? this.props.dialogStyle : {};
        return (
            <div>
              <div className="modal-overlay-div" style={overlayStyle} />
              <div className="modal-content-div" style={contentStyle}>
                <div className="modal-dialog-div" style={dialogStyle}>
                    {this.props.children}
                </div>
              </div>
            </div>
        );
    }
}
