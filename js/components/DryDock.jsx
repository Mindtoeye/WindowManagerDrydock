import React, { Component } from 'react';

//import DataTools from './utils/datatools';
import WindowManager from './WindowManager';
import ApplicationManager from './ApplicationManager';
import { uuidv4 } from './utils/uuid';

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

    /*
    // Empty dummy window
    this.appManager.addApplication ({
      window: null,
      application: null,
      icon: null,
      title: "Empty Window Test 1",
      type: "window",
      x: 10,
      y: 10,
      width: 320,
      height: 200
    });

    // Empty dummy window
    this.appManager.addApplication ({
      window: null,
      application: null,
      icon: null,
      title: "Empty Window Test 2",
      type: "window",
      x: 50,
      y: 50,
      width: 400,
      height: 320
    });
    */

    this.onKeyDown=this.onKeyDown.bind (this);
    this.updateWindowStack=this.updateWindowStack.bind (this);
  }

  /**
   * This will go into the app manager
   */
  updateWindowStack () {
    this.setState(this.state);
  }  

  /**
   *
   */
  onKeyDown (e) {
    //console.log ("onKeyDown ("+e.keyCode+")");

    // 'd'
    if(e.keyCode==68) {
      console.log ("Showing modal dialog ...");

      this.appManager.addApplication ({
        title: "Modal Dialog",
        type: "dialog",
        modal: true,
        centered: true,
        width: 320,
        height: 200
      });
    }

    // 's'
    if(e.keyCode==83) {
      console.log ("Showing modeless dialog ...");

      this.appManager.addApplication ({
        title: "Modeless Dialog",
        type: "dialog",
        modal: false,
        centered: true,
        width: 320,
        height: 200
      });
    }

    // 'w'
    if(e.keyCode==87) {
      console.log ("Showing generic window ...");

      this.appManager.addApplication ({
        title: "Generic Window",
        type: "window",
        width: 320,
        height: 200
      });
    }        

    // 'a'
    if(e.keyCode==65) {
      console.log ("Showing application window ...");
    }

    // 'c'
    if(e.keyCode==67) {
      console.log ("Showing confirm dialog ...");
    }        

    this.updateWindowStack ();
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
          <p>Use the following keys to show and test the various window manager features</p>
          <p>  d: show modal dialog</p>
          <p>  s: show modeless dialog</p>          
          <p>  w: add generic window</p>
          <p>  a: add application window</p>
          <p>  c: show confirm modal dialog</p>
        </div>
      </WindowManager>
    );
  }
}

export default DryDock;
