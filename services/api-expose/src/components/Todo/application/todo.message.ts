import MessageAMQP from '../../Shared/infrastructure/MessageBus/RabbitMq/rabbitqm-factory'
import TodoMongoRepository from '../infrastructure/todo.mongo.repository'
import TodoService from '../domain/todo.service'
import rabbitmqConfig from '../../Shared/infrastructure/Config/Environment/env.rabbit.config'
import { loggerInfo, loggerMessage } from '@realtech-api-package/logger'
import { PublisherMessagesQueue } from '@realtech-api-package/common'
import { RoutingMessagesQueue } from '@realtech-api-package/common'
const { exchanges, queues } = rabbitmqConfig
class TodoMessagesQueue {
    private service: TodoService
    private messageQueue
    constructor() {
        this.messageQueue = new MessageAMQP()
        this.service = new TodoService(new TodoMongoRepository())
    }

    async findAll() {
        const queue = `${queues.apiSettingsQueue}:todo:findAll`
        await PublisherMessagesQueue.findAll(
            queue,
            this.messageQueue,
            this.service
        )
    }

    async search() {
        const queue = `${queues.apiSettingsQueue}:todo:search`
        await PublisherMessagesQueue.search(
            queue,
            this.messageQueue,
            this.service
        )
    }

    async createOne() {
        const routing = 'todo:create'
        await RoutingMessagesQueue.createOne(
            routing,
            this.messageQueue,
            exchanges.apiSettingsExchange,
            this.service
        )
    }

    async updateOne() {
        const queue = `${queues.apiSettingsQueue}:todo:update`
        await PublisherMessagesQueue.updateOne(
            queue,
            this.messageQueue,
            this.service
        )
    }

    async deleteOne() {
        const queue = `${queues.apiSettingsQueue}:todo:delete`
        await PublisherMessagesQueue.updateOne(
            queue,
            this.messageQueue,
            this.service
        )
    }
}

export default new TodoMessagesQueue()
