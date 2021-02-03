"use strict";

var _app = _interopRequireDefault(require("./app"));

var _database = _interopRequireDefault(require("./database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app.default.listen(_app.default.get("port"), () => {
  console.log("App listen at port ".concat(_app.default.get("port")));
});

var ver = () => {
  console.log('hola');
};

ver();