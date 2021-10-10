import { HttpRouter } from '@realtech-api-package/route'
import todoController from '../application/todo.controller'

const todosRouter = HttpRouter()

todosRouter.route('/create').post(todoController.createOne)
todosRouter.route('/search').post(todoController.search)

todosRouter.route('/all').get(todoController.findAll)

todosRouter.route('/edit').put(todoController.updateOne)

todosRouter.route('/delete').delete(todoController.deleteOne)

export default todosRouter
