import React, { Component } from 'react';

import { KnossysInfoPanel, KButton, KList } from '@knossys/knossys-ui-core';

import WindowManager from './lib/components/WindowManager';
import ApplicationManager from './lib/components/ApplicationManager';
import { uuidv4 } from './lib/components/utils/uuid';
import WindowConstants from './lib/components/WindowConstants';

import '../css/main.css';
import '../css/drydock.css';

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
       
    this.onKeyDown=this.onKeyDown.bind (this);
    this.updateWindowStack=this.updateWindowStack.bind (this);

    this.appManager=new ApplicationManager ();
    this.appManager.setOnUpdate (this.updateWindowStack);
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
    console.log ("onKeyDown ("+e.keyCode+")");

    // 'd'
    if(e.keyCode==68) {
      console.log ("Showing modal dialog ...");

      this.appManager.addApplication ({
        title: "Modal Dialog",
        type: WindowConstants.WINDOW_DIALOG,
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
        type: WindowConstants.WINDOW_DIALOG,
        modal: false,
        centered: true,
        resizable: true,
        width: 320,
        height: 200
      });
    }

    // 't'
    if(e.keyCode==84) {
      console.log ("Showing tool window ...");

      this.appManager.addApplication ({
        title: "Tool Window",
        type: WindowConstants.WINDOW_TOOLWINDOW,
        width: 50,
        height: 300
      });
    }    

    // 'w'
    if(e.keyCode==87) {
      console.log ("Showing generic window ...");

      this.appManager.addApplication ({
        title: "Generic Window",
        type: WindowConstants.WINDOW_DEFAULT,
        width: 320,
        height: 200
      });
    }        

    // 'a'
    if(e.keyCode==65) {
      console.log ("Showing application window ...");

      this.appManager.addApplication ({
        title: "Application",
        type: WindowConstants.WINDOW_APPLICATION,
        width: 400,
        height: 300
      });      
    }

    // 'b'
    if(e.keyCode==66) {
      console.log ("Showing basic application window ...");

      this.appManager.addApplication ({
        title: "Basic Application",
        type: WindowConstants.WINDOW_BASICAPPLICATION,
        width: 400,
        height: 300
      });      
    }    

    // 'c'
    if(e.keyCode==67) {
      console.log ("Showing confirm dialog ...");
    }        

    // 'l'
    if(e.keyCode==76) {
      console.log ("Listing windows ...");

      this.appManager.listWindows();
    }            

    this.updateWindowStack ();
  }

  /**
   *
   */
  render() {
    let apps=this.appManager.getApps ();

    let windowList=[];

    for (let i=0;i<apps.length;i++) {
      let app=apps[i];
      windowList.push ("Window: " + app.id + ", modal: " + app.modal + ", centered: " + app.centered + ", type: " + app.type + ", shown: " + app.shown);
    }

    return (
     <WindowManager 
        onKeyDown={this.onKeyDown}
        settings={this.state.globalSettings}
        appManager={this.appManager}>

        <div className="windowlistpanel">
          <KList list={windowList} itemclass="windowlistitem" />
        </div>

        <div className="drydockpanel">
          <p>Use the following keys to show and test the various window manager features</p>
          <p>  <span style={{color: "yellow"}}>d</span>: show modal dialog</p>
          <p>  <span style={{color: "yellow"}}>s</span>: show modeless dialog</p>          
          <p>  <span style={{color: "yellow"}}>t</span>: show tool window</p>          
          <p>  <span style={{color: "yellow"}}>w</span>: add generic window</p>
          <p>  <span style={{color: "yellow"}}>a</span>: add application</p>
          <p>  <span style={{color: "yellow"}}>b</span>: add basic application</p>
          <p>  <span style={{color: "yellow"}}>c</span>: show confirm modal dialog</p>
          <p>  <span style={{color: "yellow"}}>l</span>: list windows</p>
        </div>
      </WindowManager>
    );
  }
}

export default DryDock;
