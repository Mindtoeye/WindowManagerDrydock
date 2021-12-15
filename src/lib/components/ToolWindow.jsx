import React from "react";
import ReactDOM from "react-dom";

import Draggable, {DraggableCore} from 'react-draggable';

/**
 *
 */
export class ToolWindow extends React.Component {

  /**
  *
  */
  constructor(props){
    super(props);

    this.state = {
      id: props.id,
      count: 0, 
      index: props.reference.zIndex
    };    

    this.onClose=this.onClose.bind(this);    
  }

  /**
   *
   */
  onClose (e,anId) {
    console.log ("onClose ("+anId+")");

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
    let aWidth=this.props.reference.width;
    let aHeight=this.props.reference.height;
    let anIndex=this.state.index;
    let className="dialogWindow";
    let modal=true;

    if (this.props.reference.hasOwnProperty ("modal")==true) {    
      if (this.props.reference.modal==false) {
        modal=false;
      }
    }

    let title=("Knossys: " + this.props.reference.id);

    if (this.props.reference.hasOwnProperty ("title")==true) {
      title=this.props.reference.title;
    }    

    if (typeof(this.props.reference.width) == 'number') {
      aWidth=this.props.reference.width+"px";
    } else {
      if (this.props.reference.width.indexOf("px")==-1) {
        aWidth=this.props.reference.width+"px";
      }
    }

    if (typeof(this.props.reference.height) == 'number') {
      aHeight=this.props.reference.height+"px";
    } else {
      if (this.props.reference.height.indexOf("px")==-1) {
        aHeight=this.props.reference.height+"px";
      }
    }    

    return (<Draggable handle=".handle" defaultPosition={{x: 0, y: 0}} scale={1}>
      <div id={this.props.reference.id} className={className} onClick={() => this.props.popWindow(this.props.id)} style={{left: xPos, top: yPos, width: aWidth, height: aHeight, zIndex: anIndex}}>
        <div className="macribbon-narrow handle" onClick={() => this.props.popWindow(this.props.reference.id)}>
          <div className="titlecontent">
            {title}
          </div>
          <div className="toolwindowbutton" onClick={(e) => this.onClose(e,this.props.reference.id)}>
          X
          </div>
        </div>
        <div className="dialogContent">
          {this.props.children}
        </div>
      </div>
    </Draggable>);
  }
}

export default ToolWindow;
