import React from "react";

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
      x: this.props.reference.x,
      y: this.props.reference.y,
      width: this.props.reference.width,
      height: this.props.reference.height,
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
      <p>Width: {this.state.width}</p>
      <p>Height: {this.state.height}</p>      
    </div>);
  }
}

export default WindowDummyContent;
