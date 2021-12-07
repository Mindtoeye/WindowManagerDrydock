"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _ApplicationDriver2 = _interopRequireDefault(require("./ApplicationDriver"));

var _DataTools = _interopRequireDefault(require("./utils/DataTools"));

var _uuid = require("./utils/uuid");

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
var ApplicationManager = /*#__PURE__*/function (_ApplicationDriver) {
  _inherits(ApplicationManager, _ApplicationDriver);

  var _super = _createSuper(ApplicationManager);

  /**
   *
   */
  function ApplicationManager() {
    var _this;

    _classCallCheck(this, ApplicationManager);

    _this = _super.call(this);
    _this.index = 0;
    _this.apps = [];
    _this.dataTools = new _DataTools["default"]();
    _this.onUpdate = null;
    return _this;
  }
  /**
   *
   */


  _createClass(ApplicationManager, [{
    key: "init",
    value: function init() {
      return null;
    }
    /**
     *
     */

  }, {
    key: "toggle",
    value: function toggle(anId) {
      console.log("toggle (" + anId + ")");
      var appData = this.getApps();

      for (var i = 0; i < appData.length; i++) {
        var app = appData[i]; //console.log ("Comparing " + app.id + ", to: " + anId);

        if (app.id == anId) {
          console.log("Changing visibility of application ...");

          if (app.shown == true) {
            app.shown = false;
          } else {
            app.shown = true;
          }
        }
      }

      this.setApps(appData);
    }
    /**
     *
     */

  }, {
    key: "getApps",
    value: function getApps() {
      return this.apps;
    }
    /**
     * 
     */

  }, {
    key: "setApps",
    value: function setApps(aSet) {
      this.apps = aSet;
    }
    /**
     *
     */

  }, {
    key: "setOnUpdate",
    value: function setOnUpdate(aCallback) {
      this.onUpdate = aCallback;
    }
    /**
     *
     */

  }, {
    key: "addApplication",
    value: function addApplication(anApplication, aCallback) {
      console.log("addApplication ()");
      console.log(anApplication);
      anApplication.shown = true;
      anApplication.maximized = false;
      anApplication.index = this.index;
      anApplication.id = (0, _uuid.uuidv4)();

      if (anApplication.hasOwnProperty("modal") == false) {
        anApplication.modal = false;
      }

      if (anApplication.hasOwnProperty("centered") == false) {
        console.log("Window template doesn't have centered attribute");

        if (anApplication.modal == true) {
          anApplication.centered = true;
        } else {
          anApplication.centered = false;
        }
      }

      if (anApplication.hasOwnProperty("x") == false) {
        anApplication.x = this.dataTools.getRandomInt(100);
      }

      if (anApplication.hasOwnProperty("y") == false) {
        anApplication.y = this.dataTools.getRandomInt(100);
      }

      if (anApplication.hasOwnProperty("width") == false) {
        anApplication.x = 320;
      }

      if (anApplication.hasOwnProperty("height") == false) {
        anApplication.y = 200;
      }

      this.index++;
      this.apps.push(anApplication);

      if (this.onUpdate) {
        this.onUpdate();
      }
    }
  }]);

  return ApplicationManager;
}(_ApplicationDriver2["default"]);

exports["default"] = ApplicationManager;