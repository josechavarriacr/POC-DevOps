import { HttpRouter } from '@realtech-api-package/route'
import { CommonHealthcheckController } from '@realtech-api-package/common'
import config from '../../Shared/infrastructure/Config/Environment/env.config'
import mongoConnection from '../../Shared/infrastructure/Persistence/Mongo/mongo-connection'
import messageAMQP from '../../Shared/infrastructure/MessageBus/RabbitMq/rabbitqm-factory'

const healthcheckController = new CommonHealthcheckController(
    config,
    mongoConnection,
    messageAMQP
)
const healthchecksRouter = HttpRouter()
healthchecksRouter.route('/').get(healthcheckController.checkServices)

export default healthchecksRouter
