import React, { Component } from 'react';

//import DataTools from './utils/datatools';
import WindowManager from './WindowManager';
import ApplicationManager from './ApplicationManager';

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

    this.state = {
      globalSettings: {}
    }
    
    //this.dataTools=new DataTools ();
    this.appManager=new ApplicationManager ();
    this.appManager.build (); // This should give us at least 1 dummy app
  }

  /**
   *
   */
  render() {
    let apps=this.appManager.getApps ();

    var desktopPanels=[];
    var desktopWidgets=[];

    return (
     <WindowManager 
        ref="desktop" 
        settings={this.state.globalSettings}
        appManager={this.appManager}>
        {desktopWidgets}
        {desktopPanels}
      </WindowManager>
    );
  }
}

export default DryDock;
