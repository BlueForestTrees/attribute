import {version} from './../package.json'
import fs from 'fs'

const throwit = message => {throw message}

const ENV = {
    NAME: process.env.NAME || throwit("ENV.NAME pas défini"),
    PORT: process.env.PORT || 80,

    REST_PATH: process.env.REST_PATH || "rest",

    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    DB_NAME: process.env.DB_NAME || "BlueForestTreesDB",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 27017,
    DB_USER: process.env.DB_USER || "doudou",
    DB_PWD: process.env.DB_PWD || "masta",

    NODE_ENV: process.env.NODE_ENV || null,
    VERSION: version,
    MORGAN: process.env.MORGAN || ':status :method :url :response-time ms - :res[content-length]',

    RB_PATH: process.env.RB_PATH || "mq.json"
}

ENV.TREE_BASE_URL = {
    "production": process.env.TREE_BASE_URL || "http://tree",
    "test": "http://localhost:9999",
    "development": "http://localhost:8080"
}[ENV.NODE_ENV]

ENV.RB = JSON.parse(fs.readFileSync(ENV.RB_PATH, 'utf8'))

const debug = require('debug')(`api:${ENV.NAME}`)

debug({ENV})

export default ENV