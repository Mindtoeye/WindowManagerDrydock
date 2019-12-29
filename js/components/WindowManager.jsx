import React from "react";
import ReactDOM from "react-dom";

import '../../css/wmanager.css';

/**
 *
 */
export class WindowManager extends React.Component {

  /**
   *
   */
  constructor(props){
    super(props);

    this.state={      
    };
  }

  /**
   *
   */
  render () {
    return (<div id="desktop" className="desktop"></div>);
  }
}

export default WindowManager;
