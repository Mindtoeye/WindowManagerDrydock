import React from "react";
import ReactDOM from "react-dom";

import ApplicationDriver from './ApplicationDriver';

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

  	this.apps=[];

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

    let appData=this.getAppData();

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

    this.setAppData (appData);
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
  build () {
  	console.log ("build ()");

  	//this.pushApps ();

    this.addApplication ({
      window: null,
      application: null,
      icon: null,
      title: "Empty Window Test",
      type: "window",
      x: 10,
      y: 10,
      width: 320,
      height: 200,
      id: uuidv4()
    });

    this.addApplication ({
      window: null,
      application: null,
      icon: null,
      title: "Empty Window Test 2",
      type: "window",
      x: 50,
      y: 50,
      width: 400,
      height: 320,
      id: uuidv4()
    });    

    //this.popApps ();
  }

  /**
   *
   */
  addApplication (anApplication, aCallback) {
    /*
    if (this.apps==null) {
      this.pushApps ();	
    }
    */

    anApplication.shown=true;
    anApplication.maximized=false;

    this.apps.push (anApplication);
  }
}
