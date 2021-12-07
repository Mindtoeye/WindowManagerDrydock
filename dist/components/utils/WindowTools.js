"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *
 */
var WindowTools = /*#__PURE__*/function () {
  function WindowTools() {
    _classCallCheck(this, WindowTools);
  }

  _createClass(WindowTools, [{
    key: "generateGrid",
    value:
    /**
     *
     */
    function generateGrid() {
      return /*#__PURE__*/_react["default"].createElement("svg", {
        width: "100%",
        height: "100%",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/_react["default"].createElement("defs", null, /*#__PURE__*/_react["default"].createElement("pattern", {
        id: "smallGrid",
        width: "8",
        height: "8",
        patternUnits: "userSpaceOnUse"
      }, /*#__PURE__*/_react["default"].createElement("path", {
        d: "M 8 0 L 0 0 0 8",
        fill: "none",
        stroke: "gray",
        strokeWidth: "0.5"
      })), /*#__PURE__*/_react["default"].createElement("pattern", {
        id: "grid",
        width: "80",
        height: "80",
        patternUnits: "userSpaceOnUse"
      }, /*#__PURE__*/_react["default"].createElement("rect", {
        width: "80",
        height: "80",
        fill: "url(#smallGrid)"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        d: "M 80 0 L 0 0 0 80",
        fill: "none",
        stroke: "gray",
        strokeWidth: "1"
      }))), /*#__PURE__*/_react["default"].createElement("rect", {
        width: "100%",
        height: "100%",
        fill: "url(#grid)"
      }));
    }
  }]);

  return WindowTools;
}();

var _default = WindowTools;
exports["default"] = _default;