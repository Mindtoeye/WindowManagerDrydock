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
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" strokeWidth="0.5"/>
          </pattern>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="url(#smallGrid)"/>
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" strokeWidth="1"/>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>  
    </div>);
  }
}

export default WindowDummyContent;
