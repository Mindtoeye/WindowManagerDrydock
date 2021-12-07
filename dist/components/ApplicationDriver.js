"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DataPermanence = _interopRequireDefault(require("./utils/DataPermanence"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *
 */
var ApplicationDriver = /*#__PURE__*/function () {
  /**
   *
   */
  function ApplicationDriver(self) {
    _classCallCheck(this, ApplicationDriver);

    this.driver = self;
    this.dataPermanence = new _DataPermanence["default"]();
  }
  /**
   *
   */


  _createClass(ApplicationDriver, [{
    key: "init",
    value: function init() {
      return null;
    }
    /**
     *
     */

  }, {
    key: "getPermanenceDriver",
    value: function getPermanenceDriver() {
      return this.dataPermanence;
    }
    /**
     *
     */

  }, {
    key: "addDriver",
    value: function addDriver(aDriver) {
      if (!window.drivers) {
        window.drivers = [];
      }

      if (window.drivers != null) {
        window.drivers.push(aDriver);
      }
    }
  }]);

  return ApplicationDriver;
}();

exports["default"] = ApplicationDriver;