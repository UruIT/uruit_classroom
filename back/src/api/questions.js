import { version } from '../../package.json'
import { Router } from 'express'
import questions from '../controllers/questionsCtrl'

export default ({ config, db }) => {
  let api = Router()

  // mount the questions resource
  api.use('/questions', questions({ config, db }))

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version })
  })

  return api
}
