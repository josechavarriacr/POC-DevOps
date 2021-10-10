import { Nullable } from '../../Shared/Domain/Nullable'
import TodoEntity from './todo.entity'
import TodoId from './todo.id'

export interface TodoRepository {
    findOne(id: TodoId): Promise<Nullable<TodoEntity>>
    findAll(): Promise<TodoEntity[]>
    search(body: TodoEntity): Promise<TodoEntity[]>
    createOne(body: TodoEntity): Promise<TodoEntity>
    updateOne(id: TodoId, body: TodoEntity): Promise<Nullable<TodoEntity>>
    deleteOne(id: TodoId): Promise<Nullable<TodoEntity>>
}
