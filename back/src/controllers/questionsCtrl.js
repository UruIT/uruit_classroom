import resource from 'resource-router-middleware'
import questions from '../models/questionsModel'

export default ({ config, db }) =>
  resource({
    /** Property name to store preloaded entity on `request`. */
    id: 'question',

    /** For requests with an `id`, you can auto-load the entity.
     *  Errors terminate the request, success sets `req[id] = data`.
     */
    load(req, id, callback) {
      let question = questions.find(question => question.id === id),
        err = question ? null : 'Not found'
      callback(err, question)
    },

    /** GET / - List all entities */
    index({ params }, res) {
      res.json(questions)
    },

    /** POST / - Create a new entity */
    create({ body }, res) {
      body.id = questions.length.toString(36)
      questions.push(body)
      res.json(body)
    },

    /** GET /:id - Return a given entity */
    read({ question }, res) {
      res.json(question)
    },

    /** PUT /:id - Update a given entity */
    update({ question, body }, res) {
      for (let key in body) {
        if (key !== 'id') {
          question[key] = body[key]
        }
      }
      res.sendStatus(204)
    },

    /** DELETE /:id - Delete a given entity */
    delete({ question }, res) {
      questions.splice(questions.indexOf(question), 1)
      res.sendStatus(204)
    }
  })
