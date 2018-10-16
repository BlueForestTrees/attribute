import {col} from "mongo-registry"
import {cols} from "./collections"
import ENV from "./env"

export const registry = [
    {
        version: "1.0.4",
        log: "externId idx",
        script: () => col(cols.ATTRIBUTE_ENTRY).createIndex({externId: 1}, {unique: true, partialFilterExpression: {externId: {$exists: true}}})
    },
    {
        version: "1.0.6",
        log: `facet (${ENV.NAME}.trunkId,${ENV.NAME}.${ENV.NAME}Id) idx`,
        script: () => col(cols.TRUNK).createIndex({[`${ENV.NAME}.trunkId`]: 1, [`${ENV.NAME}.${ENV.NAME}Id`]: 1})
    }
]