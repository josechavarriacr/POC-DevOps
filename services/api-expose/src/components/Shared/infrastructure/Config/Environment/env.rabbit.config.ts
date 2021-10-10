import dotenv from 'dotenv'

import findConfig from 'find-config'

const path = findConfig('.env') || ''
dotenv.config({ path })

const rabbitmqUser = process.env.RABBITMQ_DEFAULT_USER || ''
const rabbitmqPass = process.env.RABBITMQ_DEFAULT_PASS || ''
const rabbitmqPort = process.env.RABBITMQ_DEFAULT_PORT || ''
const rabbitmqHost = process.env.RABBITMQ_DEFAULT_HOST || ''

const rabbitmqURL = `amqp://${rabbitmqUser}:${rabbitmqPass}@${rabbitmqHost}:${rabbitmqPort}`

// Exchanges
const apiBanksExchange = process.env.API_BANKS_EXCHANGE || ''
const apiBrokersExchange = process.env.API_BROKERS_EXCHANGE || ''
const apiClientsExchange = process.env.API_CLIENTS_EXCHANGE || ''
const apiDevelopersExchange = process.env.API_DEVELOPERS_EXCHANGE || ''
const apiToolsExchange = process.env.API_TOOLS_EXCHANGE || ''
const apiSettingsExchange = process.env.API_SETTINGS_EXCHANGE || ''
const apiNotificationsExchange = process.env.API_NOTIFICATIONS_EXCHANGE || ''
const apiPropertiesExchange = process.env.API_PROPERTIES_EXCHANGE || ''
const apiTrackingExchange = process.env.API_TRACKING_EXCHANGE || ''
const apiUsersExchange = process.env.API_USERS_EXCHANGE || ''
const apiGatewayExchange = process.env.API_GATEWAY_EXCHANGE || ''

// Queues
const apiBanksQueue = process.env.API_BANKS_QUEUE || ''
const apiBrokersQueue = process.env.API_BROKERS_QUEUE || ''
const apiClientsQueue = process.env.API_CLIENTS_QUEUE || ''
const apiDevelopersQueue = process.env.API_DEVELOPERS_QUEUE || ''
const apiToolsQueue = process.env.API_TOOLS_QUEUE || ''
const apiNotificationsQueue = process.env.API_NOTIFICATIONS_QUEUE || ''
const apiPropertiesQueue = process.env.API_PROPERTIES_QUEUE || ''
const apiSettingsQueue = process.env.API_SETTINGS_QUEUE || ''
const apiTrackingQueue = process.env.API_TRACKING_QUEUE || ''
const apiUsersQueue = process.env.AAPI_USERS_QUEUE || ''
const apiGatewayQueue = process.env.API_GATEWAY_QUEUE || ''

const exchanges = {
    apiBanksExchange,
    apiBrokersExchange,
    apiClientsExchange,
    apiDevelopersExchange,
    apiToolsExchange,
    apiSettingsExchange,
    apiNotificationsExchange,
    apiPropertiesExchange,
    apiTrackingExchange,
    apiUsersExchange,
    apiGatewayExchange,
}

const queues = {
    apiBanksQueue,
    apiBrokersQueue,
    apiClientsQueue,
    apiDevelopersQueue,
    apiToolsQueue,
    apiNotificationsQueue,
    apiPropertiesQueue,
    apiSettingsQueue,
    apiTrackingQueue,
    apiUsersQueue,
    apiGatewayQueue,
}

const rabbitmqConfig = {
    rabbitmqURL,
    exchanges,
    queues,
}

export default rabbitmqConfig
