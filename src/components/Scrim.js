import React from "react";

import '../../css/wmanager.css';

/**
 *
 */
export class Scrim extends React.Component {

  /**
   *
   */  
  render() {
    if (this.props.visible==true) {
      return (<div className="scrim scrim_visible"></div>);
    }

    return (<div className="scrim"></div>);
  }
}

export default Scrim;
