"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.WindowApplication = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactDraggable = _interopRequireWildcard(require("react-draggable"));

var _WindowDummyContent = _interopRequireDefault(require("./WindowDummyContent"));

var _WindowGridContent = _interopRequireDefault(require("./WindowGridContent"));

var _WindowTools = _interopRequireDefault(require("./utils/WindowTools"));

var _uuid = require("./utils/uuid");

require("./styles/wmanager.css");

var _resize = _interopRequireDefault(require("./styles/images/icons/resize.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 *
 */
var WindowApplication = /*#__PURE__*/function (_React$Component) {
  _inherits(WindowApplication, _React$Component);

  var _super = _createSuper(WindowApplication);

  /**
  *
  */
  function WindowApplication(props) {
    var _this;

    _classCallCheck(this, WindowApplication);

    _this = _super.call(this, props);
    _this.state = {
      id: props.reference.id,
      count: 0,
      index: props.reference.zIndex,
      status: "",
      currentResizerId: (0, _uuid.uuidv4)(),
      minimum_size: 20,
      original_width: 0,
      original_height: 0,
      original_mouse_x: 0,
      original_mouse_y: 0,
      original_x: 0,
      original_y: 0
    };
    _this.windowTools = new _WindowTools["default"]();
    _this.resizeStart = _this.resizeStart.bind(_assertThisInitialized(_this));
    _this.resize = _this.resize.bind(_assertThisInitialized(_this));
    _this.stopResize = _this.stopResize.bind(_assertThisInitialized(_this));
    _this.maximizeWindow = _this.maximizeWindow.bind(_assertThisInitialized(_this));
    _this.onClose = _this.onClose.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   *
   */


  _createClass(WindowApplication, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //console.log ("componentDidMount()");
      var currentResizer = document.getElementById(this.state.currentResizerId); // this is legit since some windows that are not dialogs should not be
      // resizable

      if (currentResizer != null) {
        currentResizer.addEventListener('mousedown', this.resizeStart);
      }
    }
    /**
     *
     */

  }, {
    key: "onClose",
    value: function onClose(e, anId) {
      console.log("onClose (" + anId + ")");

      if (this.props.appManager) {
        this.props.appManager.deleteApp(anId);
      } else {
        console.log("Error: no application manager available");
      }
    }
    /**
     *
     */

  }, {
    key: "maximizeWindow",
    value: function maximizeWindow(e, anId) {
      //console.log ("maximizeWindow("+anId+")");
      e.preventDefault();
      e.stopPropagation();

      if (this.props.maximizeWindow) {
        this.props.maximizeWindow(anId);
      }
    }
    /**
     *
     */

  }, {
    key: "resizeStart",
    value: function resizeStart(e) {
      var _this2 = this;

      //console.log ("resizeStart ("+this.props.id+")");
      e.preventDefault();
      var element = document.getElementById(this.props.reference.id);
      var original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      var original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      var original_x = element.getBoundingClientRect().left;
      var original_y = element.getBoundingClientRect().top;
      var original_mouse_x = e.pageX;
      var original_mouse_y = e.pageY;
      this.setState({
        index: 0,
        original_width: original_width,
        original_height: original_height,
        original_mouse_x: original_mouse_x,
        original_mouse_y: original_mouse_y,
        original_x: original_x,
        original_y: original_y
      }, function (e) {
        window.addEventListener('mousemove', _this2.resize);
        window.addEventListener('mouseup', _this2.stopResize);
      });
    }
    /**
     *
     */

  }, {
    key: "resize",
    value: function resize(e) {
      //console.log ("resize ()");
      var element = document.getElementById(this.props.reference.id);
      var width = this.state.original_width + (e.pageX - this.state.original_mouse_x);
      var height = this.state.original_height + (e.pageY - this.state.original_mouse_y);

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

  }, {
    key: "stopResize",
    value: function stopResize() {
      //console.log ("stopResize ()");
      window.removeEventListener('mousemove', this.resize);
    }
    /**
     *
     */

  }, {
    key: "reIndex",
    value: function reIndex(newIndex) {
      console.log("reIndex (" + newIndex + ")");
      this.setState({
        index: newIndex
      });
    }
    /**
     *
     */

  }, {
    key: "getIndex",
    value: function getIndex() {
      return this.state.index;
    }
    /**
     *
     */

  }, {
    key: "getWindowId",
    value: function getWindowId() {
      return this.state.id;
    }
    /**
     *
     */

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var xPos = this.props.reference.xPos;
      var yPos = this.props.reference.yPos;
      var aWidth = this.props.reference.width;
      var aHeight = this.props.reference.height;
      var anIndex = this.state.index;
      var title = "Knossys: " + this.props.reference.id;

      if (this.props.reference.title) {
        title = this.props.reference.title;
      }

      if (typeof this.props.reference.width == 'number') {
        aWidth = this.props.reference.width + "px";
      } else {
        if (this.props.reference.width.indexOf("px") == -1) {
          aWidth = this.props.reference.width + "px";
        }
      }

      if (typeof this.props.reference.height == 'number') {
        aHeight = this.props.reference.height + "px";
      } else {
        if (this.props.reference.height.indexOf("px") == -1) {
          aHeight = this.props.reference.height + "px";
        }
      }

      var windowContentClass = "windowContent windowContentCols";
      var windowContent = this.props.children; //if (!windowContent) {

      windowContent = this.windowTools.generateGrid(); //}

      return /*#__PURE__*/_react["default"].createElement(_reactDraggable["default"], {
        handle: ".handle",
        defaultPosition: {
          x: 0,
          y: 0
        },
        scale: 1
      }, /*#__PURE__*/_react["default"].createElement("div", {
        key: this.props.reference.id,
        id: this.props.reference.id,
        className: "genericWindow",
        style: {
          left: xPos,
          top: yPos,
          width: aWidth,
          height: aHeight,
          zIndex: anIndex
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "macribbon handle",
        onClick: function onClick() {
          return _this3.props.popWindow(_this3.props.id);
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "titlecontent"
      }, title), /*#__PURE__*/_react["default"].createElement("div", {
        className: "standardCloseButton",
        onClick: function onClick(e) {
          return _this3.onClose(e, _this3.props.reference.id);
        }
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        width: "12",
        height: "12",
        version: "1.1"
      }, /*#__PURE__*/_react["default"].createElement("line", {
        x1: "1",
        y1: "11",
        x2: "11",
        y2: "1",
        stroke: "white",
        strokeWidth: "2"
      }), /*#__PURE__*/_react["default"].createElement("line", {
        x1: "1",
        y1: "1",
        x2: "11",
        y2: "11",
        stroke: "white",
        strokeWidth: "2"
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "standardMaximizeButton",
        onClick: function onClick() {
          return _this3.props.maximizeWindow(_this3.props.reference.id);
        }
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        version: "1.1",
        width: "12",
        height: "12",
        xmlns: "http://www.w3.org/2000/svg",
        x: "200px",
        y: "200px",
        viewBox: "0 0 1000 1000",
        "data-copyright": "Icon made from http://www.onlinewebfonts.com/icon is licensed by CC BY 3.0"
      }, /*#__PURE__*/_react["default"].createElement("g", null, /*#__PURE__*/_react["default"].createElement("g", {
        transform: "translate(0.000000,511.000000) scale(0.100000,-0.100000)"
      }, /*#__PURE__*/_react["default"].createElement("path", {
        fill: "white",
        stroke: "white",
        d: "M2921.9,4981.1c-216.4-57.4-408.5-220.8-499.1-424c-35.3-75.1-42-185.5-50.8-947.4l-11-861.3l-861.3-11c-819.3-11-865.7-13.3-960.6-57.4c-159-75.1-278.3-194.3-357.8-357.7l-72.9-148l-6.6-3146.9c-4.4-3142.5-4.4-3146.9,42-3299.3c39.7-132.5,66.3-172.2,183.3-291.5c119.2-117.1,159-143.5,291.5-183.3c152.4-46.4,156.8-46.4,3299.3-41.9l3146.9,6.6l148,72.9c163.4,79.5,282.7,198.8,357.8,357.8c44.2,95,46.4,141.3,57.4,960.6l11,861.3l861.3,11c819.3,11,865.7,13.3,960.6,57.4c159,75.1,278.3,194.3,357.8,357.7l72.9,148l6.6,3146.9c4.4,3142.5,4.4,3146.9-41.9,3299.3c-39.8,132.5-66.3,172.3-183.3,291.5c-117,114.8-161.2,143.5-287.1,183.3c-150.2,46.4-161.2,46.4-3257.3,44.2C3741.2,5009.8,2999.2,5003.2,2921.9,4981.1z M9151.7,1246.8v-3014.4H6137.3H3122.9v3014.4v3014.4h3014.4h3014.4V1246.8z M2372,16.7v-1972.1l64-132.5c75.1-156.8,192.1-280.5,344.5-360l110.4-59.6l1992-6.6l1994.2-4.4v-761.9v-761.9H3862.7H848.3v3014.4v3014.4h761.9H2372V16.7z"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        d: "M5629.4,3477.2c-300.3-108.2-333.5-519-55.2-682.4c72.9-44.2,117-46.4,792.8-53l715.5-6.6L5887.8,1538.3C5064,712.3,4682,314.8,4657.7,259.6c-46.4-114.8-42-216.4,17.7-326.8c90.5-170,291.5-240.7,474.8-165.6c55.2,24.3,452.7,406.3,1278.7,1230.1l1196.9,1194.7l6.6-715.5c6.6-675.8,8.8-719.9,53-792.8c53-92.8,163.4-170,267.2-189.9c176.7-33.1,377.6,97.2,426.2,273.8c15.5,66.3,22.1,448.3,17.7,1280.9l-6.6,1185.9l-50.8,81.7c-28.7,44.2-88.3,103.8-132.5,132.5l-81.7,50.8l-1203.6,4.4C5923.1,3508.1,5702.2,3503.7,5629.4,3477.2z"
      })))))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "mainmenu"
      }, "Menu"), /*#__PURE__*/_react["default"].createElement("div", {
        className: windowContentClass
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "apptoolbar"
      }, "T"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "center"
      }, windowContent), /*#__PURE__*/_react["default"].createElement("div", {
        className: "right"
      }, "R")), /*#__PURE__*/_react["default"].createElement("div", {
        className: "statusbar"
      }, this.state.status), /*#__PURE__*/_react["default"].createElement("div", {
        className: "gripper"
      }, /*#__PURE__*/_react["default"].createElement("img", {
        id: this.state.currentResizerId,
        className: "resizegripper",
        src: _resize["default"]
      }))));
    }
  }]);

  return WindowApplication;
}(_react["default"].Component);

exports.WindowApplication = WindowApplication;
var _default = WindowApplication;
exports["default"] = _default;