import React from "react";
import ReactDOM from "react-dom";

import Window from './Window';
import Dialog from './Dialog';
import DataTools from './utils/DataTools';

import '../../css/darktheme.css';
import '../../css/wmanager.css';

/**
 *
 */
export class WindowManager extends React.Component {

  /**
   *
   */
  constructor(props){
    super(props);

    this.state={
      pop: 0
    };

    this.dataTools=new DataTools ();

    this.onKeyDown=this.onKeyDown.bind (this);
  }

  /**
   *
   */
  onKeyDown (e) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown (e);
    }
  }

  /**
   *
   */
  deleteWindow (aWindow) {
    console.log ("deleteWindow ("+aWindow+")");

    if (this.props.deleteWindow) {
      this.props.deleteWindow (aWindow);
    }
  }  

  /**
   *
   */
  addWindow (aContent,anIcon,aLabel,aShown) {
    console.log ("addWindow ()");

    if (this.props.addWindow) {
      this.props.addWindow (aContent,anIcon,aLabel,aShown);
    }
  }

  /**
   *
   */
  addDialog (aContent) {
    console.log ("addDialog ()");

    if (this.props.addDialog) {
      this.props.addDialog (aContent);
    }
  }  

  /**
   *
   */
  addModal (aContent) {
    console.log ("addModal ()");

    if (this.props.addModel) {
      this.props.addModel (aContent);
    }
  }   

  /**
   *
   */
  addDesktopWidget (aContent) {
    console.log ("addDesktopWidget ()");

    if (this.props.addDesktopWidget) {
      this.props.addDesktopWidget (aContent);
    }
  }    

  /**
   *
   */
  maximizeWindow (targetWindow) {
    //console.log ("maximizeWindow("+targetWindow+")");

    let list=this.props.appManager.getApps ();

    for (let j=0;j<list.length;j++) {
      list [j].maximized=false;
    }

    for (let i=0;i<list.length;i++) {
      if (list [i].id==targetWindow) {
        list [i].maximized=true;
      }
    }
  }

  /**
   *
   */
  popWindow (targetWindow) {
    //console.log ("popWindow("+targetWindow+")");

    let list=this.props.appManager.getApps ();

    // This method should be a no-op if we're displaying a modal dialog
    for (let k=0;k<list.length;k++) {
      if (list [k].id==targetWindow) {
        if (list [k].modal==true) {
          return;
        }
      }
    }

    for (let j=0;j<list.length;j++) {
      list [j].selected=false;
    }

    for (let i=0;i<list.length;i++) {
      let win=list [i];
      if (win.id==targetWindow) {
        //console.log ("Take out of the list/remove from current z position");
        let updated=this.dataTools.deleteElement (list,win);
        //console.log ("Push to the top of the list");
        win.selected=true;
        updated.push (win);
        this.setState ({pop: this.state.pop++});
        return;
      }
    }

    //this.props.list (updated);
    //this.props.appManager.setApps (updated);
  }

  /**
   *
   */
  render () {
    let windows=[];
    let zIndex=1;

    let windowReferences=this.props.appManager.getApps ();
    
    for (var k=0;k<windowReferences.length;k++) {
      let aTemplate=windowReferences [k];

      if (aTemplate.maximized==true) {
        return (aTemplate.content);
      }
    }

    for (var i=0;i<windowReferences.length;i++) {
      let aTemplate=windowReferences [i];

      if (aTemplate.type=="window") {
        if (aTemplate.shown==true) {
          //windows.push (<WindowApplication settings={this.props.settings} ref={reference} windowReference={aTemplate} id={aTemplate.id} key={aTemplate.index} title={aTemplate.title} xPos={aTemplate.x} yPos={aTemplate.y} width={"320px"} height={"320px"} popWindow={this.popWindow.bind(this)} deleteWindow={this.deleteWindow.bind(this)} maximizeWindow={this.maximizeWindow.bind(this)}>{aTemplate.window}</WindowApplication>);
          windows.push (<Window 
            settings={this.props.settings} // from globalSettings
            ref={"win"+aTemplate.index} 
            reference={aTemplate} 
            id={aTemplate.id} 
            key={aTemplate.index} 
            popWindow={this.popWindow.bind(this)} 
            deleteWindow={this.deleteWindow.bind(this)} 
            maximizeWindow={this.maximizeWindow.bind(this)}>
              {aTemplate.window}
          </Window>);

          zIndex++;
        }
      }
    }

    for (var j=0;j<windowReferences.length;j++) {
      let aTemplate=windowReferences [j];
      let centered="false";

      if (aTemplate.type=="dialog") {
        if (aTemplate.hasOwnProperty (centered)==true) {
          if (aTemplate.centered==true) {
            centered="true";
          }
        }
        windows.push (<Dialog 
          settings={this.props.settings} // from globalSettings
          ref={"win"+aTemplate.index} 
          reference={aTemplate} 
          id={aTemplate.id} 
          key={aTemplate.index} 
          popWindow={this.popWindow.bind(this)} 
          deleteWindow={this.deleteWindow.bind(this)}>
            {aTemplate.content}
        </Dialog>);
      }
      
      zIndex++; 
    }    

    let windowClass="desktopContent";

    return (<div tabIndex="0" onKeyDown={this.onKeyDown} className={windowClass}>{this.props.children}{windows}</div>);
  }
}

export default WindowManager;
