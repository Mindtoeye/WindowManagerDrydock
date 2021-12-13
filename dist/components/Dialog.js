"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactDraggable = _interopRequireWildcard(require("react-draggable"));

var _knossysUiCore = require("@knossys/knossys-ui-core");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

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
      count: 0,
      index: props.reference.zIndex
    };
    return _this;
  }
  /**
   *
   */


  _createClass(Dialog, [{
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
      var _this2 = this;

      var xPos = this.props.reference.x;
      var yPos = this.props.reference.y;
      var aWidth = this.props.reference.width;
      var aHeight = this.props.reference.height;
      var anIndex = this.state.index;
      var className = "dialogWindow";
      var modal = true;

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
            return _this2.props.popWindow(_this2.props.reference.id);
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "titlecontent"
        }, title)), /*#__PURE__*/_react["default"].createElement("div", {
          className: "dialogContent"
        }, this.props.children), /*#__PURE__*/_react["default"].createElement("div", {
          className: "dialogControls"
        }, /*#__PURE__*/_react["default"].createElement(_knossysUiCore.KButton, {
          onClick: function onClick() {
            return _this2.props.deleteWindow(_this2.props.reference.id);
          }
        }, "Ok"))));
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        id: this.props.reference.id,
        className: className,
        style: {
          left: xPos,
          top: yPos,
          width: aWidth,
          height: aHeight,
          zIndex: anIndex
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "macribbon",
        onClick: function onClick() {
          return _this2.props.popWindow(_this2.props.reference.id);
        }
      }, title), /*#__PURE__*/_react["default"].createElement("div", {
        className: "dialogContent"
      }, this.props.children), /*#__PURE__*/_react["default"].createElement("div", {
        className: "dialogControls"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        className: "largeButton",
        onClick: function onClick() {
          return _this2.props.deleteWindow(_this2.props.reference.id);
        }
      }, "Ok")));
    }
  }]);

  return Dialog;
}(_react["default"].Component);

var _default = Dialog;
exports["default"] = _default;