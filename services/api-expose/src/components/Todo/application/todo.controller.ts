import {
    HttpRequest,
    HttpResponse,
    HttpNextFunction,
} from '@realtech-api-package/controller'
import TodoService from '../domain/todo.service'
import TodoMongoRepository from '../infrastructure/todo.mongo.repository'
class TodoController {
    private service: TodoService

    constructor() {
        this.service = new TodoService(new TodoMongoRepository())
        this.findAll = this.findAll.bind(this)
        this.createOne = this.createOne.bind(this)
        this.search = this.search.bind(this)
        this.updateOne = this.updateOne.bind(this)
        this.deleteOne = this.deleteOne.bind(this)
    }

    async findAll(req: HttpRequest, res: HttpResponse, next: HttpNextFunction) {
        try {
            const response = await this.service.findAll()
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }

    async search(req: HttpRequest, res: HttpResponse, next: HttpNextFunction) {
        try {
            const response = await this.service.search(req.body)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }

    async createOne(
        req: HttpRequest,
        res: HttpResponse,
        next: HttpNextFunction
    ) {
        try {
            const response = await this.service.createOne(req.body)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }

    async updateOne(
        req: HttpRequest,
        res: HttpResponse,
        next: HttpNextFunction
    ) {
        try {
            const { id } = req.body
            const response = await this.service.updateOne(id, req.body)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }

    async deleteOne(
        req: HttpRequest,
        res: HttpResponse,
        next: HttpNextFunction
    ) {
        try {
            const { id } = req.body
            const response = await this.service.deleteOne(id)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
}

export default new TodoController()
