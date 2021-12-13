"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DesktopWidget = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

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
var DesktopWidget = /*#__PURE__*/function (_React$Component) {
  _inherits(DesktopWidget, _React$Component);

  var _super = _createSuper(DesktopWidget);

  /**
  *
  */
  function DesktopWidget(props) {
    var _this;

    _classCallCheck(this, DesktopWidget);

    _this = _super.call(this, props);
    _this.state = {
      id: props.id,
      count: 0,
      index: props.zIndex
    };
    return _this;
  }
  /**
   *
   */


  _createClass(DesktopWidget, [{
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
      var titleElement;
      var labelElement;

      if (this.props.title) {
        titleElement = /*#__PURE__*/_react["default"].createElement("div", {
          className: "widgetribbon"
        }, this.props.title);
      }

      if (this.props.label) {
        labelElement = /*#__PURE__*/_react["default"].createElement("div", {
          className: "dialogControls"
        }, this.props.label);
      }

      var xPos = this.props.xPos;
      var yPos = this.props.yPos;
      var aWidth;

      if (this.props.width) {
        aWidth = this.props.width;
      }

      var aHeight;

      if (this.props.height) {
        aHeight = this.props.height;
      }

      var anIndex = this.state.index;
      return /*#__PURE__*/_react["default"].createElement("div", {
        id: this.props.id,
        className: "desktopWidget",
        style: {
          left: xPos,
          top: yPos,
          width: aWidth,
          height: aHeight,
          zIndex: anIndex
        }
      }, titleElement, /*#__PURE__*/_react["default"].createElement("div", {
        className: "desktopWidgetContent"
      }, this.props.children), labelElement);
    }
  }]);

  return DesktopWidget;
}(_react["default"].Component);

exports.DesktopWidget = DesktopWidget;
var _default = DesktopWidget;
exports["default"] = _default;