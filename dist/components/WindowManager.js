"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.WindowManager = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Window = _interopRequireDefault(require("./Window"));

var _Dialog = _interopRequireDefault(require("./Dialog"));

var _ToolWindow = _interopRequireDefault(require("./ToolWindow"));

var _WindowBasicApplication = _interopRequireDefault(require("./WindowBasicApplication"));

var _WindowApplication = _interopRequireDefault(require("./WindowApplication"));

var _Scrim = _interopRequireDefault(require("./Scrim"));

var _DataTools = _interopRequireDefault(require("./utils/DataTools"));

require("./styles/wmanager.css");

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
var WindowManager = /*#__PURE__*/function (_React$Component) {
  _inherits(WindowManager, _React$Component);

  var _super = _createSuper(WindowManager);

  /**
   *
   */
  function WindowManager(props) {
    var _this;

    _classCallCheck(this, WindowManager);

    _this = _super.call(this, props);
    _this.state = {
      pop: 0,
      trigger: 0
    };
    _this.dataTools = new _DataTools["default"]();
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   *
   */


  _createClass(WindowManager, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      console.log("componentDidUpdate ()");

      if (this.props.trigger) {
        if (this.props.trigger != prevProps.trigger) {
          this.setState({
            trigger: this.props.trigger
          });
        }
      }
    }
    /**
     *
     */

  }, {
    key: "updateWindowStack",
    value: function updateWindowStack() {
      this.setState({
        trigger: this.state.trigger + 1
      });
    }
    /**
     *
     */

  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      if (this.props.onKeyDown) {
        this.props.onKeyDown(e);
      }
    }
    /**
     *
     */

  }, {
    key: "deleteWindow",
    value: function deleteWindow(aWindow) {
      console.log("deleteWindow (" + aWindow + ")");

      if (this.props.deleteWindow) {
        this.props.deleteWindow(aWindow);
      }
    }
    /**
     *
     */

  }, {
    key: "addWindow",
    value: function addWindow(aContent, anIcon, aLabel, aShown) {
      console.log("addWindow ()");

      if (this.props.addWindow) {
        this.props.addWindow(aContent, anIcon, aLabel, aShown);
      }
    }
    /**
     *
     */

  }, {
    key: "addDialog",
    value: function addDialog(aContent) {
      console.log("addDialog ()");

      if (this.props.addDialog) {
        this.props.addDialog(aContent);
      }
    }
    /**
     *
     */

  }, {
    key: "addModal",
    value: function addModal(aContent) {
      console.log("addModal ()");

      if (this.props.addModel) {
        this.props.addModel(aContent);
      }
    }
    /**
     *
     */

  }, {
    key: "addDesktopWidget",
    value: function addDesktopWidget(aContent) {
      console.log("addDesktopWidget ()");

      if (this.props.addDesktopWidget) {
        this.props.addDesktopWidget(aContent);
      }
    }
    /**
     *
     */

  }, {
    key: "maximizeWindow",
    value: function maximizeWindow(targetWindow) {
      //console.log ("maximizeWindow("+targetWindow+")");
      var list = this.props.appManager.getApps();

      for (var j = 0; j < list.length; j++) {
        list[j].maximized = false;
      }

      for (var i = 0; i < list.length; i++) {
        if (list[i].id == targetWindow) {
          list[i].maximized = true;
        }
      }
    }
    /**
     *
     */

  }, {
    key: "popWindow",
    value: function popWindow(targetWindow) {
      //console.log ("popWindow("+targetWindow+")");
      var list = this.props.appManager.getApps(); // This method should be a no-op if we're displaying a modal dialog

      for (var k = 0; k < list.length; k++) {
        if (list[k].id == targetWindow) {
          if (list[k].type == "dialog") {
            if (list[k].modal == true) {
              //console.log ("Modal dialog clicked, nop");
              return;
            }
          }
        }
      }

      for (var j = 0; j < list.length; j++) {
        list[j].selected = false;
      }

      for (var i = 0; i < list.length; i++) {
        var win = list[i];

        if (win.id == targetWindow) {
          //console.log ("Take out of the list/remove from current z position");
          var updated = this.dataTools.deleteElement(list, win); //console.log ("Push to the top of the list");

          win.selected = true;
          updated.push(win);
          this.setState({
            pop: this.state.pop++
          });
          return;
        }
      }
    }
    /**
     *
     */

  }, {
    key: "render",
    value: function render() {
      console.log("render()");

      var scrim = /*#__PURE__*/_react["default"].createElement(_Scrim["default"], {
        visible: false
      });

      var windows = [];
      var zIndex = 1;
      var windowReferences = this.props.appManager.getApps();

      for (var k = 0; k < windowReferences.length; k++) {
        var aTemplate = windowReferences[k];

        if (aTemplate.maximized == true) {
          return aTemplate.content;
        }

        if (aTemplate.type == "dialog") {
          if (aTemplate.mode == "modal") {
            scrim = /*#__PURE__*/_react["default"].createElement(_Scrim["default"], {
              visible: true
            });
          }
        }
      }

      var modalTop = null;

      for (var i = 0; i < windowReferences.length; i++) {
        var _aTemplate = windowReferences[i];

        var _aContent = void 0;

        if (_aTemplate.content) {
          if (typeof _aTemplate.content === 'function') {
            _aContent = _aTemplate.content();
          } else {
            _aContent = _aTemplate.content;
          }
        } //>-----------------------------------------------------


        if (_aTemplate.type == "window") {
          if (_aTemplate.shown == true) {
            windows.push( /*#__PURE__*/_react["default"].createElement(_Window["default"], {
              appManager: this.props.appManager,
              trigger: this.state.trigger,
              settings: this.props.settings // from globalSettings
              ,
              ref: "win" + _aTemplate.index,
              reference: _aTemplate,
              id: _aTemplate.id,
              key: _aTemplate.index,
              popWindow: this.popWindow.bind(this),
              deleteWindow: this.deleteWindow.bind(this),
              maximizeWindow: this.maximizeWindow.bind(this)
            }, _aContent));
            zIndex++;
          }
        } //>-----------------------------------------------------      


        if (_aTemplate.type == "dialog") {
          if (_aTemplate.shown == true) {
            if (_aTemplate.hasOwnProperty("modal") == true) {
              if (_aTemplate.modal == true) {
                modalTop = _aTemplate;
              }
            }

            if (modalTop == null) {
              windows.push( /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
                appManager: this.props.appManager,
                trigger: this.state.trigger,
                settings: this.props.settings // from globalSettings
                ,
                ref: "win" + _aTemplate.index,
                reference: _aTemplate,
                id: _aTemplate.id,
                key: _aTemplate.index,
                popWindow: this.popWindow.bind(this),
                deleteWindow: this.deleteWindow.bind(this)
              }, _aContent));
            }
          }
        } //>-----------------------------------------------------


        if (_aTemplate.type == "toolwindow") {
          if (_aTemplate.shown == true) {
            windows.push( /*#__PURE__*/_react["default"].createElement(_ToolWindow["default"], {
              appManager: this.props.appManager,
              trigger: this.state.trigger,
              settings: this.props.settings // from globalSettings
              ,
              ref: "win" + _aTemplate.index,
              reference: _aTemplate,
              id: _aTemplate.id,
              key: _aTemplate.index,
              popWindow: this.popWindow.bind(this),
              deleteWindow: this.deleteWindow.bind(this)
            }, _aContent));
          }
        } //>-----------------------------------------------------


        if (_aTemplate.type == "applicationwindow") {
          if (_aTemplate.shown == true) {
            windows.push( /*#__PURE__*/_react["default"].createElement(_WindowApplication["default"], {
              appManager: this.props.appManager,
              trigger: this.state.trigger,
              settings: this.props.settings // from globalSettings
              ,
              ref: "win" + _aTemplate.index,
              reference: _aTemplate,
              id: _aTemplate.id,
              key: _aTemplate.index,
              popWindow: this.popWindow.bind(this),
              deleteWindow: this.deleteWindow.bind(this)
            }, _aContent));
          }
        } //>-----------------------------------------------------


        if (_aTemplate.type == "basicapplicationwindow") {
          if (_aTemplate.shown == true) {
            windows.push( /*#__PURE__*/_react["default"].createElement(_WindowBasicApplication["default"], {
              appManager: this.props.appManager,
              trigger: this.state.trigger,
              settings: this.props.settings // from globalSettings
              ,
              ref: "win" + _aTemplate.index,
              reference: _aTemplate,
              id: _aTemplate.id,
              key: _aTemplate.index,
              popWindow: this.popWindow.bind(this),
              deleteWindow: this.deleteWindow.bind(this)
            }, _aContent));
          }
        } //>-----------------------------------------------------

      }

      if (modalTop != null) {
        windows.push( /*#__PURE__*/_react["default"].createElement(_Scrim["default"], {
          key: -1,
          visible: true
        }));
        windows.push( /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
          appManager: this.props.appManager,
          trigger: this.state.trigger,
          settings: this.props.settings // from globalSettings
          ,
          ref: "win" + modalTop.index,
          reference: modalTop,
          id: modalTop.id,
          key: modalTop.index,
          popWindow: this.popWindow.bind(this),
          deleteWindow: this.deleteWindow.bind(this)
        }, aContent));
      }

      var windowClass = "knossys-dark desktopContent";

      if (this.props.classes) {
        windowClass = "knossys-dark desktopContent " + this.props.classes;
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        tabIndex: "0",
        onKeyDown: this.onKeyDown,
        className: windowClass
      }, this.props.children, windows);
    }
  }]);

  return WindowManager;
}(_react["default"].Component);

exports.WindowManager = WindowManager;
var _default = WindowManager;
exports["default"] = _default;