import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../collections"
import {col} from "mongo-registry"
import ENV from "./../../env"

import {
    setUserIdIn,
    validBodyBqt,
    validBodyId,
    validBodyEntryId,
    validBodyTrunkId,
    validUser,
    validTrunkOwner
} from "../../validations"

const router = Router()

module.exports = router

router.post(`/api/${ENV.NAME}`,
    validBodyId,
    validBodyTrunkId,
    validBodyEntryId,
    validBodyBqt,
    validUser,
    run(setUserIdIn("oid")),
    run(validTrunkOwner),
    run(attr => col(cols.TRUNK).updateOne({_id: attr.trunkId}, {$push: {[ENV.NAME]: attr}}, {upsert: true})),
    run(({result}) => result)
)