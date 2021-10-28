import React, { Component } from 'react';

//import DataTools from './utils/datatools';
import WindowManager from './WindowManager';
import ApplicationManager from './ApplicationManager';

import '../../css/main.css';
import '../../css/drydock.css';

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
       
    this.appManager=new ApplicationManager ();
    this.appManager.build (); // This should give us at least 1 dummy app
  }

  /**
   *
   */
  onKeyDown (e) {
    //console.log ("onKeyDown ("+e.keyCode+")");

    // 'd'
    if(e.keyCode==68) {
      console.log ("Showing modal dialog ...");

    }

    // 's'
    if(e.keyCode==83) {
      console.log ("Showing modeless dialog ...");

    }

    // 'w'
    if(e.keyCode==87) {
      console.log ("Showing generic window ...");

    }        

    // 'a'
    if(e.keyCode==65) {
      console.log ("Showing application window ...");
    }

    // 'c'
    if(e.keyCode==67) {
      console.log ("Showing confirm dialog ...");
    }        
  }

  /**
   *
   */
  render() {
    let apps=this.appManager.getApps ();

    return (
     <WindowManager 
        onKeyDown={this.onKeyDown}
        ref="desktop" 
        settings={this.state.globalSettings}
        appManager={this.appManager}>
        <div className="drydockpanel">
          <p>Use the following keys to show and tes the various window manager features</p>
          <p>  d: show modal dialog</p>
          <p>  s: show modeless dialog</p>          
          <p>  w: show generic window</p>
          <p>  a: show application window</p>
          <p>  c: show confirm modal dialog</p>
        </div>
      </WindowManager>
    );
  }
}

export default DryDock;
