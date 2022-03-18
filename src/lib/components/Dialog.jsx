import React from "react";
import ReactDOM from "react-dom";

import Draggable, {DraggableCore} from 'react-draggable';

import { KButton } from '@knossys/knossys-ui-core';

import { uuidv4 } from './utils/uuid';

import gripper from './styles/images/resize.png';

/**
 *
 */
class Dialog extends React.Component {

  /**
  *
  */
  constructor(props){
    super(props);

    this.state = {
      id: props.id,
      currentResizerId: uuidv4(),
      count: 0, 
      resized: false,
      minimum_size: 200,
      index: props.reference.zIndex,
      width: props.reference.width,
      height: props.reference.height,
      original_mouse_x: 0,
      original_mouse_y: 0,
      original_x: 0,
      original_y: 0
    };

    this.resizeStart=this.resizeStart.bind(this);
    this.resize=this.resize.bind(this);
    this.stopResize=this.stopResize.bind(this);    

    this.onClose=this.onClose.bind(this);
  }

  /**
   *
   */
  componentDidMount() {
    console.log ("componentDidMount("+this.props.resizable+")");
    
    if (this.props.resizable) {
      if (this.props.resizable==true) {
        let currentResizer = document.getElementById (this.state.currentResizerId);
        
        // this is legit since some windows that are not dialogs should not be
        // resizable
        if (currentResizer!=null) {
          currentResizer.addEventListener('mousedown', this.resizeStart);
        }
      }
    } 
  }

  /**
   *
   */
  resizeStart (e) {
    e.preventDefault();

    let element=document.getElementById (this.props.reference.id);

    let original_x = element.getBoundingClientRect().left;
    let original_y = element.getBoundingClientRect().top;
    let original_mouse_x = e.pageX;
    let original_mouse_y = e.pageY;
    
    this.setState ({
      index: 0,
      resized: true,
      original_mouse_x: original_mouse_x,
      original_mouse_y: original_mouse_y,
      original_x: original_x,
      original_y: original_y      
    },(e) => {
      window.addEventListener('mousemove', this.resize);
      window.addEventListener('mouseup', this.stopResize);      
    });
  }

  /**
   *
   */  
  resize(e) {
    let element=document.getElementById (this.props.reference.id);

    if (!element) {
      console.log ("bump");
    }

    let xDiv=e.pageX - this.state.original_mouse_x;
    let yDiv=e.pageY - this.state.original_mouse_y;

    let width = this.state.width + xDiv;
    let height = this.state.height + yDiv;

    if (width > this.state.minimum_size) {
      element.style.width = width + "px";
    }

    if (height > this.state.minimum_size) {
      element.style.height = height + "px";
    }
  }

  /**
   *
   */    
  stopResize() {
    window.removeEventListener('mousemove', this.resize);

    let element=document.getElementById (this.props.reference.id);    

    this.setState ({
      width: parseInt(element.style.width, 10),
      height: parseInt(element.style.height, 10)
    });
  }

  /**
   *
   */
  onClose (e,anId) {
    console.log ("onClose ("+anId+")");

    this.stopResize();

    if (this.props.appManager) {
      this.props.appManager.deleteApp (anId);
    } else {
      console.log ("Error: no application manager available");
    }
  }

  /**
   *
   */
  reIndex (newIndex) {
    console.log ("reIndex ("+newIndex+")");
    this.setState ({index: newIndex});
  }

  /**
   *
   */
  getIndex () {
    return (this.state.index);
  }

  /**
   *
   */
  getWindowId () {
    return (this.state.id);
  }

  /**
   *
   */  
  render() {
    let xPos=this.props.reference.x;
    let yPos=this.props.reference.y;
    let anIndex=this.state.index;
    let className="dialogWindow";
    let modal=true;
    let resizer;

    if (this.props.reference.hasOwnProperty ("modal")==true) {    
      if (this.props.reference.modal==false) {
        modal=false;
      }
    }

    let title=("Knossys: " + this.props.reference.id);

    if (this.props.reference.hasOwnProperty ("title")==true) {
      title=this.props.reference.title;
    }    

    if (this.props.reference.centered) {
      if (typeof(this.props.reference.centered) == 'boolean') {
        if (this.props.reference.centered==true) {
          className="dialogWindow centered";
        }
      } else {
        if (this.props.reference.centered=="true") {
          className="dialogWindow centered";
        }
      }
    }

    if (this.props.resizable) {
      if (this.props.resizable==true) {
        resizer=<div className="gripper"><img id={this.state.currentResizerId} className="resizegripper" src={gripper}></img></div>;
      }
    }

    let initialStyle={left: xPos, top: yPos, width: (this.state.width + "px"), height: (this.state.height + "px"), zIndex: anIndex};

    if (modal==false) {
      return (<Draggable handle=".handle" defaultPosition={{x: 0, y: 0}} scale={1}>
        <div id={this.props.reference.id} className={className} onClick={() => this.props.popWindow(this.props.id)} style={initialStyle}>
          <div className="macribbon handle" onClick={() => this.props.popWindow(this.props.reference.id)}>
            <div className="titlecontent">
              {title}
            </div>
          </div>
          <div className="dialogContent">
            {this.props.children}
          </div>
          <div className="dialogControls">
            <KButton onClick={(e) => this.onClose(e,this.props.reference.id)}>Ok</KButton>
          </div>      
          {resizer}
        </div>
      </Draggable>);
    }

    return (<div id={this.props.reference.id} className={className} onClick={() => this.props.popWindow(this.props.id)} style={initialStyle}>
      <div className="macribbon" onClick={() => this.props.popWindow(this.props.reference.id)}>
        {title}
      </div>
      <div className="dialogContent">
        {this.props.children}
      </div>
      <div className="dialogControls">
        <KButton onClick={(e) => this.onClose(e,this.props.reference.id)}>Ok</KButton>
      </div>
    </div>);
  }
}

export default Dialog;
