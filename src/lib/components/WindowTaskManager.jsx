import React, { Component } from 'react';

import { KnossysInfoPanel, KButton, KList, KToolbar, KToolbarItem } from '@knossys/knossys-ui-core';

import { AiOutlineSortAscending, AiOutlineSortDescending, AiOutlineToTop } from 'react-icons/ai';
import { BsStack } from 'react-icons/bs';

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

    let appManager=this.props.appManager;

    this.state = {
      winlist: appManager.getApps ()
    };

    this.onToolbarItemClick=this.onToolbarItemClick.bind(this);
    this.onSelectWindow=this.onSelectWindow.bind(this);
  }

  /**
   * 
   */
  getWinList () {
    if (this.props.hasOwnProperty ("appManager")==false) {
      return ([]);
    }

    let appManager=this.props.appManager;

    let winlist=appManager.getApps ();

    return (winlist);
  }

  /**
   * 
   */
  onToolbarItemClick (e, anIndex) {
    console.log ("onToolbarItemClick ("+anIndex+")");

  }

  /**
   * 
   */
  onSelectWindow (e, anIndex) {
    console.log ("onSelectWindow ("+anIndex+")");

  }  

  /**
   * 
   */
  render () {
    console.log ("WindowTaskManager:render()");

    let itemClass="wtaskmanageritem";

    let windowList=[];

    let winlist=this.getWinList ();

    for (let i=0;i<winlist.length;i++) {
      let app=winlist[i];

      // Don't show windows and elements that are part of the Knossys system itself
      if (app.hasOwnProperty ("isSystem")==true) {
        if (app.isSystem==false) {
          windowList.push (<div key={"winitem-"+i} className={itemClass} onClick={(e) => this.onSelectWindow (e,i)}><div className="wtaskmanagertitle">{app.title}</div><div className="wtaskmanagercontent">{"modal: " + app.modal + ", centered: " + app.centered + ", type: " + app.type + ", shown: " + app.shown}</div></div>);
        }
      } else {
        windowList.push (<div key={"winitem-"+i} className={itemClass}><div className="wtaskmanagertitle">{app.title}</div><div className="wtaskmanagercontent">{"modal: " + app.modal + ", centered: " + app.centered + ", type: " + app.type + ", shown: " + app.shown}</div></div>);
      }
    }

    return (<div className="wtaskmanager">
      <KToolbar direction={KToolbar.DIRECTION_VERTICAL}>
        <KToolbarItem onClick={(e) => this.onToolbarItemClick (e,1)} toggle={true} tooltip="Sort based on z-order"><BsStack /></KToolbarItem>
        <KToolbarItem onClick={(e) => this.onToolbarItemClick (e,2)} toggle={true} tooltip="Sort by window title"><AiOutlineSortAscending /></KToolbarItem>
        <KToolbarItem onClick={(e) => this.onToolbarItemClick (e,3)} toggle={true} tooltip="Sort by window title"><AiOutlineSortDescending /></KToolbarItem>
        <KToolbarItem onClick={(e) => this.onToolbarItemClick (e,4)} toggle={true} tooltip="Move to top"><AiOutlineToTop /></KToolbarItem>
        <div className="wtaskvpadding">&nbsp;</div>
      </KToolbar>
      <div className="wtasklist">
        {windowList}
      </div>  
     </div>);
  }
}

export default WindowTaskManager;
