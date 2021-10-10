import rabbitmqConfig from '../../Shared/infrastructure/Config/Environment/env.rabbit.config'
import MessageAMQP from '../../Shared/infrastructure/MessageBus/RabbitMq/rabbitqm-factory'
import config from '../../Shared/infrastructure/Config/Environment/env.config'
const { queues } = rabbitmqConfig

import mongoConnection from '../../Shared/infrastructure/Persistence/Mongo/mongo-connection'
import { CommonHealthcheckMessageQueue } from '@realtech-api-package/common'

export default new CommonHealthcheckMessageQueue(
    config,
    mongoConnection,
    MessageAMQP,
    queues.apiSettingsQueue
)
