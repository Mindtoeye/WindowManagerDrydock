import React from "react";
import ReactDOM from "react-dom";

import Draggable, {DraggableCore} from 'react-draggable';
import WindowDummyContent from './WindowDummyContent';

import '../../css/wmanager.css';

/**
 *
 */
export class Window extends React.Component {

  /**
  *
  */
  constructor(props){
    super(props);

    this.state = {
      id: props.id,
      count: 0,
      index: props.zIndex
    };
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
    let xPos=this.props.xPos;
    let yPos=this.props.yPos;
    let aWidth=this.props.width;
    let aHeight=this.props.height;
    let anIndex=this.state.index;
    let title=("Knossys: " + this.props.id);

    if (this.props.title) {
      title=this.props.title;
    }

    let windowContentClass = "windowContent";
    let windowContent = this.props.children;

    if (windowContent==null) {
      windowContent=<WindowDummyContent windowReference={this.props.windowReference}/>;
    }

    return (
     <Draggable handle=".handle" defaultPosition={{x: 0, y: 0}} scale={1}>
      <div key={this.props.id} id={this.props.id} className="genericWindow" style={{left: xPos, top: yPos, width: aWidth, height: aHeight,zIndex: anIndex}}>
        <div className="macribbon handle" onClick={() => this.props.popWindow(this.props.id)}>
          <div className="titlecontent">
            {title}
          </div>
          <div className="standardCloseButton" onClick={() => this.props.deleteWindow(this.props.id)}>
            <svg width="12" height="12" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <line x1="1" y1="11" 
                    x2="11" y2="1" 
                    stroke="white" 
                    strokeWidth="2"/>
              <line x1="1" y1="1" 
                    x2="11" y2="11" 
                    stroke="white" 
                    strokeWidth="2"/>
            </svg>
          </div>

          <div className="standardMaximizeButton" onClick={() => this.props.maximizeWindow(this.props.id)}>          
            <svg version="1.1" width="12" height="12" xmlns="http://www.w3.org/2000/svg" x="200px" y="200px" viewBox="0 0 1000 1000" data-copyright="Icon made from http://www.onlinewebfonts.com/icon is licensed by CC BY 3.0">
              <g>
                <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
                  <path fill="white" stroke="white" d="M2921.9,4981.1c-216.4-57.4-408.5-220.8-499.1-424c-35.3-75.1-42-185.5-50.8-947.4l-11-861.3l-861.3-11c-819.3-11-865.7-13.3-960.6-57.4c-159-75.1-278.3-194.3-357.8-357.7l-72.9-148l-6.6-3146.9c-4.4-3142.5-4.4-3146.9,42-3299.3c39.7-132.5,66.3-172.2,183.3-291.5c119.2-117.1,159-143.5,291.5-183.3c152.4-46.4,156.8-46.4,3299.3-41.9l3146.9,6.6l148,72.9c163.4,79.5,282.7,198.8,357.8,357.8c44.2,95,46.4,141.3,57.4,960.6l11,861.3l861.3,11c819.3,11,865.7,13.3,960.6,57.4c159,75.1,278.3,194.3,357.8,357.7l72.9,148l6.6,3146.9c4.4,3142.5,4.4,3146.9-41.9,3299.3c-39.8,132.5-66.3,172.3-183.3,291.5c-117,114.8-161.2,143.5-287.1,183.3c-150.2,46.4-161.2,46.4-3257.3,44.2C3741.2,5009.8,2999.2,5003.2,2921.9,4981.1z M9151.7,1246.8v-3014.4H6137.3H3122.9v3014.4v3014.4h3014.4h3014.4V1246.8z M2372,16.7v-1972.1l64-132.5c75.1-156.8,192.1-280.5,344.5-360l110.4-59.6l1992-6.6l1994.2-4.4v-761.9v-761.9H3862.7H848.3v3014.4v3014.4h761.9H2372V16.7z"/><path d="M5629.4,3477.2c-300.3-108.2-333.5-519-55.2-682.4c72.9-44.2,117-46.4,792.8-53l715.5-6.6L5887.8,1538.3C5064,712.3,4682,314.8,4657.7,259.6c-46.4-114.8-42-216.4,17.7-326.8c90.5-170,291.5-240.7,474.8-165.6c55.2,24.3,452.7,406.3,1278.7,1230.1l1196.9,1194.7l6.6-715.5c6.6-675.8,8.8-719.9,53-792.8c53-92.8,163.4-170,267.2-189.9c176.7-33.1,377.6,97.2,426.2,273.8c15.5,66.3,22.1,448.3,17.7,1280.9l-6.6,1185.9l-50.8,81.7c-28.7,44.2-88.3,103.8-132.5,132.5l-81.7,50.8l-1203.6,4.4C5923.1,3508.1,5702.2,3503.7,5629.4,3477.2z"/>
                </g>
              </g>
            </svg>
          </div>
                        
        </div>
        <div className={windowContentClass}>
          {windowContent}
        </div>
        <div className="statusbar">
        Statusbar
        </div>      
      </div>
    </Draggable>);
  }
}

export default Window;
