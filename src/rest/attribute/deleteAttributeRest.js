import {cols} from "../../collections"
import {col} from "mongo-registry"
import ENV from "./../../env"
import {run, Router} from 'express-blueforest'
import {validEntryId, validOwner, validPathId, validPathTrunkId, validUser} from "../../validations"
import {createSender} from "simple-rbmq"

const router = Router()
module.exports = router

const attributes = col(cols.ATTRIBUTE)

router.delete(`/api/${ENV.NAME}/:trunkId/:_id/:${ENV.NAME}Id`,
    validPathId,
    validPathTrunkId,
    validEntryId,
    validUser,
    validOwner(attributes),
    run(createSender(ENV.RB.exchange, `${ENV.NAME}-delete`))
)

module.exports = router