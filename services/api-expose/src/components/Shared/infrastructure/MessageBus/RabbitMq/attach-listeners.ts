import healthcheckMessage from '../../../../HealthCheck/application/healthcheck.message'
import TodoMessagesQueue from '../../../../Todo/application/todo.message'
const attachEventsQueue = async () => {
    // Todo
    await TodoMessagesQueue.findAll()
    await TodoMessagesQueue.search()
    await TodoMessagesQueue.createOne()
    await TodoMessagesQueue.updateOne()
    await TodoMessagesQueue.deleteOne()
    // healthcheck
    await healthcheckMessage.healthcheck()
}
export { attachEventsQueue }
