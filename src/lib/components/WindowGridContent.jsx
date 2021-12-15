import React from "react";

import WindowTools from './utils/WindowTools';
import { uuidv4 } from './utils/uuid';

/**
 *
 */
export class WindowDummyContent extends React.Component {

  /**
  *
  */
  constructor(props){
    super(props);

    this.state = {
      id: uuidv4(),
      width: this.props.reference.width,
      height: this.props.reference.height,
    };

    this.windowTools=new WindowTools ();
  }

  /**
   *
   */  
  render() {
    return (<div ref={this.state.id} id={this.state.id} className="windowDebug">
      {this.windowTools.generateGrid ()} 
    </div>);
  }
}

export default WindowDummyContent;
