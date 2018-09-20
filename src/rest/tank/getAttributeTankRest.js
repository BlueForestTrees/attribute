import {validPathTrunkId} from "../../validations"
import {col} from "mongo-registry"
import configure from "items-service"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../collections"
import {mergeListBy} from "../../calculation"
import {map, each, find} from "lodash"
import {object} from "mongo-registry"
import ENV from "../../env"
import client from "request-promise-native"

const router = Router()

module.exports = router

const loadTreeNode = ({trunkId}) => client.get(`${ENV.TREE_BASE_URL}/api/tree/nodes/${trunkId}`, {json: true})

const loadAttribute = items =>
    col(cols.ATTRIBUTE)
        .find({trunkId: {$in: map(items, i => i._id)}}).toArray()
        .then(dbItems => each(dbItems, dbItem => dbItem.bqt *= find(items, {_id: dbItem.trunkId}).bqt))

const attributeEntryService = configure(() => col(cols.ATTRIBUTE_ENTRY))

router.get(`/api/${ENV.NAME}Tank/:trunkId`,
    validPathTrunkId,
    run(loadTreeNode, "READ NODE"),
    run(nodes => each(nodes, o => o._id = object(o._id))),
    run(loadAttribute, `READ ${ENV.NAME}`),
    run(mergeListBy(`${ENV.NAME}Id`), `MERGE ${ENV.NAME}`),
    run(attributeEntryService.append(
        `${ENV.NAME}Id`,
        {name: 1, color: 1, g: 1},
        (attribute, attributeEntry) => ({
            _id: attribute[`${ENV.NAME}Id`],
            name: attributeEntry.name,
            color: attributeEntry.color,
            quantity: {bqt: attribute.bqt, g: attributeEntry.g, eq: attributeEntry.eq}
        })
    ))
)