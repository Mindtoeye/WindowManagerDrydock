"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var cookieJar = {};
var dataSource = "COOKIE"; // Choices are COOKIE, OLI, CANVAS

var permanence = null;
var equalCharacter = "=";
var iLogosObject = null;
/**
 * Use this class as a middle layer to store data to either network, disk (Electron) or local storage
 * 
 * We switched from using cookies to local storage:
 *
 * The size of a cookie contains entire cookie, including name, value, expiry date etc. A cookie can 
 * contains data upto 4096 Bytes only that is the maximum size of a cookie which can be. If you want 
 * to support most browsers, then do not exceed 50 cookies per domain, and 4093 bytes per domain.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 */

var DataPermanence = /*#__PURE__*/function () {
  /**
   *
   */
  function DataPermanence(anObject) {
    _classCallCheck(this, DataPermanence);

    console.log("DataPermanence ()");
    permanence = this;

    if (anObject) {
      iLogosObject = anObject;
    } else {
      console.log("Error: no data load object provided!");
    }

    permanence.reload();
  }
  /**
   *
   */


  _createClass(DataPermanence, [{
    key: "getDataSource",
    value: function getDataSource() {
      return dataSource;
    }
    /**
     *
     */

  }, {
    key: "reload",
    value: function reload() {
      //console.log ("reload ()");

      /*
      let allCookies = document.cookie;  
      permanence.parse (allCookies);
      */
      var allCookies = window.localStorage.getItem("iLogos");

      if (allCookies != null) {
        permanence.parse(allCookies);
      }
    }
    /**
     *
     */

  }, {
    key: "loadSuccess",
    value: function loadSuccess(data) {
      permanence.parse(data);

      if (iLogosObject != null) {
        iLogosObject.graphLoaded();
      } else {
        console.log("Internal error: data load handler not available");
      }
    }
    /**
     *
     */

  }, {
    key: "loadFail",
    value: function loadFail() {
      if (iLogosObject != null) {
        iLogosObject.graphLoaded();
      } else {
        console.log("Internal error: data load handler not available");
      }
    }
    /**
     *
     */

  }, {
    key: "setValue",
    value: function setValue(aKey, aValue) {
      cookieJar[aKey] = aValue;
      permanence.save();
    }
    /**
     *
     */

  }, {
    key: "save",
    value: function save() {
      var data = "";
      var index = 0;

      for (var _i = 0, _Object$entries = Object.entries(cookieJar); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        var separator = ";";

        if (index == 0) {
          separator = "";
        }

        data = data + separator + key + equalCharacter + value;
        index++;
      } //console.log ("Cookie data: " + data);
      //document.cookie = (data+";samesite=strict");


      window.localStorage.setItem("iLogos", data); // Make sure that our internal model is the same as what's on disk

      permanence.reload();
    }
    /**
     *
     */

  }, {
    key: "saveSuccess",
    value: function saveSuccess() {
      console.log("saveSuccess ()");
    }
    /**
     *
     */

  }, {
    key: "saveFail",
    value: function saveFail() {
      console.log("saveFail ()");
    }
    /**
     *
     */

  }, {
    key: "parse",
    value: function parse(data) {
      //console.log ("parse ()");
      var splitter = data.split(";");
      cookieJar = {};

      for (var i = 0; i < splitter.length; i++) {
        var kv = splitter[i].split(equalCharacter);

        if (kv.length > 1) {
          cookieJar[kv[0].trim()] = kv[1].trim();
        }
      }
    }
    /**
     *
     */

  }, {
    key: "getValue",
    value: function getValue(aKey) {
      //console.log ("getValue ("+aKey+")");
      if (cookieJar.hasOwnProperty(aKey)) {
        return cookieJar[aKey];
      }

      return "";
    }
    /**
     *
     */

  }, {
    key: "setValueEncoded",
    value: function setValueEncoded(aKey, aValue) {
      //console.log ("setValueEncoded ()");
      //console.log (aValue);
      permanence.setValue(aKey, window.btoa(aValue));
    }
    /**
     *
     */

  }, {
    key: "getValueEncoded",
    value: function getValueEncoded(aKey) {
      //console.log ("getValueEncoded ()");
      var decoded = permanence.getValue(aKey); //console.log (decoded);

      return window.atob(decoded);
    }
  }]);

  return DataPermanence;
}();

var _default = DataPermanence;
exports["default"] = _default;