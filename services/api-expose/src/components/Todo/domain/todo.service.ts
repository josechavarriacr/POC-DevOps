import { PrintErrorNotNull } from '@realtech-api-package/errors'
import TodoEntity from './todo.entity'
import TodoId from './todo.id'
import { loggerError } from '@realtech-api-package/logger'
import * as responseService from '@realtech-api-package/response-service'
import { ParseId } from '@realtech-api-package/common'
const { responseUpdate, responseDelete, responseNotFound } = responseService
const { responseFind, responseCreate } = responseService
class TodoService {
    private persistence: any
    constructor(Persistence: any) {
        this.persistence = Persistence
    }

    async findAll() {
        try {
            const data: TodoEntity[] = await this.persistence.findAll()
            return responseFind('todo:found', data)
        } catch (error) {
            loggerError(error)
            throw error
        }
    }

    async search(body: TodoEntity) {
        try {
            const data = ParseId(body)
            const isExists = await this.persistence.search(data)
            if (!isExists.length) return responseNotFound('todo:notFound')
            return responseFind('todo:found', isExists)
        } catch (error) {
            loggerError(error)
            throw error
        }
    }

    async createOne(body: TodoEntity) {
        try {
            const data: void = await this.persistence.createOne(body)
            return responseCreate('todo:created', data)
        } catch (error) {
            loggerError(error)
            throw error
        }
    }

    async updateOne(id: TodoId, body: TodoEntity) {
        try {
            const isExists = await this.persistence.findOne(id)
            if (!isExists) return responseNotFound('todo:notFound')
            const data: void = await this.persistence.updateOne(id, body)
            return responseUpdate('todo:updated', data)
        } catch (error) {
            loggerError(error)
            throw error
        }
    }

    async deleteOne(id: TodoId) {
        try {
            const isExists = await this.persistence.findOne(id)
            if (!isExists) return responseNotFound('todo:notFound')
            await this.persistence.deleteOne(id)
            return responseDelete('todo:deleted')
        } catch (error) {
            loggerError(error)
            throw error
        }
    }
}

export default TodoService
