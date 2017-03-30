import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/** ------- Selectors --------- */
import { getGameId } from '../redux/reducers/game-reducer';

/** ------- AppContainer ------- */
const AppContainer = ({ children, location }) => {
  return (
    <div>
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {
          React.cloneElement(  // for transitions with react-router v.3
            children,
            {key: location.pathname}
          )
        }
      </ReactCSSTransitionGroup>
    </div>
  );
};

/** -------- Higher Order Component listening to Firebase and loading game state onto Redux store -------- */
const firebaseConnectWrapper = firebaseConnect(({ gameId }) => ([`games/${gameId}`, `gameLog/${gameId}`]))(AppContainer);

const mapStateToProps = state => ({
  gameId: getGameId(state)
});

export default connect(mapStateToProps)(firebaseConnectWrapper);
