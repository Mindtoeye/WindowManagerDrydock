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
  constructor (aSetDriverData,aGetDriverData,aGetDriverReference,aSetAppData,aGetAppData,aGetAppReference) {
  	super ();

    this.index=0;
  	this.apps=[];
    this.dataTools=new DataTools ();

    this.onUpdate=null;

  	this.setDriverData=aSetDriverData;
  	this.getDriverData=aGetDriverData;
  	this.getDriverReference=aGetDriverReference;
  	this.setAppData=aSetAppData;
  	this.getAppData=aGetAppData;
  	this.getAppReference=aGetAppReference;
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
  toggle (anId) {
    console.log ("toggle ("+anId+")");

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
  getApps () {
    return (this.apps);
  }

  /**
   * 
   */
  setApps (aSet) {
    this.apps=aSet;
  }

  /**
   *
   */
  build () {
  	console.log ("build ()");
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
