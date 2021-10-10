import dotenv from 'dotenv'

import findConfig from 'find-config'
import rabbitmqConfig from './env.rabbit.config'

const path = findConfig('.env') || ''
dotenv.config({ path })
const env = process.env.NODE_ENV || 'development'
const auth = `${process.env.EXPOSEMSERV_MONGO_USERNAME}:${process.env.EXPOSEMSERV_MONGO_PASSWORD}`
const host = `${process.env.EXPOSEMSERV_MONGO_HOST}:${process.env.EXPOSEMSERV_MONGO_PORT}`
const database = process.env.EXPOSEMSERV_DATABASE || ''

const config = {
    apiName: process.env.API_SETTINGS_NAME || 'api name',
    env,
    isDev: env === 'development',
    isTest: env === 'testing',
    port: process.env.API_EXPOSE_PORT || 8000,
    secrets: {
        jwt: process.env.JWT_SECRET || 'realtech',
        jwtExp: process.env.JWT_EXP || '365d',
    },
    database,
    mongodbUrl:
        `mongodb://${auth}@${host}/${database}?authSource=admin` ||
        `mongodb://localhost:27017/realtech`,
    rabbitmqConfig,
    publicUrl: process.env.APP_PUBLIC,
}
export default config
