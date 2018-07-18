import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './FirmwareFlasherComponent.css';

import {defineMessages, intlShape, injectIntl, FormattedMessage} from 'react-intl';


  const messages = defineMessages({

  });

class FirmwareFlasherComponent extends Component {


  componentDidMount () {



  }




  render() {

  return (


  );
}

}

const mapStateToProps =  state => ({


  });

const mapDispatchToProps = dispatch => ({




});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(FirmwareFlasherComponent));
