import {validBodyBqt, validBodyId, validBodyEntryId, validBodyTrunkId, validOwner, validUser} from "../../validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../collections"
import {col} from "mongo-registry"
import ENV from "./../../env"

const router = Router()
const trunks = col(cols.TRUNK)

module.exports = router

router.put(`/api/${ENV.NAME}`,
    validBodyTrunkId,
    validBodyId,
    validBodyEntryId,
    validBodyBqt,
    validUser,
    validOwner(trunks, "trunkId"),
    run(({trunkId, _id, entryId, bqt}) => trunks.updateOne(
        {_id: trunkId, [`${ENV.NAME}._id`]: _id},
        {$set: {[`${ENV.NAME}.$.bqt`]: bqt}})
    ),
    run(({result}) => result)
)