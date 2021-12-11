import React from "react";
import ReactDOM from "react-dom";

import Window from './Window';
import Dialog from './Dialog';
import ToolWindow from './ToolWindow';
import WindowBasicApplication from './WindowBasicApplication';
import WindowApplication from './WindowApplication';
import Scrim from './Scrim';
import DataTools from './utils/DataTools';

import './styles/darktheme.css';
import './styles/wmanager.css';

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
  componentDidUpdate(prevProps) {
    console.log ("componentDidUpdate ()");
  }

  /**
   *
   */
  updateWindowStack () {
    this.setState(this.state);
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
        if (list [k].type=="dialog") {          
          if (list [k].modal==true) {
            //console.log ("Modal dialog clicked, nop");
            return;
          }
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
  }

  /**
   *
   */
  render () {
    let scrim=<Scrim visible={false}></Scrim>;
    let windows=[];
    let zIndex=1;

    let windowReferences=this.props.appManager.getApps ();
    
    for (var k=0;k<windowReferences.length;k++) {
      let aTemplate=windowReferences [k];

      if (aTemplate.maximized==true) {
        return (aTemplate.content);
      }

      if (aTemplate.type=="dialog") {
        if (aTemplate.mode=="modal") {
          scrim=<Scrim visible={true}></Scrim>;
        }
      }
    }

    var modalTop=null;

    for (var i=0;i<windowReferences.length;i++) {
      let aTemplate=windowReferences [i];

      //>-----------------------------------------------------

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

      //>-----------------------------------------------------      

      if (aTemplate.type=="dialog") {      
        if (aTemplate.shown==true) { 
          if (aTemplate.hasOwnProperty ("modal")==true) {
            if (aTemplate.modal==true) {
              modalTop=aTemplate;
            }
          }

          if (modalTop==null) {
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
        }
      }

      //>-----------------------------------------------------

      if (aTemplate.type=="toolwindow") { 
        if (aTemplate.shown==true) {           
          windows.push (<ToolWindow 
            settings={this.props.settings} // from globalSettings
            ref={"win"+aTemplate.index} 
            reference={aTemplate} 
            id={aTemplate.id} 
            key={aTemplate.index} 
            popWindow={this.popWindow.bind(this)} 
            deleteWindow={this.deleteWindow.bind(this)}>
              {aTemplate.content}
          </ToolWindow>);
        }
      }

      //>-----------------------------------------------------

      if (aTemplate.type=="applicationwindow") { 
        if (aTemplate.shown==true) {           
          windows.push (<WindowApplication 
            settings={this.props.settings} // from globalSettings
            ref={"win"+aTemplate.index} 
            reference={aTemplate} 
            id={aTemplate.id} 
            key={aTemplate.index} 
            popWindow={this.popWindow.bind(this)} 
            deleteWindow={this.deleteWindow.bind(this)}>
              {aTemplate.content}
          </WindowApplication>);
        }
      }

      //>-----------------------------------------------------

      if (aTemplate.type=="basicapplicationwindow") { 
        if (aTemplate.shown==true) {           
          windows.push (<WindowBasicApplication 
            settings={this.props.settings} // from globalSettings
            ref={"win"+aTemplate.index} 
            reference={aTemplate} 
            id={aTemplate.id} 
            key={aTemplate.index} 
            popWindow={this.popWindow.bind(this)} 
            deleteWindow={this.deleteWindow.bind(this)}>
              {aTemplate.content}
          </WindowBasicApplication>);
        }
      }      

      //>-----------------------------------------------------
    }

    if (modalTop!=null) {
      windows.push (<Scrim key={-1} visible={true}/>);
      windows.push (<Dialog 
        settings={this.props.settings} // from globalSettings
        ref={"win"+modalTop.index} 
        reference={modalTop} 
        id={modalTop.id} 
        key={modalTop.index} 
        popWindow={this.popWindow.bind(this)} 
        deleteWindow={this.deleteWindow.bind(this)}>
          {modalTop.content}
      </Dialog>);
    }

    let windowClass="desktopContent " + this.props.classes;

    return (<div tabIndex="0" onKeyDown={this.onKeyDown} className={windowClass}>      
      {this.props.children}
      {windows}
    </div>);
  }
}

export default WindowManager;
