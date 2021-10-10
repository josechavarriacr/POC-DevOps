import { Nullable } from '../../Shared/Domain/Nullable'
import TodoEntity from '../domain/todo.entity'
import TodoId from '../domain/todo.id'
import { TodoRepository } from '../domain/todo.repository'
import Todos, { ITodo } from './todo.datasource'

class TodoMongoRepository implements TodoRepository {
    public async findOne(id: TodoId): Promise<Nullable<TodoEntity>> {
        // Infra conditions
        const result: Nullable<TodoEntity> = await Todos.findById(id)
        return result
    }

    public async findAll() {
        // Infra conditions
        const result: ITodo[] = await Todos.find()
        return result
    }
    public async search(body: TodoEntity) {
        // Infra conditions
        const result: ITodo[] = await Todos.find(body)
        return result
    }

    public async createOne(body: TodoEntity) {
        // Infra conditions
        const result: ITodo = await Todos.create(body)
        return result
    }

    public async updateOne(
        id: TodoId,
        body: TodoEntity
    ): Promise<Nullable<ITodo>> {
        // Infra conditions
        const filter = { _id: id }
        const result: Nullable<ITodo> = await Todos.findOneAndUpdate(
            filter,
            body,
            { new: true }
        )
        return result
    }

    public async deleteOne(id: TodoId): Promise<Nullable<ITodo>> {
        const result: Nullable<ITodo> = await Todos.findByIdAndDelete(id)
        return result
    }
}

export default TodoMongoRepository
