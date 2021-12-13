import React from "react";
import ReactDOM from "react-dom";

import ApplicationDriver from './ApplicationDriver';
import DataTools from './utils/DataTools';

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
      let app=this.apps [i];
      console.log ("Window: " + app.id + ", modal: " + app.modal + ", centered: " + app.centered + ", type: " + app.type + ", shown: " + app.shown);
    }
  }

  /**
   *
   */
  toggleApp (anId) {
    console.log ("toggleApp ("+anId+")");

    let appData=this.getApps();

    for (let i=0;i<appData.length;i++) {
      let app=appData [i];

      //console.log ("Comparing " + app.id + ", to: " + anId);

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
      let app=appData [i];

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

    anApplication.shown=true;
    anApplication.maximized=false;
    anApplication.index=this.index;
    anApplication.id=uuidv4();

    if (anApplication.hasOwnProperty ("modal")==false) {
      anApplication.modal=false;
    }    

    if (anApplication.hasOwnProperty ("centered")==false) {
      console.log ("Window template doesn't have centered attribute");
      if (anApplication.modal==true) {
        anApplication.centered=true;
      } else {
        anApplication.centered=false;        
      }
    }

    if (anApplication.hasOwnProperty ("x")==false) {
      anApplication.x=this.dataTools.getRandomInt (100);
    }

    if (anApplication.hasOwnProperty ("y")==false) {
      anApplication.y=this.dataTools.getRandomInt (100);
    }    

    if (anApplication.hasOwnProperty ("width")==false) {
      anApplication.x=320;
    }

    if (anApplication.hasOwnProperty ("height")==false) {
      anApplication.y=200;
    }        

    this.index++;

    this.apps.push (anApplication);

    if (this.onUpdate) {
      this.onUpdate ();
    }
  }
}
