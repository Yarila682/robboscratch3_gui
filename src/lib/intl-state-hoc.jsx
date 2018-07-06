import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import throttle from 'redux-throttle';
import thunk from 'redux-thunk';

import {intlInitialState, IntlProvider} from '../reducers/intl.js';
import reducer from '../reducers/gui';

import {connect} from 'react-redux';


const IntlStateWrapper= props => {

    return (

      <IntlProvider locale={props.new_intl.locale} messages={props.new_intl.messages} key={props.new_intl.locale}>
          {props.children}
      </IntlProvider>
    );
};





const mapStateToProps =  state => ({

      new_intl:state.intl
  });

const mapDispatchToProps = dispatch => ({



});

  export default connect(mapStateToProps, mapDispatchToProps)(IntlStateWrapper);


  //  return IntlStateWrapper;
