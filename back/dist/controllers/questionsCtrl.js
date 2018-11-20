'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _resourceRouterMiddleware = require('resource-router-middleware');

var _resourceRouterMiddleware2 = _interopRequireDefault(_resourceRouterMiddleware);

var _questions = require('../models/questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;
  return (0, _resourceRouterMiddleware2.default)({
    /** Property name to store preloaded entity on `request`. */
    id: 'question',

    /** For requests with an `id`, you can auto-load the entity.
     *  Errors terminate the request, success sets `req[id] = data`.
     */
    load: function load(req, id, callback) {
      var question = _questions2.default.find(function (question) {
        return question.id === id;
      }),
          err = question ? null : 'Not found';
      callback(err, question);
    },


    /** GET / - List all entities */
    index: function index(_ref2, res) {
      var params = _ref2.params;

      res.json(_questions2.default);
    },


    /** POST / - Create a new entity */
    create: function create(_ref3, res) {
      var body = _ref3.body;

      body.id = _questions2.default.length.toString(36);
      _questions2.default.push(body);
      res.json(body);
    },


    /** GET /:id - Return a given entity */
    read: function read(_ref4, res) {
      var question = _ref4.question;

      res.json(question);
    },


    /** PUT /:id - Update a given entity */
    update: function update(_ref5, res) {
      var question = _ref5.question,
          body = _ref5.body;

      for (var key in body) {
        if (key !== 'id') {
          question[key] = body[key];
        }
      }
      res.sendStatus(204);
    },


    /** DELETE /:id - Delete a given entity */
    delete: function _delete(_ref6, res) {
      var question = _ref6.question;

      _questions2.default.splice(_questions2.default.indexOf(question), 1);
      res.sendStatus(204);
    }
  });
};
//# sourceMappingURL=questionsCtrl.js.map