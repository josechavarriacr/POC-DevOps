import config from '../../Config/Environment/env.config'
import { CommonMessageBusService } from '@realtech-api-package/common'
const { rabbitmqConfig, apiName } = config
const { rabbitmqURL } = rabbitmqConfig
class MessageAMQP extends CommonMessageBusService {
    constructor() {
        super(rabbitmqURL, apiName)
    }
}

export default MessageAMQP
