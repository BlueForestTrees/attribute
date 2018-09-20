import {validBodyBqt, validBodyId, validBodyDamageId, validBodyTrunkId, validOwner, validUser} from "../../validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../collections"
import {col} from "mongo-registry"
import configure from "items-service"

const router = Router()
const damages = col(cols.DAMAGE)
const damageService = configure(() => damages)

module.exports = router

router.put('/api/damage',
    validBodyId,
    validBodyTrunkId,
    validBodyDamageId,
    validBodyBqt,
    validUser,
    validOwner(damages),
    run(({_id, trunkId, facetId, bqt}) => ({filter: {_id, trunkId, facetId}, item: {bqt}})),
    run(damageService.filteredUpdate)
)