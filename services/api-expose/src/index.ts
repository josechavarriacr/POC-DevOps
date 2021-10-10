import config from './components/Shared/infrastructure/Config/Environment/env.config'
import server from './components/Shared/infrastructure/Http/Express/express-server.config'
import { loggerMessage, loggerInfo } from '@realtech-api-package/logger'
import mongoConnection from './components/Shared/infrastructure/Persistence/Mongo/mongo-connection'
import { attachEventsQueue } from './components/Shared/infrastructure/MessageBus/RabbitMq/attach-listeners'
const { port, env, apiName } = config

server.listen(port, () => {
    loggerMessage(`${apiName} is running at http://localhost:${port}`)
    loggerMessage(`${apiName} is running in ${env} mode`)
    mongoConnection.run()
    attachEventsQueue()
    loggerInfo('Press CTRL-C to stop\n')
})
