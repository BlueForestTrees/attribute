import {col} from "mongo-registry"
import {cols} from "./collections"

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
    }
]