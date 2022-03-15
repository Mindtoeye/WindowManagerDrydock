"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactDraggable = _interopRequireWildcard(require("react-draggable"));

var _knossysUiCore = require("@knossys/knossys-ui-core");

var _uuid = require("./utils/uuid");

var _resize = _interopRequireDefault(require("./styles/images/icons/resize.png"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var Dialog = /*#__PURE__*/function (_React$Component) {
  _inherits(Dialog, _React$Component);

  var _super = _createSuper(Dialog);

  /**
  *
  */
  function Dialog(props) {
    var _this;

    _classCallCheck(this, Dialog);

    _this = _super.call(this, props);
    _this.state = {
      id: props.id,
      currentResizerId: (0, _uuid.uuidv4)(),
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
    _this.resizeStart = _this.resizeStart.bind(_assertThisInitialized(_this));
    _this.resize = _this.resize.bind(_assertThisInitialized(_this));
    _this.stopResize = _this.stopResize.bind(_assertThisInitialized(_this));
    _this.onClose = _this.onClose.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   *
   */


  _createClass(Dialog, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log("componentDidMount(" + this.props.resizable + ")");

      if (this.props.resizable) {
        if (this.props.resizable == true) {
          var currentResizer = document.getElementById(this.state.currentResizerId); // this is legit since some windows that are not dialogs should not be
          // resizable

          if (currentResizer != null) {
            currentResizer.addEventListener('mousedown', this.resizeStart);
          }
        }
      }
    }
    /**
     *
     */

  }, {
    key: "resizeStart",
    value: function resizeStart(e) {
      var _this2 = this;

      e.preventDefault();
      var element = document.getElementById(this.props.reference.id);
      var original_x = element.getBoundingClientRect().left;
      var original_y = element.getBoundingClientRect().top;
      var original_mouse_x = e.pageX;
      var original_mouse_y = e.pageY;
      this.setState({
        index: 0,
        resized: true,
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
      var element = document.getElementById(this.props.reference.id);

      if (!element) {
        console.log("bump");
      }

      var xDiv = e.pageX - this.state.original_mouse_x;
      var yDiv = e.pageY - this.state.original_mouse_y;
      var width = this.state.width + xDiv;
      var height = this.state.height + yDiv;

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
      window.removeEventListener('mousemove', this.resize);
      var element = document.getElementById(this.props.reference.id);
      this.setState({
        width: parseInt(element.style.width, 10),
        height: parseInt(element.style.height, 10)
      });
    }
    /**
     *
     */

  }, {
    key: "onClose",
    value: function onClose(e, anId) {
      console.log("onClose (" + anId + ")");
      this.stopResize();

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

      var xPos = this.props.reference.x;
      var yPos = this.props.reference.y;
      var anIndex = this.state.index;
      var className = "dialogWindow";
      var modal = true;
      var resizer;

      if (this.props.reference.hasOwnProperty("modal") == true) {
        if (this.props.reference.modal == false) {
          modal = false;
        }
      }

      var title = "Knossys: " + this.props.reference.id;

      if (this.props.reference.hasOwnProperty("title") == true) {
        title = this.props.reference.title;
      }

      if (this.props.reference.centered) {
        if (typeof this.props.reference.centered == 'boolean') {
          if (this.props.reference.centered == true) {
            className = "dialogWindow centered";
          }
        } else {
          if (this.props.reference.centered == "true") {
            className = "dialogWindow centered";
          }
        }
      }

      if (this.props.resizable) {
        if (this.props.resizable == true) {
          resizer = /*#__PURE__*/_react["default"].createElement("div", {
            className: "gripper"
          }, /*#__PURE__*/_react["default"].createElement("img", {
            id: this.state.currentResizerId,
            className: "resizegripper",
            src: _resize["default"]
          }));
        }
      }

      var initialStyle = {
        left: xPos,
        top: yPos,
        width: this.state.width + "px",
        height: this.state.height + "px",
        zIndex: anIndex
      };

      if (modal == false) {
        return /*#__PURE__*/_react["default"].createElement(_reactDraggable["default"], {
          handle: ".handle",
          defaultPosition: {
            x: 0,
            y: 0
          },
          scale: 1
        }, /*#__PURE__*/_react["default"].createElement("div", {
          id: this.props.reference.id,
          className: className,
          onClick: function onClick() {
            return _this3.props.popWindow(_this3.props.id);
          },
          style: initialStyle
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "macribbon handle",
          onClick: function onClick() {
            return _this3.props.popWindow(_this3.props.reference.id);
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "titlecontent"
        }, title)), /*#__PURE__*/_react["default"].createElement("div", {
          className: "dialogContent"
        }, this.props.children), /*#__PURE__*/_react["default"].createElement("div", {
          className: "dialogControls"
        }, /*#__PURE__*/_react["default"].createElement(_knossysUiCore.KButton, {
          onClick: function onClick(e) {
            return _this3.onClose(e, _this3.props.reference.id);
          }
        }, "Ok")), resizer));
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        id: this.props.reference.id,
        className: className,
        onClick: function onClick() {
          return _this3.props.popWindow(_this3.props.id);
        },
        style: initialStyle
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "macribbon",
        onClick: function onClick() {
          return _this3.props.popWindow(_this3.props.reference.id);
        }
      }, title), /*#__PURE__*/_react["default"].createElement("div", {
        className: "dialogContent"
      }, this.props.children), /*#__PURE__*/_react["default"].createElement("div", {
        className: "dialogControls"
      }, /*#__PURE__*/_react["default"].createElement(_knossysUiCore.KButton, {
        onClick: function onClick(e) {
          return _this3.onClose(e, _this3.props.reference.id);
        }
      }, "Ok")));
    }
  }]);

  return Dialog;
}(_react["default"].Component);

var _default = Dialog;
exports["default"] = _default;