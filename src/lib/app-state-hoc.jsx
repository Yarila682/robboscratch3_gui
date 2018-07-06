import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import throttle from 'redux-throttle';
import thunk from 'redux-thunk';

import {intlInitialState, IntlProvider} from '../reducers/intl.js';
import reducer from '../reducers/gui';

import {connect} from 'react-redux';

import IntlStateWrapper from './intl-state-hoc.jsx';

import IntlWrapper from './intl-wrapper.jsx';



// import defaultsDeep from 'lodash.defaultsdeep';
// import guiMessages from 'scratch-l10n/locales/gui-msgs';
// import paintMessages from 'scratch-l10n/locales/paint-msgs';
// import penMessages from 'scratch-l10n/locales/pen-msgs';

//const combinedMessages = defaultsDeep({}, guiMessages.messages, paintMessages.messages, penMessages.messages);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(
        throttle(300, {leading: true, trailing: true}),
        thunk
    )
);
const store = createStore(reducer, intlInitialState, enhancer);

import ErrorBoundary from '../containers/error-boundary.jsx';

/*
 * Higher Order Component to provide redux state
 * @param {React.Component} WrappedComponent - component to provide state for
 * @returns {React.Component} component with redux and intl state provided
 */
const AppStateHOC = function (WrappedComponent) {
    const AppStateWrapper = ({...props}) => (
        <Provider store={store}>
          <IntlWrapper>
            <IntlStateWrapper>
              <ErrorBoundary>
                  <WrappedComponent {...props} />
              </ErrorBoundary>
            </IntlStateWrapper>

          </IntlWrapper>


        </Provider>
    );

  //   function mapStateToProps(state) {
  //
  //      new_intl: state.intl
  // }
  //
  // function mapDispatchToProps(dispatch) {
  //   return {
  //
  //   };
  // }
  // return connect(mapStateToProps, mapDispatchToProps)(AppStateWrapper);

    return AppStateWrapper;
};



export default AppStateHOC;
