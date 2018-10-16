import {cols} from "../../collections"
import {col} from "mongo-registry"
import ENV from "./../../env"

import {run, Router} from 'express-blueforest'
import {validOwner, validPathAttributeId, validPathId, validUser} from "../../validations"

const router = Router()
module.exports = router

const trunks = col(cols.TRUNK)

router.delete(`/api/${ENV.NAME}/:_id/:attId`,
    validPathId,
    validPathAttributeId,
    validUser,
    validOwner(trunks),
    run(({_id, attId}) => trunks.updateOne(
        {_id},
        {$pull: {[ENV.NAME]: {_id: attId}}}
    )),
    run(({result}) => result)
)