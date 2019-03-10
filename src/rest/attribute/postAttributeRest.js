import {run, Router} from 'express-blueforest'
import {col} from "mongo-registry"
import ENV from "./../../env"
import {createSender} from "simple-rbmq"

import {
    setUserIdIn,
    validBodyBqt,
    validBodyId,
    validBodyAttributeId,
    validBodyTrunkId,
    validUser,
    validTrunkOwner
} from "../../validations"

const router = Router()

module.exports = router

router.post(`/api/${ENV.NAME}`,
    validBodyId,
    validBodyTrunkId,
    validBodyAttributeId,
    validBodyBqt,
    validUser,
    run(setUserIdIn("oid")),
    run(validTrunkOwner),
    run(createSender(ENV.RB.exchange, `${ENV.NAME}-upsert`), "send message")
)