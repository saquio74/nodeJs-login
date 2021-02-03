"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var login = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, email, password, user, verify, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.next = 3;
            return _User["default"].findOne({
              email: email
            });

          case 3:
            user = _context.sent;
            if (!user) res.status(422).json({
              message: 'this email does not exist'
            });
            _context.next = 7;
            return _User["default"].comparePassword(password, user.password);

          case 7:
            verify = _context.sent;
            if (!verify) res.status(422).json({
              message: 'Password not match'
            });
            token = _jsonwebtoken["default"].sign({
              id: user._id
            }, _config["default"].SECRET, {
              expiresIn: 86400
            });
            res.status(200).json({
              token: token
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.login = login;

var register = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, name, email, password, cellphone, country, state, userData, newUser, response, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(req.body);
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, password = _req$body2.password, cellphone = _req$body2.cellphone, country = _req$body2.country, state = _req$body2.state;
            userData = _User["default"].find({
              email: email
            });
            _context2.t0 = _User["default"];
            _context2.t1 = name;
            _context2.next = 7;
            return _User["default"].encriptPassword(password);

          case 7:
            _context2.t2 = _context2.sent;
            _context2.t3 = email;
            _context2.t4 = cellphone;
            _context2.t5 = country;
            _context2.t6 = state;
            _context2.t7 = {
              name: _context2.t1,
              password: _context2.t2,
              email: _context2.t3,
              cellphone: _context2.t4,
              country: _context2.t5,
              state: _context2.t6
            };
            newUser = new _context2.t0(_context2.t7);
            _context2.prev = 14;
            _context2.next = 17;
            return newUser.save();

          case 17:
            response = _context2.sent;
            console.log(response);
            token = _jsonwebtoken["default"].sign({
              id: response._id
            }, _config["default"].SECRET, {
              expiresIn: 86400
            });
            res.status(200).json({
              token: token
            });
            _context2.next = 27;
            break;

          case 23:
            _context2.prev = 23;
            _context2.t8 = _context2["catch"](14);
            console.log(newUser.password);
            res.status(422).json({
              message: "An error has been occuried ".concat(_context2.t8)
            });

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[14, 23]]);
  }));

  return function register(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.register = register;