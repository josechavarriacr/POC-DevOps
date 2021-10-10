import config from '../../Config/Environment/env.config'

const { mongodbUrl, database } = config
import { MongooseConnection } from '@realtech-api-package/mongoose'

export default new MongooseConnection(mongodbUrl, database)
