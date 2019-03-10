import {validBodyBqt, validBodyId, validOwner, validUser} from "../../validations"
import {run, Router} from 'express-blueforest'
import {cols} from "../../collections"
import {col} from "mongo-registry"
import ENV from "./../../env"
import {createSender} from "simple-rbmq"

const router = Router()
const attributes = col(cols.ATTRIBUTE)

module.exports = router

router.put(`/api/${ENV.NAME}`,
    validBodyId,
    validBodyBqt,
    validUser,
    validOwner(attributes),
    run(createSender(ENV.RB.exchange, `${ENV.NAME}-upsert`))
)