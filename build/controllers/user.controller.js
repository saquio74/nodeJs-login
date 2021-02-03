"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var login = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      email,
      password
    } = req.body;
    var user = yield _User.default.findOne({
      email: email
    });
    if (!user) res.status(422).json({
      message: 'this email does not exist'
    });
    var verify = yield _User.default.comparePassword(password, user.password);
    if (!verify) res.status(422).json({
      message: 'Password not match'
    });

    var token = _jsonwebtoken.default.sign({
      id: user._id
    }, _config.default.SECRET, {
      expiresIn: 86400
    });

    res.status(200).json({
      token: token
    });
  });

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.login = login;

var register = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    console.log(req.body);
    var {
      name,
      email,
      password,
      cellphone,
      country,
      state
    } = req.body;

    var userData = _User.default.find({
      email
    });

    var newUser = new _User.default({
      name,
      password: yield _User.default.encriptPassword(password),
      email,
      cellphone,
      country,
      state
    });

    try {
      var response = yield newUser.save();
      console.log(response);

      var token = _jsonwebtoken.default.sign({
        id: response._id
      }, _config.default.SECRET, {
        expiresIn: 86400
      });

      res.status(200).json({
        token: token
      });
    } catch (error) {
      console.log(newUser.password);
      res.status(422).json({
        message: "An error has been occuried ".concat(error)
      });
    }
  });

  return function register(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.register = register;