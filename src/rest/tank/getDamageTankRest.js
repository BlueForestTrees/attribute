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

const loadDamage = items =>
    col(cols.DAMAGE)
        .find({trunkId: {$in: map(items, i => i._id)}}).toArray()
        .then(dbItems => each(dbItems, dbItem => dbItem.bqt *= find(items, {_id: dbItem.trunkId}).bqt))

const damageEntryService = configure(() => col(cols.DAMAGE_ENTRY))

router.get('/api/damageTank/:trunkId',
    validPathTrunkId,
    run(loadTreeNode, "READ NODE"),
    run(nodes => each(nodes, o => o._id = object(o._id))),
    run(loadDamage, "READ DAMAGE"),
    run(mergeListBy("damageId"), "MERGE ITEMS"),
    run(damageEntryService.append(
        "damageId",
        {name: 1, color: 1, g: 1},
        (damage, damageEntry) => ({
            _id: damage.damageId,
            name: damageEntry.name,
            color: damageEntry.color,
            quantity: {bqt: damage.bqt, g: damageEntry.g, eq: damageEntry.eq}
        })
    ))
)