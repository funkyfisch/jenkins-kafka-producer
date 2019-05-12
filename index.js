require('dotenv').config()

if (!process.env.KAFKA_HOST || !process.env.KAFKA_PORT) {
    console.error('Please edit your config file. Your parameters are not defined.')
    process.exit(1)
}

const express = require('express')
const bodyParser = require('body-parser')

const handlers = require('./handlers.js')

let app = express()
let router = express.Router()

router.post('/build', handlers.buildHandler)
router.post('/queue', handlers.queueHandler)
router.post('/project', handlers.projectHandler)
router.post('/build-steps', handlers.buildStepsHandler)
router.post('/scm-checkout-info', handlers.scmCheckoutInfoHandler)

app.use(bodyParser.json())
app.use('/', router)

app.listen(process.env.PORT || 8080)