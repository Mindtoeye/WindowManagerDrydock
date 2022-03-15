"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * https://codepen.io/lopis/pen/XYgRKz
 */
var ResizablePanels = /*#__PURE__*/function (_React$Component) {
  _inherits(ResizablePanels, _React$Component);

  var _super = _createSuper(ResizablePanels);

  /**
   *
   */
  function ResizablePanels() {
    var _this;

    _classCallCheck(this, ResizablePanels);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "eventHandler", null);

    _defineProperty(_assertThisInitialized(_this), "startResize", function (event, index) {
      _this.setState({
        isDragging: true,
        currentPanel: index,
        initialPos: event.clientX
      });
    });

    _defineProperty(_assertThisInitialized(_this), "stopResize", function () {
      if (_this.state.isDragging) {
        console.log(_this.state);

        _this.setState(function (_ref) {
          var _objectSpread2;

          var panels = _ref.panels,
              currentPanel = _ref.currentPanel,
              delta = _ref.delta;
          return {
            isDragging: false,
            panels: _objectSpread(_objectSpread({}, panels), {}, (_objectSpread2 = {}, _defineProperty(_objectSpread2, currentPanel, (panels[currentPanel] || 0) - delta), _defineProperty(_objectSpread2, currentPanel - 1, (panels[currentPanel - 1] || 0) + delta), _objectSpread2)),
            delta: 0,
            currentPanel: null
          };
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "resizePanel", function (event) {
      if (_this.state.isDragging) {
        var delta = event.clientX - _this.state.initialPos;

        _this.setState({
          delta: delta
        });
      }
    });

    _this.state = {
      isDragging: false,
      panels: [25, 15, 10]
    };
    return _this;
  }
  /**
   *
   */


  _createClass(ResizablePanels, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _reactDom["default"].findDOMNode(this).addEventListener('mousemove', this.resizePanel);

      _reactDom["default"].findDOMNode(this).addEventListener('mouseup', this.stopResize);

      _reactDom["default"].findDOMNode(this).addEventListener('mouseleave', this.stopResize);
    }
    /**
     *
     */

  }, {
    key: "render",
    value:
    /**
     *
     */
    function render() {
      var _this2 = this,
          _ref2;

      var rest = this.props.children.slice(1);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "panel-container",
        onMouseUp: function onMouseUp() {
          return _this2.stopResize();
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "panel",
        style: {
          width: "calc(100% - ".concat(this.state.panels[1], "px - ").concat(this.state.panels[2], "px)")
        }
      }, this.props.children[0]), (_ref2 = []).concat.apply(_ref2, _toConsumableArray(rest.map(function (child, i) {
        return [/*#__PURE__*/_react["default"].createElement("div", {
          onMouseDown: function onMouseDown(e) {
            return _this2.startResize(e, i + 1);
          },
          key: "resizer_" + i,
          style: _this2.state.currentPanel === i + 1 ? {
            left: _this2.state.delta
          } : {},
          className: "resizer"
        }), /*#__PURE__*/_react["default"].createElement("div", {
          key: "panel_" + i,
          className: "panel",
          style: {
            width: _this2.state.panels[i + 1]
          }
        }, child)];
      }))));
    }
  }]);

  return ResizablePanels;
}(_react["default"].Component);

var _default = ResizablePanels;
exports["default"] = _default;