import React from "react";
import ReactDOM from "react-dom";

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
      x: this.props.windowReference.x,
      y: this.props.windowReference.y,
      width: this.props.windowReference.width,
      height: this.props.windowReference.height,
    };
  }

  /**
   *
   */  
  render() {
    return (<div ref={this.state.id} id={this.state.id} className="windowDebug">
      <p>Initial x: {this.state.x}</p>
      <p>Initial y: {this.state.y}</p>
      <p>Initial width: {this.state.width}</p>
      <p>Initial height: {this.state.height}</p>
    </div>);
  }
}

export default WindowDummyContent;
