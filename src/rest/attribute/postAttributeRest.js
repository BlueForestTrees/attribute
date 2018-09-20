import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../collections"
import {col} from "mongo-registry"
import ENV from "./../../env"

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
const addAttribute = attribute => col(cols.ATTRIBUTE).insertOne(attribute)

module.exports = router

router.post(`/api/${ENV.NAME}`,
    validBodyId,
    validBodyTrunkId,
    validBodyAttributeId,
    validBodyBqt,
    validUser,
    run(setUserIdIn("oid")),
    run(validTrunkOwner),
    run(addAttribute)
)