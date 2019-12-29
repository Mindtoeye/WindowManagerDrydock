import React, { Component } from 'react';

import DataTools from './utils/datatools';
import WindowManager from './WindowManager';

import '../../css/main.css';

/**
 * 
 */
class DryDock extends Component {

  /**
   *
   */
  constructor(props) {
    super(props);
    
    this.dataTools=new DataTools ();
  }

  /**
   *
   */
  render() {
    return (
     <WindowManager />
    );
  }
}

export default DryDock;
