import React from "react";
import ReactDOM from "react-dom";

import Window from './Window';
import Dialog from './Dialog';
import ToolWindow from './ToolWindow';
import WindowBasicApplication from './WindowBasicApplication';
import WindowApplication from './WindowApplication';
import Scrim from './Scrim';
import DataTools from './utils/DataTools';
import WindowConstants from './WindowConstants';
import WindowDummyComponent from './WindowDummyComponent';

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
      pop: 0,
      trigger: 0
    };

    this.dataTools=new DataTools ();

    this.onKeyDown=this.onKeyDown.bind (this);
  }

  /**
   *
   */
  componentDidUpdate(prevProps) {
    console.log ("componentDidUpdate ()");    
    if (this.props.trigger) {
      if (this.props.trigger!=prevProps.trigger) {
        this.setState ({
          trigger: this.props.trigger
        });
      }
    }
  }

  /**
   *
   */
  updateWindowStack () {
    this.setState({
      trigger: this.state.trigger+1
    });
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
    console.log ("render()");

    let scrim=<Scrim visible={false}></Scrim>;
    let windows=[];
    let zIndex=1;

    let windowReferences=this.props.appManager.getAppsAll ();
    
    for (var k=0;k<windowReferences.length;k++) {
      let aTemplate=windowReferences [k];

      if (aTemplate.data.maximized==true) {
        return (aTemplate.content);
      }

      if (aTemplate.data.type==WindowConstants.WINDOW_DIALOG) {
        if (aTemplate.data.mode=="modal") {
          scrim=<Scrim visible={true}></Scrim>;
        }
      }
    }

    var modalTop=null;
    var aModalContent;

    for (var i=0;i<windowReferences.length;i++) {

      let aTemplate=windowReferences [i].data;
      let aContent;

      if (windowReferences [i].content) {
        if (typeof windowReferences [i].content === 'function') {
          aContent=windowReferences [i].content ();
        } else {
          aContent=windowReferences [i].content;
        }
      }

      if (aContent==undefined) {
        aContent=<WindowDummyComponent />;
      }

      //>-----------------------------------------------------

      if (aTemplate.type==WindowConstants.WINDOW_DEFAULT) {
        if (aTemplate.shown==true) {
          windows.push (<Window 
            appManager={this.props.appManager}
            trigger={this.state.trigger}
            settings={this.props.settings} // from globalSettings
            ref={"win"+aTemplate.index} 
            reference={aTemplate} 
            id={aTemplate.id} 
            key={aTemplate.index} 
            popWindow={this.popWindow.bind(this)} 
            deleteWindow={this.deleteWindow.bind(this)} 
            maximizeWindow={this.maximizeWindow.bind(this)}>
              {React.cloneElement(aContent, { propagationData: this.state.trigger })}
          </Window>);

          zIndex++;
        }
      }

      //>-----------------------------------------------------      

      if (aTemplate.type==WindowConstants.WINDOW_DIALOG) {      
        if (aTemplate.shown==true) { 
          if (aTemplate.hasOwnProperty ("modal")==true) {
            if (aTemplate.modal==true) {
              modalTop=aTemplate;
              aModalContent=aContent;
            }
          }

          if (modalTop==null) {
            windows.push (<Dialog 
              appManager={this.props.appManager}
              trigger={this.state.trigger}              
              settings={this.props.settings} // from globalSettings
              ref={"win"+aTemplate.index} 
              reference={aTemplate} 
              id={aTemplate.id} 
              key={aTemplate.index}
              resizable={aTemplate.resizable}
              popWindow={this.popWindow.bind(this)} 
              deleteWindow={this.deleteWindow.bind(this)}>
                {React.cloneElement(aContent, { propagationData: this.state.trigger })}
            </Dialog>);
          }
        }
      }

      //>-----------------------------------------------------

      if (aTemplate.type==WindowConstants.WINDOW_TOOLWINDOW) { 
        if (aTemplate.shown==true) {           
          windows.push (<ToolWindow 
            appManager={this.props.appManager}
            trigger={this.state.trigger}
            settings={this.props.settings} // from globalSettings
            ref={"win"+aTemplate.index} 
            reference={aTemplate} 
            id={aTemplate.id} 
            key={aTemplate.index} 
            popWindow={this.popWindow.bind(this)} 
            deleteWindow={this.deleteWindow.bind(this)}>
              {React.cloneElement(aContent, { propagationData: this.state.trigger })}
          </ToolWindow>);
        }
      }

      //>-----------------------------------------------------

      if (aTemplate.type==WindowConstants.WINDOW_APPLICATION) { 
        if (aTemplate.shown==true) {           
          windows.push (<WindowApplication 
            appManager={this.props.appManager}            
            trigger={this.state.trigger}
            settings={this.props.settings} // from globalSettings
            ref={"win"+aTemplate.index} 
            reference={aTemplate} 
            id={aTemplate.id} 
            key={aTemplate.index} 
            popWindow={this.popWindow.bind(this)} 
            deleteWindow={this.deleteWindow.bind(this)}>
              {React.cloneElement(aContent, { propagationData: this.state.trigger })}
          </WindowApplication>);
        }
      }

      //>-----------------------------------------------------

      if (aTemplate.type==WindowConstants.WINDOW_BASICAPPLICATION) { 
        if (aTemplate.shown==true) {           
          windows.push (<WindowBasicApplication 
            appManager={this.props.appManager}            
            trigger={this.state.trigger}
            settings={this.props.settings} // from globalSettings
            ref={"win"+aTemplate.index} 
            reference={aTemplate} 
            id={aTemplate.id} 
            key={aTemplate.index} 
            popWindow={this.popWindow.bind(this)} 
            deleteWindow={this.deleteWindow.bind(this)}>
              {React.cloneElement(aContent, { propagationData: this.state.trigger })}
          </WindowBasicApplication>);
        }
      }      

      //>-----------------------------------------------------
    }

    if (modalTop!=null) {
      windows.push (<Scrim key={-1} visible={true}/>);
      windows.push (<Dialog 
        appManager={this.props.appManager}        
        trigger={this.state.trigger}
        settings={this.props.settings} // from globalSettings
        ref={"win"+modalTop.index} 
        reference={modalTop} 
        id={modalTop.id} 
        resizable={modalTop.resizable}
        key={modalTop.index} 
        popWindow={this.popWindow.bind(this)} 
        deleteWindow={this.deleteWindow.bind(this)}>
          {React.cloneElement(aModalContent, { propagationData: this.state.trigger })}
      </Dialog>);
    }

    let windowClass="knossys-dark desktopContent";

    if (this.props.classes) {
      windowClass="knossys-dark desktopContent " + this.props.classes;
    }

    return (<div tabIndex="0" onKeyDown={this.onKeyDown} className={windowClass}>      
      {this.props.children}
      {windows}
    </div>);
  }
}

export default WindowManager;
