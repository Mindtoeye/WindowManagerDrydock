import React, { Component } from 'react';

import { KnossysInfoPanel, KButton, KList } from '@knossys/knossys-ui-core';

import './styles/wtaskmanager.css';

/**
 * 
 */
class WindowTaskManager extends Component {
  
  /**
   *
   */
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  /**
   * 
   */
  render () {
    console.log ("WindowTaskManager:render()");

    let windowList=[];

    let appManager=this.props.appManager;

    let winlist=appManager.getApps ();

    for (let i=0;i<winlist.length;i++) {
      let app=winlist[i];      
      windowList.push (<div key={"winitem-"+i} className="wtaskmanageritem"><div className="wtaskmanagertitle">{app.title}</div><div className="wtaskmanagercontent">{"modal: " + app.modal + ", centered: " + app.centered + ", type: " + app.type + ", shown: " + app.shown}</div></div>);
    }

    return (<div className="wtaskmanager">
      {windowList}
     </div>);
  }
}

export default WindowTaskManager;
