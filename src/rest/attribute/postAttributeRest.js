import {run, Router} from 'express-blueforest'
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
    run(validTrunkOwner),
    run(setUserIdIn("oid")),
    run(createSender(ENV.RB.exchange, `${ENV.NAME}-upsert`), "send message")
)