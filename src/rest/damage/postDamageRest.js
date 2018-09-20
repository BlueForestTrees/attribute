import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../collections"
import {col} from "mongo-registry"
import {
    setUserIdIn,
    validBodyBqt,
    validBodyId,
    validBodyDamageId,
    validBodyTrunkId,
    validUser,
    validTrunkOwner
} from "../../validations"

const router = Router()
const addDamage = damage => col(cols.DAMAGE).insertOne(damage)

module.exports = router

router.post('/api/damage',
    validBodyId,
    validBodyTrunkId,
    validBodyDamageId,
    validBodyBqt,
    validUser,
    run(setUserIdIn("oid")),
    run(validTrunkOwner),
    run(addDamage)
)