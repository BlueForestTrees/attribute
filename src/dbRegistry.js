import {col} from "mongo-registry"
import {cols} from "./collections"
import ENV from "./env"

export default [
    {
        version: "1.0.4",
        log: "externId idx",
        script: () => col(cols.ATTRIBUTE_ENTRY).createIndex({"externId": 1}, {unique: true, partialFilterExpression: {externId: {$exists: true}}})
    },
    {
        version: "1.0.5",
        log: "facet (trunkId,facetId) idx",
        script: () => col(cols.ATTRIBUTE).createIndex({"trunkId": 1, "facetId": 1})
    },
    {
        version: "1.1.8",
        log: `facet (trunkId,${ENV.NAME}Id) idx`,
        script: () => col(cols.ATTRIBUTE).createIndex({[ENV.NAME + "Id"]: 1, "facetId": 1})
    }
]