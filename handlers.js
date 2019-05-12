module.exports = exports

const kafka = require('kafka-node')

const host = `${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`
const kafkaClient = new kafka.KafkaClient({ kafkaHost: host })
let kafkaProducer = new kafka.Producer(kafkaClient)

kafkaClient.on('error', console.log)
kafkaProducer.on('error', function (err) {console.log(err)})

const buildHandler = function(request, response) {
    console.log('Builds Handler has been triggered \n')
    payload = { topic: 'jenkins-build-status', messages: [request.body] }
    kafkaProducer.send([payload], (err, data)  => console.log(err || data))
    response.sendStatus(200)
}

const queueHandler = function(request, response) {
    console.log('Queue Handler has been triggered \n')
    // payload = { topic: 'jenkins-execution-queue', messages: [request.body] }
    // kafkaProducer.send([payload], (err, data)  => console.log(err || data))
    response.sendStatus(200)
}

const projectHandler = function(request, response) {
    console.log('Project Handler has been triggered \n')
    // payload = { topic: 'jenkins-job-config', messages: [request.body] }
    // name, createdDate, userId, userName, ciUrl, updatedDate, status, configFile, jobUrl
    response.sendStatus(200)
}

const buildStepsHandler = function(request, response) {
    console.log('Build steps Handler has been triggered \n')
    // payload = { topic: 'jenkins-build-details', messages: [request.body] }
    // startTime: 0 || timestamp
    // endTime: 0 || timestamp
    // buildUrl: 'job/etc/job/sandbox/1/'
    // buildStepType: 'hudson.tasks.Shell'
    // buildStepId: 'hudson.tasks.Shell@a0c4c19'
    response.sendStatus(200)
}

const scmCheckoutInfoHandler = function(request, response) {
    console.log('Scm Checkout Info Handler has been triggered \n')
    // payload = { topic: 'jenkins-scm-checkout', messages: [request.body] }
    // console.log(request.body)
    response.sendStatus(200)
}

exports.buildHandler = buildHandler
exports.queueHandler = queueHandler
exports.projectHandler = projectHandler
exports.buildStepsHandler = buildStepsHandler
exports.scmCheckoutInfoHandler = scmCheckoutInfoHandler