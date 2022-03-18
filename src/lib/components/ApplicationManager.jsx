import React from "react";
import ReactDOM from "react-dom";

import ApplicationDriver from './ApplicationDriver';
import DefaultApp from './DefaultApp';
import DataTools from './utils/DataTools';
import WindowConstants from './WindowConstants';
import WindowDummyContent from './WindowDummyContent';
import WindowDummyComponent from './WindowDummyComponent';

import { uuidv4 } from './utils/uuid';

/**
 *
 */
export default class ApplicationManager extends ApplicationDriver {
	
  /**
   *
   */	
  constructor () {
  	super ();

    this.index=0;
  	this.apps=[];
    this.dataTools=new DataTools ();

    this.onUpdate=null;
  }

  /**
   *
   */
  init () {
	  return (null);
  }

  /**
   *
   */
  listWindows () {
    for (let i=0;i<this.apps.length;i++) {
      let app=this.apps [i].data;
      console.log ("Window: " + app.title + ", modal: " + app.modal + ", centered: " + app.centered + ", type: " + app.type + ", shown: " + app.shown);
      console.log (app);
    }
  }

  /**
   *
   */
  toggleApp (anId) {
    console.log ("toggleApp ("+anId+")");

    let appData=this.getApps();

    for (let i=0;i<appData.length;i++) {
      let app=appData [i].data;

      if (app.id==anId) {
        console.log ("Changing visibility of application ...");
      	if (app.shown==true) {
      	  app.shown=false;
      	} else {
      	  app.shown=true;
      	}
      }
    }

    this.setApps (appData);
  }

  /**
   *
   */
  deleteApp (anId) {
    console.log ("deleteApp ("+anId+")");

    let appData=this.getApps();

    for (let i=0;i<appData.length;i++) {
      let app=appData [i].data;

      if (app.id==anId) {
        console.log ("Removing application ...");
        appData.splice(i, 1);
        this.setApps (appData);
        return;
      }
    }
  }  

  /**
   *
   */
  getApps () {
    //return (this.apps);

    let list=[];

    for (let i=0;i<this.apps.length;i++) {
      let windata=this.dataTools.deepCopy (this.apps [i].data);
      list.push (windata);
    }

    return (list);
  }

  /**
   *
   */
  getAppsAll () {
    return (this.apps);
  }  

  /**
   * 
   */
  setApps (aSet) {
    this.apps=aSet;
    if (this.onUpdate) {
      this.onUpdate ();
    } else {
      console.log ("Error: can't update windowing system");
    }
  }

  /**
   *
   */
  setOnUpdate (aCallback) {
    this.onUpdate=aCallback;
  }

  /**
   *
   */
  addApplication (anApplication, aCallback) {    
    console.log ("addApplication ()");

    console.log (anApplication);

    let application={
      data: {
        title: "Knossys Basic Panel",
        type: WindowConstants.WINDOW_DEFAULT,
        x: this.dataTools.getRandomInt (100),
        y: this.dataTools.getRandomInt (100),
        width: 320,
        height: 200,
        resizable: true,
        isSystem: false,
        modal: false,
        selected: false,
        shown: true,
        maximized: false,
        index: this.index,
        id: uuidv4()  
      },
      content: <WindowDummyComponent />,
      app: new DefaultApp ()
    };

    if (anApplication.hasOwnProperty ("type")==true) {    
      application.data.type=anApplication.type;
    }

    if (anApplication.hasOwnProperty ("title")==true) {    
      application.data.title=anApplication.title;
    }    

    if (anApplication.hasOwnProperty ("app")==true) {
      application.app=anApplication.app;
    }

    if (anApplication.hasOwnProperty ("content")==true) {
      application.content=anApplication.content;
    }

    if (application.data.type==WindowConstants.WINDOW_DIALOG) {
      if (anApplication.hasOwnProperty ("resizable")==true) {
        application.data.resizable=anApplication.resizable;
      }
    }

    if (anApplication.hasOwnProperty ("isSystem")==true) {
      application.data.isSystem=anApplication.isSystem;
    }

    if (anApplication.hasOwnProperty ("modal")==true) {
      application.data.modal=anApplication.modal;
    }    

    if (anApplication.hasOwnProperty ("centered")==true) {
      application.data.centered=anApplication.centered;
    }

    if (anApplication.hasOwnProperty ("x")==true) {
      application.data.x=anApplication.x;
    }

    if (anApplication.hasOwnProperty ("y")==true) {
      application.data.y=anApplication.y;
    }

    if (anApplication.hasOwnProperty ("width")==true) {
      application.data.width=anApplication.width;
    }

    if (anApplication.hasOwnProperty ("height")==true) {
      application.data.height=anApplication.height;
    }

    this.index++;

    this.apps.push (application);

    if (this.onUpdate) {
      this.onUpdate ();
    }
  }
}
