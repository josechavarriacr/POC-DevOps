import { HttpRouter } from '@realtech-api-package/route'
import healthchecksRouter from '../../../../HealthCheck/infrastructure/healthcheck.route'
import todosRouter from '../../../../Todo/infrastructure/todo.route'
import config from '../../Config/Environment/env.config'
import { HttpNextFunction } from '@realtech-api-package/controller'
import { HttpRequest } from '@realtech-api-package/controller'
import { HttpResponse } from '@realtech-api-package/controller'
import { MiddlewareErrors } from '@realtech-api-package/middleware'
import { MiddlewareNotFound } from '@realtech-api-package/middleware'
export function registerRoutes(router: HttpRouter) {
    router.get('/', (req: HttpRequest, res: HttpResponse) =>
        res.json(`${config.apiName} is running`)
    )
    // Routes
    router.use('/healthcheck/', healthchecksRouter)
    router.use('/api/v1/todos', todosRouter)
    // 404 not found
    router.all('*', MiddlewareNotFound)
    // 505 error
    router.use(MiddlewareErrors)
    router.use(
        (
            err: Error,
            req: HttpRequest,
            res: HttpResponse,
            next: HttpNextFunction
        ) => {
            res.status(500).send('Something broke!')
        }
    )
}
